# Deployment

Self-hosted VPS (AlmaLinux 9) + Docker, behind host nginx with Let's Encrypt
TLS. Two supported paths: build on the VPS from source (see "Going live on
AlmaLinux 9" — no CI setup required), or pull CI-built images from GHCR.
GitHub Actions verifies and publishes images on every push to `main`;
**it does not deploy** — that step is manual until the SSH job is added.

**Status**: Dockerfiles, compose, and the CI workflow are verified locally
(D0) — both images build and the full stack runs with a passing `/health`.
The workflow has not yet run on GitHub; its first run publishes the images
(D1), after which both packages must be flipped to public. Auto-deploy (D2)
is not implemented.

## How it works

1. Push to `main`.
2. `.github/workflows/ci.yml`'s `verify` job runs lint/typecheck/test/build.
   If it fails, nothing below runs — this is the whole rollback story: a
   broken commit is simply never deployed.
3. `build-push` job builds `docker/web.Dockerfile` and `docker/api.Dockerfile`
   (build context = repo root — pnpm workspaces don't build in isolation)
   and pushes both to GitHub Container Registry, tagged `latest` and the bare
   40-char commit SHA. Skipped entirely on pull requests. Images must be made
   **public** once (see below) — the VPS pulls with no credentials.
4. **Deployment is manual for now.** CI stops at publishing images; there is
   no SSH/VPS job in the workflow yet. To release, SSH in and run the pull +
   `up -d` yourself (see "Going live on AlmaLinux 9"), optionally pinning
   `WEB_IMAGE_TAG`/`API_IMAGE_TAG` to a specific commit SHA.

`docker-compose.prod.yml` runs `web`, `api`, and `redis` as containers on the
VPS. Production Postgres is **external** — the VPS's own separately-managed
instance, referenced via env vars only (not a compose service; a `postgres`
service exists in the file behind an opt-in `local-db` profile for a
from-scratch setup, not used here). `apps/api`'s port isn't published; `web`
reaches it over Docker's internal network at `http://api:4000`.

Local dev is unaffected by any of this — `docker-compose.yml` (a different
file) still only runs `postgres`/`redis` for `pnpm --filter api dev` /
`pnpm --filter web dev` against local code, no containers for the apps
themselves.

## One-time setup checklist (required before D1/D2 will actually run)

**On GitHub** — nothing is required for CI itself: the `build-push` job
authenticates to GHCR with the auto-provisioned `GITHUB_TOKEN`. After the
first successful run, flip both packages to **public** (Profile → Packages →
each package → Package settings → Change visibility), or the VPS pull fails
with `unauthorized`.

The SSH secrets below are **not used by any workflow today** — add them only
when the deploy job is reintroduced:

| Secret | Value |
|---|---|
| `VPS_HOST` | `194.238.18.90` |
| `VPS_SSH_USER` | `deploy` (a dedicated non-root user — see VPS setup below) |
| `VPS_SSH_KEY` | The **private** key generated below — paste the whole file contents |
| `VPS_SSH_PORT` | `22` (or your hardened port) |

**On the VPS** (SSH in as an existing admin user):

```sh
# 1. Docker, if not already installed
curl -fsSL https://get.docker.com | sh

# 2. Dedicated deploy user
useradd -m -s /bin/bash deploy
usermod -aG docker deploy
mkdir -p ~deploy/.ssh && chmod 700 ~deploy/.ssh
# paste the PUBLIC key below into ~deploy/.ssh/authorized_keys
chown -R deploy:deploy ~deploy/.ssh && chmod 600 ~deploy/.ssh/authorized_keys

# 3. Deploy directory
mkdir -p /opt/ai-portfolio && chown deploy:deploy /opt/ai-portfolio

# 4. VPS-only .env — copy .env.example's Deployment section values here,
#    with REDIS_URL=redis://redis:6379 and API_URL=http://api:4000 (Docker
#    service names, since redis/api run as containers on this same VPS).
#    chmod 600, never commit this file.
```

Firewall: open `3000` (web) — leave `4000`/`5432`/`6379` closed
(internal-only).

First bring-up before CI ever runs:
```sh
cd /opt/ai-portfolio && docker compose -f docker-compose.prod.yml pull && docker compose -f docker-compose.prod.yml up -d
```

## Going live on AlmaLinux 9 (nginx + certbot)

The target VPS runs **AlmaLinux 9 with host nginx and Let's Encrypt via
certbot**. nginx terminates TLS on 443 and reverse-proxies to the `web`
container on loopback `127.0.0.1:3000`; the containers themselves publish
nothing publicly.

```
internet → :443 nginx (TLS, host) → 127.0.0.1:3000 web container
                                          └→ api:4000 ─→ postgres / redis
                                             (docker-internal only)
```

`apps/web` serves everything from `data/*.json` baked into its image, so the
**site needs neither the API, Redis nor Postgres**. Get web live first; add
the API afterwards as a test service.

### 1. Install the stack

```sh
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo dnf -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker

sudo dnf -y install nginx
sudo systemctl enable --now nginx

sudo dnf -y install epel-release
sudo dnf -y install certbot python3-certbot-nginx
```

### 2. Firewall — only 80/443

```sh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

Never open 3000/4000/5432/6379. `docker-compose.prod.yml` binds web to
`127.0.0.1:3000` precisely so Docker can't bypass firewalld — Docker writes
its own iptables rules, and a bare `"3000:3000"` would be publicly reachable
over plain HTTP even with the port closed in firewalld.

### 3. SELinux — the step that otherwise costs you an evening

AlmaLinux ships SELinux **enforcing**. nginx is not allowed to open network
connections (including to loopback) until you flip one boolean; without it
every request is a `502 Bad Gateway` with `Permission denied` in
`/var/log/nginx/error.log`:

```sh
sudo setsebool -P httpd_can_network_connect 1
```

### 4. DNS

Point `shafiq.info.bd` (and `www`) at the VPS with `A` records, and confirm
propagation *before* running certbot — it validates over HTTP and fails if
DNS hasn't caught up:

```sh
dig +short shafiq.info.bd     # must print the VPS IP
```

### 5. Deploy the app

```sh
sudo mkdir -p /opt/ai-portfolio && sudo chown "$USER":"$USER" /opt/ai-portfolio
cd /opt/ai-portfolio
git clone https://github.com/Shafiqbd/ai-portfolio-shafiq-info.git .
cp .env.example .env && chmod 600 .env      # then edit, see below
```

Set in `/opt/ai-portfolio/.env`:

```sh
NEXT_PUBLIC_SITE_URL=https://shafiq.info.bd
DB_HOST=postgres          # compose service name, NOT localhost
DB_PORT=5432
DB_USERNAME=shafiq_info
DB_PASSWORD=<a strong password>
DB_DATABASE=shafiq_info
REDIS_URL=redis://redis:6379
API_URL=http://api:4000
PORT=4000
```

Build and start **web only**:

```sh
docker compose -f docker-compose.prod.yml -f docker-compose.build.yml up -d --build web
curl -I http://127.0.0.1:3000        # expect HTTP/1.1 200 OK
```

`docker-compose.build.yml` builds the image from this checkout, so no GitHub
Actions, no registry, no package-visibility setup is needed. (To use CI-built
images from ghcr.io instead, drop the `-f docker-compose.build.yml` and see
"First live deploy" below.) The Next build needs **~2GB free RAM** — add swap
first on a 1GB box:

```sh
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 6. nginx + HTTPS

```sh
sudo cp deploy/nginx/shafiq.info.bd.conf /etc/nginx/conf.d/
sudo nginx -t && sudo systemctl reload nginx
curl -I http://shafiq.info.bd                      # 200 over plain HTTP

sudo certbot --nginx -d shafiq.info.bd -d www.shafiq.info.bd
```

Certbot edits that conf in place, adding the `listen 443 ssl` block and the
HTTP→HTTPS redirect. Renewal is automatic via the `certbot-renew.timer`
systemd unit — verify with `systemctl list-timers | grep certbot` and dry-run
it once:

```sh
sudo certbot renew --dry-run
```

**The site is now live at `https://shafiq.info.bd`.**

### 7. Add the API (smoke test only)

```sh
docker compose -f docker-compose.prod.yml -f docker-compose.build.yml \
  --profile local-db up -d --build
docker compose -f docker-compose.prod.yml exec api wget -qO- localhost:4000/health
# expect {"status":"ok","db":true,"redis":true}
```

`--profile local-db` is required: **without a reachable Postgres the API
retries 10 times, exits, and `restart: unless-stopped` turns that into a
crash loop.** No migrations are needed — there are no entities yet and
`synchronize` is `false`, so TypeORM connects and does nothing. Nothing on
the website depends on this container.

### Updating after a code change

```sh
cd /opt/ai-portfolio && git pull
docker compose -f docker-compose.prod.yml -f docker-compose.build.yml up -d --build web
docker image prune -f
```

nginx and certs are untouched by app redeploys.

### Verifying the stack locally before deploying

`docker-compose.localtest.yml` runs this exact production stack on your own
machine (ports shifted to 3001/4001, throwaway Postgres) without touching
`.env`:

```sh
docker compose -f docker-compose.prod.yml -f docker-compose.build.yml \
               -f docker-compose.localtest.yml --profile local-db up -d --build
curl http://127.0.0.1:3001/           # web
curl http://127.0.0.1:4001/health     # {"status":"ok","db":true,"redis":true}
```

Verified green on 2026-09-30: both images build, all 11 routes return 200,
every asset referenced by `data/*.json` resolves, and the API connects to
Postgres and Redis.

### Troubleshooting

| Symptom | Cause |
|---|---|
| `502 Bad Gateway` | SELinux boolean not set (step 3), or the web container isn't running — `docker compose ps` |
| certbot: "Challenge failed" | DNS not propagated, or port 80 closed in firewalld |
| Build killed / OOM | Not enough RAM for the Next build — add swap (step 5) |
| Site up but nginx 502s, container healthy | `PORT` leaking from the shared `.env` — web must bind 3000; `docker-compose.prod.yml` pins it explicitly |
| Site loads, links use the wrong host | `NEXT_PUBLIC_SITE_URL` was wrong **at build time** — fix `.env` and rebuild with `--build` |

## First live deploy (frontend on static data + API for smoke-testing)

`apps/web` serves everything from `data/*.json` baked into its image, so the
**site needs neither the API, Redis, nor Postgres to be fully functional**.
Deploy it first, confirm it's live, then add the API as a test service.

### 1. GitHub side

Add the four secrets in the table above, then push to `main`. CI runs
verify → build-push → deploy.

**Then make both packages public** (the step that otherwise breaks the
first deploy): GHCR packages pushed by `GITHUB_TOKEN` are **private by
default**, and `docker-compose.prod.yml` pulls them with no credentials, so
the VPS gets `unauthorized` until you do this. Go to your GitHub profile →
Packages → `ai-portfolio-shafiq-info-web` → Package settings → Change
visibility → Public. Repeat for `-api`.

### 2. VPS side

Complete the VPS checklist above, then create `/opt/ai-portfolio/.env`
(`chmod 600`). For a **test deploy with no separately-managed Postgres**,
use the bundled `local-db` profile:

```sh
NEXT_PUBLIC_SITE_URL=http://194.238.18.90:3000
DB_HOST=postgres          # the compose service name, not localhost
DB_PORT=5432
DB_USERNAME=shafiq_info
DB_PASSWORD=<pick a strong one>
DB_DATABASE=shafiq_info
REDIS_URL=redis://redis:6379
API_URL=http://api:4000
PORT=4000
```

### 3. Bring it up, web first

```sh
cd /opt/ai-portfolio
docker compose -f docker-compose.prod.yml pull web
docker compose -f docker-compose.prod.yml up -d web
curl -I http://localhost:3000        # expect 200
```

The site is now live at `http://194.238.18.90:3000`. Then add the API:

```sh
docker compose -f docker-compose.prod.yml --profile local-db up -d
docker compose -f docker-compose.prod.yml exec api wget -qO- localhost:4000/health
# expect {"status":"ok","db":true,"redis":true}
```

`--profile local-db` is required here — **without a reachable Postgres the
API retries 10 times, exits, and `restart: unless-stopped` turns that into a
crash loop.** No migrations are needed: there are no entities yet, and
`synchronize` is `false`, so TypeORM just connects and does nothing.

`api`'s port is deliberately unpublished, so `exec` is how you reach it. To
smoke-test `/health` or `/docs` from your own browser, uncomment the `ports`
block on the `api` service — then close it again, since the API has no
authentication.

### Caveats for this first deploy

- **HTTP, not HTTPS**, on `:3000` — no reverse proxy or DNS yet, so
  `shafiq.info.bd` does not point here. `NEXT_PUBLIC_SITE_URL` is baked into
  the web image at build time by CI as `https://shafiq.info.bd`, so
  canonical/OG/sitemap URLs will reference the real domain even while the
  site is served from the bare IP. Harmless for testing; fix it by putting
  Caddy in front and pointing DNS before sharing the link publicly.
- The `local-db` Postgres holds no application data, so its volume is safe
  to discard when you move to a real database.

## Manual rollback

`WEB_IMAGE_TAG`/`API_IMAGE_TAG` default to `latest`. To roll back a bad
deploy, SSH in and pin an older commit SHA:
```sh
WEB_IMAGE_TAG=<old-sha> docker compose -f docker-compose.prod.yml up -d web
```

## Not yet done

- **D1** (images publish to ghcr.io) — the workflow is implemented and
  validated, but has not run yet; its first run happens on the next push to
  `main`, after which both packages must be flipped to public.
- **D2** (auto-deploy over SSH) — **deliberately not implemented yet**.
  `.github/workflows/ci.yml` ends at `build-push`; releasing is manual.
- **The Dockerfiles have not been built on this machine** (no Docker
  available in the current dev shell) — their first real exercise will be
  the CI `build-push` job.
- **Reverse proxy / HTTPS / the real domain** — now documented for
  AlmaLinux 9 + nginx + certbot (see "Going live on AlmaLinux 9"), with the
  config template in `deploy/nginx/`. Not yet executed on the VPS.

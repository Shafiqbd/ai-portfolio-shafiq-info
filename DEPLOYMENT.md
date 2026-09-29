# Deployment

Self-hosted VPS + Docker, deployed via GitHub Actions on every push to
`main`. **Status**: Dockerfiles + compose + CI workflow exist and are
verified locally (D0). Publishing images to the registry (D1) and the live
auto-deploy (D2) require one-time setup below before they'll actually run —
see the checklist.

## How it works

1. Push to `main`.
2. `.github/workflows/ci.yml`'s `verify` job runs lint/typecheck/test/build.
   If it fails, nothing below runs — this is the whole rollback story: a
   broken commit is simply never deployed.
3. `build-push` job builds `docker/web.Dockerfile` and `docker/api.Dockerfile`
   (build context = repo root — pnpm workspaces don't build in isolation)
   and pushes both to GitHub Container Registry, tagged `latest` and the git
   SHA. Images are **public** — no pull credential needed anywhere.
4. `deploy` job (only on push to `main`, not PRs) copies
   `docker-compose.prod.yml` to the VPS and runs
   `docker compose -f docker-compose.prod.yml pull && ... up -d --remove-orphans`
   over SSH.

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

**On GitHub** — add these repo secrets (Settings → Secrets and variables →
Actions):

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

## Manual rollback

`WEB_IMAGE_TAG`/`API_IMAGE_TAG` default to `latest`. To roll back a bad
deploy, SSH in and pin an older commit SHA:
```sh
WEB_IMAGE_TAG=<old-sha> docker compose -f docker-compose.prod.yml up -d web
```

## Not yet done

- **D1** (images actually publish to ghcr.io) and **D2** (auto-deploy
  actually runs) — both require the GitHub Secrets + VPS setup above, which
  only the repo/VPS owner can complete.
- **Reverse proxy / HTTPS / the real domain** (`shafiq.info.bd`) —
  deliberately deferred. Until a reverse proxy (Caddy is the natural pick)
  and DNS are set up, the live site is only reachable via
  `http://194.238.18.90:3000`, not `https://shafiq.info.bd`.

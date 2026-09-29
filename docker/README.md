# docker/

Production Dockerfiles for `apps/web` and `apps/api` (Phase 15). Both are
multi-stage builds run from the **repo root** as the build context (pnpm
workspaces don't build in isolation):

```
docker build -f docker/web.Dockerfile -t ai-portfolio-web .
docker build -f docker/api.Dockerfile -t ai-portfolio-api .
```

For local dev (Postgres + Redis only, no app containers), see
`docker-compose.yml` at the repo root. For the production stack that
references these images, see `docker-compose.prod.yml` at the repo root.

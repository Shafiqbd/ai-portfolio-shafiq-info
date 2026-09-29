# apps/api

NestJS API for shafiq.info.bd — **Phase 9, in progress**.

## What exists today

Infrastructure only. The app boots and serves a health check; it does **not**
serve any content yet.

- **Config** — `src/common/config/env.validation.ts`, zod-validated at boot
  (fails fast on bad/missing env) against the repo-root `.env`.
- **Database** — TypeORM + PostgreSQL (`src/database/`). `synchronize` is
  `false` everywhere, including dev: schema changes go through reviewed
  migrations. `typeorm-options.ts` is shared by the Nest connection and the
  CLI DataSource so the two can't drift.
- **Redis** — `src/redis/`, ioredis.
- **Health** — `GET /health` (version-neutral) pings Postgres and Redis and
  returns 503 when either is down.
- **HTTP** — URI versioning (`/v1/...`), global `ValidationPipe`
  (`whitelist` + `forbidNonWhitelisted`), Swagger UI at `/docs`.

## Not built yet

No entities, no migrations, no domain modules/endpoints, no seeding of
`data/*.json`. `apps/web` still reads `data/*.json` through its own service
layer (`apps/web/services/*.service.ts`), which is designed so that pointing
those services at this API later requires no page or component changes.

## Running it locally

```bash
cp .env.example .env          # from the repo root; defaults match docker-compose
docker compose up -d postgres redis
pnpm --filter api dev         # http://localhost:4000, docs at /docs
```

`pnpm --filter api migration:generate|run|revert` drive TypeORM's CLI once
entities exist.

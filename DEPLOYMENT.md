# Deployment

**Not wired up yet.** Docker/CI/CD is scoped to Phase 15 of the roadmap.

## Target shape

- `docker/` — Dockerfiles for `apps/web` and (later) `apps/api`
- `docker-compose.yml` (repo root) — local dev stack: Next.js, NestJS,
  PostgreSQL, Redis
- `.github/workflows/` — CI on every PR (install → lint → typecheck → test →
  build), CD on `main` (build → deploy → smoke test)

Until then, `apps/web` deploys as a standard Next.js app (e.g. to Vercel) —
`pnpm --filter web build` is the production build command.

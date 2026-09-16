# Shafiq Info — AI Portfolio

Personal brand and engineering platform for Md. Shafiqul Islam (Shafiq Info).
See `ARCHITECTURE.md` for how it's built and `AGENTS.md` for the rules any
contributor (human or AI) should follow before making changes.

## Status

Phase 1 (frontend, demo-data-backed) is in progress. There is no backend, no
AI/RAG pipeline, and no admin yet — see `AGENTS.md`'s "Current state" section
for the up-to-date list.

## Getting started

Requires Node 20+ and pnpm (this repo pins `pnpm@12.4.2` via
`packageManager`; if you don't have pnpm on PATH, `corepack pnpm <cmd>` or
`npm install -g pnpm` both work).

```bash
pnpm install
pnpm dev            # runs apps/web on http://localhost:3000
```

## Workspace layout

```
apps/web/        Next.js app (the site)
apps/api/         NestJS API — placeholder, not implemented yet
packages/ui/       Design-system primitives
packages/types/     Shared content-model types
packages/config/    Design tokens, nav, site metadata
data/               Demo JSON content (see data/README.md)
docs/               Longer-form docs, decision records
```

## Scripts (run from the repo root)

- `pnpm dev` — start the Next.js dev server
- `pnpm build` — production build of `apps/web`
- `pnpm lint` — lint every workspace package
- `pnpm typecheck` — typecheck every workspace package
- `pnpm test` — run tests in every workspace package that has them
- `pnpm format` / `pnpm format:check` — Prettier

## Documentation

- `ARCHITECTURE.md` — system architecture, current vs. target
- `AGENTS.md` — rules for AI agents and contributors
- `CONTRIBUTING.md` — contribution workflow
- `API.md` — API contract (placeholder until `apps/api` exists)
- `DEPLOYMENT.md` — deployment (placeholder until Phase 15)
- `AI.md` — Ask Shafiq AI design
- `data/README.md` — seed-data review checklist

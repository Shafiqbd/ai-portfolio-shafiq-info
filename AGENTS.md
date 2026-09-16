# AGENTS.md

Read this before making changes. It is the guardrail for both AI coding agents
and human contributors working on this repo.

## Project vision

Shafiq Info is a premium, AI-native personal brand and engineering platform —
see the approved plan for the full discovery/sitemap/content-model/roadmap
(`docs/plan.md` once copied there, or ask for the original planning doc).
The site itself is meant to demonstrate engineering capability: it must be
fast, accessible, secure, and well-architected, not just visually polished.

## Current state (keep this section honest — update it as phases land)

- **Implemented**: monorepo scaffold, design-system primitives
  (`packages/ui`), shared content-model types (`packages/types`), demo-data
  service layer (`apps/web/services/*.service.ts`) backed by `data/*.json`.
- **Not implemented yet**: `apps/api` (NestJS/PostgreSQL/Redis), AI/RAG
  pipeline beyond a static FAQ matcher, admin CMS, Docker/CI wiring.
- Do not describe unimplemented phases as done in commit messages, PR
  descriptions, or code comments.

## Architecture

See `ARCHITECTURE.md`.

## Folder structure

```
apps/web/        Next.js app (App Router) — the only implemented app so far
apps/api/         NestJS API — placeholder, Phase 9
packages/ui/       Design-system primitives (Button, Card, Modal, Tabs, Toast, ...)
packages/types/     Shared content-model TypeScript interfaces
packages/config/    Design tokens, nav config, site metadata
data/               Demo JSON seed data (see data/README.md for review status)
docs/               Longer-form documentation, decision records
```

## Coding standards

- TypeScript everywhere, `strict: true`. No `any` unless justified with a
  comment.
- Components call `apps/web/services/*.service.ts`, never `data/*.json`
  directly — the service layer is the seam where demo data gets replaced by
  the real API in Phase 11.
- Design-system primitives live in `packages/ui`; app-specific composition
  (Header, Footer, page sections) lives in `apps/web/components`.
- Use the existing design tokens (`bg-background`, `text-foreground`,
  `bg-accent`, `border-border`, `rounded-card`, `rounded-control`, etc. — see
  `apps/web/app/globals.css` and `packages/config/src/tokens.ts`) instead of
  hardcoding colors.

## Frontend rules

- Server Components by default; add `"use client"` only where interactivity
  requires it.
- Respect `prefers-reduced-motion` for any new animation.
- Every new interactive primitive needs visible focus states and keyboard
  support (see `packages/ui/src/components/__tests__` for the expected test
  pattern).

## Content / anti-fabrication rules

- Never invent metrics, client names, testimonials, or project details.
- If a fact isn't available, leave the field empty/omitted and add a TODO to
  `data/README.md` rather than guessing. This has already happened once —
  see that file's "Outstanding TODOs" section before adding more seed data.

## Testing rules

- New interactive UI primitives get component tests
  (`packages/ui/src/components/__tests__`, Vitest + Testing Library).
- New service functions get unit tests (`apps/web/services/__tests__`).
- Before considering any task complete, run: `pnpm -r typecheck`,
  `pnpm -r lint`, `pnpm -r --if-present test`, and `pnpm --filter web build`.

## Git rules

- Branch naming: `feature/*`, `fix/*`, `refactor/*`, `docs/*`.
- Conventional-style commit subjects (`feat:`, `fix:`, `refactor:`, `docs:`).
- Keep changes focused; don't mix unrelated refactors into a feature commit.

## Safety rules for AI agents

1. Read this file and `ARCHITECTURE.md` before making changes.
2. Inspect existing code before modifying it — don't guess at conventions.
3. Never overwrite working functionality without a stated reason.
4. Don't touch unrelated files.
5. Don't add dependencies that duplicate something already in the workspace.
6. Never commit secrets — `.env` is gitignored; use `.env.example` for shape.
7. Never invent project information, metrics, clients, or fabricate scope
   completion.
8. Preserve the service-layer abstraction's API when swapping data sources.
9. Run the verification commands above before calling a task done.
10. Keep changes reviewable — small, focused diffs over big-bang rewrites.

# Architecture

## Current state vs. target state

This document describes the **target** architecture from the approved plan.
Only the pieces under "Implemented today" actually exist right now — treat
the rest as the destination, not the current behavior.

### Implemented today

```
apps/web (Next.js, App Router, TypeScript, Tailwind CSS)
  └─ services/*.service.ts  →  data/*.json  (demo data)
packages/ui       — design-system primitives
packages/types    — shared content-model interfaces
packages/config    — design tokens, nav, site metadata
```

### Target (see the plan's roadmap for phasing)

```
                    ┌─────────────────────┐
                    │     User / Visitor  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Next.js Web      │  apps/web
                    │ UI / SEO / Pages    │
                    │ Ask Shafiq AI       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    NestJS API       │  apps/api (Phase 9, not built)
                    │ REST API            │
                    │ Business Logic      │
                    │ AI Service          │
                    └──────┬───────┬──────┘
                           │       │
                ┌──────────┘       └──────────┐
                ▼                             ▼
       ┌─────────────────┐           ┌─────────────────┐
       │   PostgreSQL    │           │      Redis      │
       │ Application DB  │           │ Cache / Session │
       │ pgvector (Phase 12) │       │ Rate Limiting   │
       └─────────────────┘           └─────────────────┘
```

## The service-layer abstraction

Every page/component in `apps/web` reads content through
`apps/web/services/*.service.ts` — never directly from `data/*.json`. Each
service function is `async` and returns a typed value from
`packages/types`, even though the demo-data implementation doesn't need to
be async today. This is deliberate: it means swapping the JSON read for a
`fetch()` call to the NestJS API in Phase 11 requires no changes to any
caller.

```
components/pages
     ↓
services/*.service.ts   (the only seam that changes)
     ↓
data/*.json  →  (later) NestJS API
```

## Content model

Shared TypeScript interfaces live in `packages/types/src/*.ts` — `Profile`,
`Experience`, `Project`, `CaseStudy`, `Article`, `Service`, `SkillCategory`,
`Education`, `Certification`, `GalleryItem`, `ResumeVariant`, `FaqEntry`.
These are the contract between `data/*.json` today and the NestJS API's
response shapes later — the API must not change this contract without
updating both sides deliberately.

## Design system

Tailwind CSS v4 (CSS-first config) with design tokens defined as CSS custom
properties in `apps/web/app/globals.css` and mirrored as plain constants in
`packages/config/src/tokens.ts` for any non-Tailwind consumer (e.g. future OG
image generation). Dark is the default aesthetic; `next-themes` drives the
`.light`/`.dark` class toggle and persists the choice per-browser.

## AI assistant ("Ask Shafiq AI")

Phase 1 (`apps/web/services/ai.service.ts`): a static keyword-match against
`data/faq.json`. It can only ever return a pre-written, reviewed answer or
nothing — it cannot hallucinate. Phase 12 replaces the implementation with a
PostgreSQL + pgvector RAG pipeline behind the same `askShafiq()` signature.

## Deployment (target, not yet wired)

Docker + GitHub Actions CI/CD, described in `DEPLOYMENT.md` once Phase 15
lands.

# API

**Phase 9 in progress — no content endpoints yet.** `apps/api` currently
serves only infrastructure routes; this document will describe real endpoints
as they land.

## Live today

- `GET /health` — version-neutral. Returns `{ status, db, redis }`; 503 when
  Postgres or Redis is unreachable.
- `GET /docs` — Swagger UI.
- All domain routes will be URI-versioned under `/v1/...`.

## Contract in the meantime

`apps/web/services/*.service.ts` already defines the shape every future
endpoint needs to satisfy — each service function's return type (from
`packages/types`) is the response contract. For example:

- `getProfile(): Promise<Profile>` → future `GET /profile`
- `getProjects(): Promise<Project[]>` → future `GET /projects`
- `getProjectBySlug(slug): Promise<Project | undefined>` → future
  `GET /projects/:slug`
- `getCaseStudies()`, `getCaseStudyBySlug(slug)` → `GET /case-studies`,
  `GET /case-studies/:slug`
- `getArticles()`, `getArticleBySlug(slug)` → `GET /articles`,
  `GET /articles/:slug`
- `getServices()`, `getServiceBySlug(slug)` → `GET /services`,
  `GET /services/:slug`
- `getSkillCategories()`, `getEducation()`, `getCertifications()`,
  `getGalleryItems()` → their obvious `GET` equivalents
- `askShafiq(question): Promise<FaqEntry | undefined>` → future
  `POST /ai/ask` (Phase 12 RAG-backed)

When `apps/api` is built, these service functions get their JSON import
swapped for a `fetch()` call — no page or component changes required.

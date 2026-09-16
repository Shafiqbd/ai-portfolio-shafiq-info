# apps/api

Not implemented yet.

This will be the NestJS API (PostgreSQL + Redis) described in `ARCHITECTURE.md`,
scoped to **Phase 9** of the roadmap in the approved plan. Until then, `apps/web`
reads all content from `data/*.json` through its service layer
(`apps/web/services/*.service.ts`), which is designed so that pointing those
services at this API later requires no changes to any page or component.

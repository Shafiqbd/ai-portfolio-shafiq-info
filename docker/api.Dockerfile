# syntax=docker/dockerfile:1.7
#
# Build (from the repo root — pnpm workspaces don't build in isolation):
#   docker build -f docker/api.Dockerfile -t ai-portfolio-api .
#
# Run:
#   docker run --rm -p 4000:4000 --env-file .env ai-portfolio-api

FROM node:24-alpine AS base
RUN corepack enable && corepack prepare pnpm@12.4.2 --activate
WORKDIR /repo

# ---- deps: only invalidated when a manifest or the lockfile changes ----
FROM base AS deps
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/web/package.json apps/web/package.json
COPY apps/api/package.json apps/api/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/ui/package.json packages/ui/package.json
COPY packages/config/package.json packages/config/package.json
RUN pnpm install --frozen-lockfile

# ---- builder ----
FROM deps AS builder
COPY . .
RUN pnpm --filter api build
# pnpm's own workspace-aware production-prune command: produces a
# self-contained dist/ + trimmed node_modules + package.json in one
# directory. packages/ui and packages/config are never pulled in (apps/api
# doesn't depend on them); @shafiq-info/types' raw .ts source lands in
# node_modules as an inert few KB since it's a declared dependency, but
# dist/main.js never actually requires it at runtime — apps/api only ever
# uses it via type-only imports, which are erased at compile time.
RUN pnpm --filter=api --prod deploy /prod/api

# ---- runner ----
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=4000
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001 -G nodejs

COPY --from=builder --chown=nestjs:nodejs /prod/api ./

USER nestjs
EXPOSE 4000
CMD ["node", "dist/main.js"]

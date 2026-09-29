# syntax=docker/dockerfile:1.7
#
# Build (from the repo root — pnpm workspaces don't build in isolation):
#   docker build -f docker/web.Dockerfile -t ai-portfolio-web .
#
# Run:
#   docker run --rm -p 3000:3000 ai-portfolio-web

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
# NEXT_PUBLIC_* vars are inlined into the client bundle at build time, not
# runtime — a VPS-only .env value would never reach the browser bundle.
ARG NEXT_PUBLIC_SITE_URL=https://shafiq.info.bd
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
COPY . .
RUN pnpm --filter web build

# ---- runner: Next's standalone output only ----
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001 -G nodejs

# In a pnpm-workspace monorepo, Next's standalone output mirrors the repo's
# directory structure (apps/web/server.js), not a top-level server.js.
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/public ./apps/web/public

USER nextjs
EXPOSE 3000
CMD ["node", "apps/web/server.js"]

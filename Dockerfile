## =========================================================
## Base
## =========================================================
FROM node:20-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NEXT_TELEMETRY_DISABLED=1
ENV PNPM_VERSION=12.4.1

RUN corepack enable && \
    corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /usr/src/app

## =========================================================
## Dependencies
## =========================================================
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/ ./packages/

RUN --mount=type=cache,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && \
    pnpm install --frozen-lockfile

## =========================================================
## Build
## =========================================================
FROM base AS builder
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/apps/web/node_modules ./apps/web/node_modules
COPY . .

ENV NODE_OPTIONS="--max-old-space-size=4096"

# Replace "web" with the actual "name" in apps/web/package.json
RUN pnpm --filter web build

## =========================================================
## Production runtime (standalone output)
## =========================================================
FROM node:20-bookworm-slim AS production

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      dumb-init ca-certificates curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=4000

RUN groupadd -g 10001 appgroup && \
    useradd -u 10001 -g appgroup -M -s /usr/sbin/nologin appuser

# Next.js standalone layout in a pnpm monorepo:
#   apps/web/.next/standalone/apps/web/server.js
#   apps/web/.next/standalone/node_modules/  (minimal)
#   apps/web/.next/standalone/packages/      (transpiled workspace pkgs)
COPY --from=builder --chown=10001:10001 /usr/src/app/apps/web/.next/standalone ./
COPY --from=builder --chown=10001:10001 /usr/src/app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=10001:10001 /usr/src/app/apps/web/public ./apps/web/public

USER appuser
EXPOSE 4000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "apps/web/server.js"]
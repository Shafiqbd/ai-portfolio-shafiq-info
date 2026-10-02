## =========================================================
## Base
## =========================================================
FROM node:20-bookworm-slim AS base
WORKDIR /usr/src/app
ENV PATH="/usr/src/app/node_modules/.bin:$PATH"

# Pin pnpm once so every stage uses the same version.
# MUST match "packageManager" in package.json.
ENV PNPM_VERSION=12.4.1

## =========================================================
## Dependencies
## =========================================================
FROM base AS deps
RUN corepack enable && \
    corepack prepare pnpm@${PNPM_VERSION} --activate

COPY package.json pnpm-lock.yaml ./

# Store inside the project so hard links stay on the same filesystem.
RUN --mount=type=cache,target=/usr/src/app/.pnpm-store \
    pnpm config set store-dir /usr/src/app/.pnpm-store && \
    pnpm install --frozen-lockfile

## =========================================================
## Build
## =========================================================
FROM base AS builder
RUN corepack enable && \
    corepack prepare pnpm@${PNPM_VERSION} --activate

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm run build

## =========================================================
## Production runtime
## =========================================================
FROM node:20-bookworm-slim AS production

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      dumb-init ca-certificates curl libgnutls30 libssl3 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=4000

# ← THIS is what was missing: enable corepack in production
RUN corepack enable && \
    corepack prepare pnpm@${PNPM_VERSION} --activate

RUN groupadd -g 10001 appgroup && \
    useradd -u 10001 -g appgroup -M -s /usr/sbin/nologin appuser

COPY package.json pnpm-lock.yaml ./

allowBuilds:
  '@scarf/scarf': false
  unrs-resolver: false

# Production-only deps, still inside the project so links stay on one device
RUN --mount=type=cache,target=/usr/src/app/.pnpm-store \
    pnpm config set store-dir /usr/src/app/.pnpm-store && \
    pnpm install --frozen-lockfile --prod

RUN mkdir -p ./.next ./public

COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package.json ./

RUN chown -R 10001:10001 /usr/src/app

USER appuser
EXPOSE 4000
ENTRYPOINT ["dumb-init", "--"]
CMD ["pnpm", "start"]
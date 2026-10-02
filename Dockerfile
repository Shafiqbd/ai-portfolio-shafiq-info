## =========================================================
## Base
## =========================================================
FROM node:20-bookworm-slim AS base
WORKDIR /usr/src/app
ENV PATH="/usr/src/app/node_modules/.bin:$PATH"

## =========================================================
## Dependencies (build-time)
## =========================================================
FROM base AS deps
RUN corepack enable

COPY package*.json ./

RUN npm install --no-audit --no-fund && \
    npm install tar@7.5.19 --save-exact --force && \
    npm dedupe && \
    npm cache clean --force

RUN npm list tar | grep -q "tar@7.5.19" || \
    (echo "ERROR: tar@7.5.19 not installed" && exit 1)

## =========================================================
## Build
## =========================================================
FROM base AS builder
RUN corepack enable

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

## =========================================================
## Production runtime
## =========================================================
FROM node:20-bookworm-slim AS production

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      dumb-init \
      ca-certificates \
      curl \
      libgnutls30 \
      libssl3 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=4000

RUN groupadd -g 10001 appgroup && \
    useradd -u 10001 -g appgroup -M -s /usr/sbin/nologin appuser

COPY package*.json ./

RUN npm install --omit=dev --no-audit --no-fund && \
    npm install tar@7.5.19 --save-exact --force && \
    npm dedupe && \
    npm cache clean --force

RUN echo "=== Verifying tar version ===" && \
    npm list tar && \
    echo "=== Tar version check complete ==="

# Ensure target dirs exist, then copy
RUN mkdir -p ./.next ./public

COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package.json ./

RUN chown -R 10001:10001 /usr/src/app

USER appuser

EXPOSE 4000

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
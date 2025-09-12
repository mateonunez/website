FROM node:24-alpine AS base

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable

WORKDIR /app

# --- Deps stage: install only prod deps with pnpm for caching ---
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm install --frozen-lockfile

# --- Builder stage: build the Next.js app ---
FROM deps AS builder
COPY . .
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm run build

# --- Runtime stage: minimal image using Next standalone output ---
FROM node:24-alpine AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
USER node

# Copy only the standalone server, static assets and required files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# If your app reads MDX files at runtime, include them; otherwise omit
COPY --from=builder /app/articles ./articles

EXPOSE 3000
CMD ["node", "server.js"]

# --- Dev stage: hot-reload development server ---
FROM deps AS dev
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]

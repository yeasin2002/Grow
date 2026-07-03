# Dockerfile for grow server
# Bun-based dependency install/build for monorepo

# Build stage
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copy full monorepo for reliable workspace resolution
COPY . .

# Install workspace dependencies and build server
RUN bun install --frozen-lockfile
WORKDIR /app/apps/server
RUN bun run build

# Runtime stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy built workspace (includes resolved dependencies)
COPY --from=builder /app ./

WORKDIR /app/apps/server

EXPOSE 3000

CMD ["node", "dist/index.js"]

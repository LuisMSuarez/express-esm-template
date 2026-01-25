# -----------------------------
# 1. Build stage
# -----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build TypeScript
RUN npm run build


# -----------------------------
# 2. Runtime stage
# -----------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Only copy production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled JS
COPY --from=builder /app/dist/app ./dist/app

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "dist/app/server.js"]

FROM node:22-alpine AS builder
WORKDIR /app

# 1) copy package.json, install deps
COPY package*.json ./
RUN npm ci

# 2) copy your .env so Vite can read VITE_* vars
COPY .env .env

# 3) copy the rest of the source & build
COPY . .
RUN npm run build

# runtime
FROM caddy:2-alpine
COPY --from=builder /app/dist /srv
CMD ["caddy", "file-server", "--root", "/srv", "--listen", ":80"]

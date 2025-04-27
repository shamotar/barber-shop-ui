
    FROM node:22-alpine AS builder
    WORKDIR /app
    COPY package*.json ./
    RUN npm ci --no-audit --no-fund
    COPY . .
    RUN npm run build          # → /app/dist


    FROM caddy:2-alpine
    COPY --from=builder /app/dist /srv    # static files

    RUN printf ':status 200\nroot * /srv\nfile_server\n' > /etc/caddy/Caddyfile
    EXPOSE 80
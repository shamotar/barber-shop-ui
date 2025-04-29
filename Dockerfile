# build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build         

# runtime
FROM caddy:2-alpine
COPY --from=builder /app/dist /srv 

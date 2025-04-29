
# Build stage 

FROM node:22-alpine AS builder

WORKDIR /app


COPY package*.json ./
RUN npm ci


COPY . .
RUN npm run build          # outputs to /app/dist


# Runtime stage

FROM caddy:2-alpine


COPY --from=builder /app/dist /srv


CMD [ "caddy", "file-server", "--root", "/srv", "--listen", ":80" ]

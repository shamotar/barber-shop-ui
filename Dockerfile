
    FROM node:22-alpine AS base
    WORKDIR /app

    COPY package*.json ./
    RUN npm ci --no-audit --no-fund
    

    FROM base AS dev

    COPY . .
    

    ENV HOST 0.0.0.0
    EXPOSE 5173
    

    CMD ["npm","run","dev"]
    
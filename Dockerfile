FROM node:lts-alpine

WORKDIR /app

COPY server.js package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && pnpm install --prod --frozen-lockfile

COPY dist ./dist

CMD ["pnpm", "preview"]
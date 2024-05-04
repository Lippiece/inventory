FROM oven/bun:latest AS base

WORKDIR /app

FROM base AS install
RUN mkdir -p /temp/client
COPY client/package.json /temp/client/
RUN mkdir -p /temp/server
COPY server/package.json /temp/server/

WORKDIR /temp/client
RUN bun install
WORKDIR /temp/server
RUN bun install

FROM base AS release
WORKDIR /app
COPY . .
COPY --from=install /temp/server/node_modules /app/server/node_modules
COPY --from=install /temp/client/node_modules /app/client/node_modules

FROM base AS build
WORKDIR /app/client
RUN bun run build

WORKDIR /app/server
RUN ls -la 

EXPOSE 3000
USER bun
CMD ["bun", "src/index.ts"]


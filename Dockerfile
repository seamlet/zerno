# syntax=docker/dockerfile:1
# The coffee shop: its pages built with the content published in the CMS, served by an Astro Node
# server without root, which also renders the preview and the photos on request. TLS and the domain
# are on the host's nginx.
#   docker build -t zerno .                                  — the content of https://cms.seamlet.ru
#   docker build --build-arg CMS_ORIGIN=https://cms.example -t zerno .

FROM node:24-alpine AS build
WORKDIR /src
# Only the manifests first: the dependency layer is reused until they change.
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
# Where the content comes from and whose editor may frame the preview; empty is the CMS of
# astro.config.js. The build bakes it in.
ARG CMS_ORIGIN
# The content comes from the CMS, which the build cache cannot see: the workflow passes its run, so
# that a publication of the same commit is built again instead of taken from the cache.
ARG BUILD_RUN
RUN CMS_ORIGIN="$CMS_ORIGIN" npm run build

FROM node:24-alpine AS runtime-dependencies
WORKDIR /src
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=8080
COPY --from=runtime-dependencies /src/node_modules ./node_modules
COPY --from=build /src/dist ./dist
COPY package.json ./
USER node
EXPOSE 8080
CMD ["node", "dist/server/entry.mjs"]

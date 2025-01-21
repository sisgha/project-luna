ARG GIT_COMMIT_HASH

ARG PATH_BUILDER_SOURCE=/tmp/ldsa/.source
ARG PATH_BUILDER_OUTPUT=/tmp/ldsa/.builds

ARG NX_SOCKET_DIR=/tmp/nx-tmp
ARG NX_CACHE_DIRECTORY=/tmp/ldsa/.cache/nx

ARG PATH_RUNTIME_OUTPUT=/usr/local/ladesa-ro/services

# ========================================
# BASE NODEJS IMAGE
# ========================================

FROM node:23 AS base
ARG PATH_BUILDER_SOURCE

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR "${PATH_BUILDER_SOURCE}"
COPY package.json .
RUN corepack install

# ========================================
# BUILD ASSETS
# ========================================

FROM base AS build

ARG GIT_COMMIT_HASH

ARG PATH_BUILDER_OUTPUT

ARG NX_SOCKET_DIR
ARG NX_CACHE_DIRECTORY

ENV NX_DAEMON=true
# ENV NX_VERBOSE_LOGGING=true
ENV NX_SOCKET_DIR=${NX_SOCKET_DIR}
ENV NX_CACHE_DIRECTORY=${NX_CACHE_DIRECTORY}

ENV GIT_COMMIT_HASH=${GIT_COMMIT_HASH}

COPY . "${PATH_BUILDER_SOURCE}"

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile 

# ========================================
# API-SERVICE -- BUILD
# ========================================

FROM build AS build-api-service
ARG NX_CACHE_DIRECTORY

RUN --mount=type=cache,id=nx,target=${NX_CACHE_DIRECTORY},sharing=locked pnpm run --filter "@ladesa-ro/api.service" build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm deploy --prod --filter=@ladesa-ro/api.service "${PATH_BUILDER_OUTPUT}/api-service"

# ========================================
# NPM / API-CLIENT-FETCH / DOCS -- BUILD
# ========================================

FROM build-api-service AS build-npm-api-client-fetch-docs

RUN --mount=type=cache,id=nx,target=${NX_CACHE_DIRECTORY},sharing=locked pnpm run --filter "@ladesa-ro/api-client-fetch.docs" build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm deploy --prod --filter=@ladesa-ro/api-client-fetch.docs "${PATH_BUILDER_OUTPUT}/npm-api-client-fetch.docs"

# ========================================
# NPM / API-CLIENT-FETCH / DOCS -- RUNTIME
# ========================================

FROM nginx:alpine AS npm-api-client-fetch-docs
ARG PATH_BUILDER_OUTPUT
ARG PATH_RUNTIME_OUTPUT

COPY \
  ./integrations/npm/api-client-fetch-docs/nginx.conf \
  /etc/nginx/nginx.conf

COPY --from=build-npm-api-client-fetch-docs  "${PATH_BUILDER_OUTPUT}/npm-api-client-fetch.docs"  "${PATH_RUNTIME_OUTPUT}/npm-api-client-fetch-docs"
EXPOSE 80



# ========================================
# API-SERVICE -- RUNTIME
# ========================================

FROM base AS api-service
ARG PATH_BUILDER_OUTPUT
ARG PATH_RUNTIME_OUTPUT

COPY --from=build-api-service \
  "${PATH_BUILDER_OUTPUT}/api-service" \
  "${PATH_RUNTIME_OUTPUT}/api-service"
WORKDIR "${PATH_RUNTIME_OUTPUT}/api-service"

CMD pnpm run migration:run && pnpm run start:prod

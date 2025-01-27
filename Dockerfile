ARG PATH_BUILDER_SOURCE=/tmp/ldsa/.source
ARG PATH_BUILDER_OUTPUT=/tmp/ldsa/.builds
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

FROM base AS dev-dependencies

ARG PATH_BUILDER_SOURCE

COPY . "${PATH_BUILDER_SOURCE}"

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile 

# ========================================
# API-SERVICE -- BUILD
# ========================================

FROM dev-dependencies AS api-service-builder
ARG PATH_BUILDER_OUTPUT

RUN pnpm run --filter "@ladesa-ro/api.service" build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm deploy --prod --filter=@ladesa-ro/api.service "${PATH_BUILDER_OUTPUT}/api-service"

# ========================================
# NPM / API-CLIENT-FETCH / DOCS -- BUILD
# ========================================

FROM dev-dependencies AS docs-npm-api-client-fetch-builder
ARG PATH_BUILDER_OUTPUT

RUN pnpm run --filter "@ladesa-ro/api-client-fetch.docs" build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm deploy --prod --filter=@ladesa-ro/api-client-fetch.docs "${PATH_BUILDER_OUTPUT}/npm-api-client-fetch-docs"

# ========================================
# NPM / API-CLIENT-FETCH / DOCS -- RUNTIME
# ========================================

FROM nginx:alpine AS docs-npm-api-client-fetch-runtime
ARG PATH_BUILDER_OUTPUT
ARG PATH_RUNTIME_OUTPUT

COPY \
  ./docs/docs-npm-api-client-fetch/nginx.conf \
  /etc/nginx/nginx.conf

COPY --from=docs-npm-api-client-fetch-builder  "${PATH_BUILDER_OUTPUT}/npm-api-client-fetch-docs"  "${PATH_RUNTIME_OUTPUT}/npm-api-client-fetch-docs"
EXPOSE 80

# ========================================
# API-SERVICE -- RUNTIME
# ========================================

FROM base AS api-service-runtime
ARG PATH_BUILDER_OUTPUT
ARG PATH_RUNTIME_OUTPUT

COPY --from=api-service-builder \
  "${PATH_BUILDER_OUTPUT}/api-service" \
  "${PATH_RUNTIME_OUTPUT}/api-service"
WORKDIR "${PATH_RUNTIME_OUTPUT}/api-service"

CMD pnpm run migration:run && pnpm run start:prod

FROM node:16-alpine AS builder

ENV NODE_ENV=production
WORKDIR /app

RUN apk add --no-cache git

COPY package.json yarn.lock ./
RUN yarn install
COPY build/ build/
COPY config/ config/
COPY deploy/ deploy/
COPY src/ src/
COPY static/ static/
COPY .babelrc .postcssrc.js ./
RUN --mount=type=bind,source=./.git,target=/app/.git <<EOS
set -ex
yarn run build:dll
yarn run build
EOS

FROM caddy:2.7.6

WORKDIR /app

COPY --from=builder /app/dist/ ./

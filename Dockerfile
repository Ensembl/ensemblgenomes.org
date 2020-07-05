# builder container
FROM node:lts AS builder

ARG SOURCE_DIR="."
ARG BUILD_DIR='/srv/ensemblgenomes'

RUN mkdir -p ${BUILD_DIR}
COPY ${SOURCE_DIR} ${BUILD_DIR}

WORKDIR ${BUILD_DIR}
RUN npm ci && \
    npm run build

# server container
FROM nginx
COPY --from=builder /srv/ensemblgenomes/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/

FROM node:6.11-alpine

RUN apk add --no-cache nginx git python build-base

VOLUME [ "/OJ_FE", "/var/log/nginx/", "/data/avatar"]
EXPOSE 80

CMD ["/bin/sh", "/OJ_FE/deploy/run.sh"]

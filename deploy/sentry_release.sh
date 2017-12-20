#!/bin/bash
DATE=`date +%Y%m%d`
COMMIT=`git rev-parse HEAD`
VERSION="$DATE-${COMMIT:0:5}"
TOKEN=95c95811dcf14d4e9fdf2e63b9e027367b3bd1db91ab42a49e72648b7751ae6d

echo "Current version is $VERSION"

if [ ! -z $USE_SENTRY ] && [ $USE_SENTRY == '1' ]; then

# create new release according to `VERSION`
docker run --rm -it -v $(pwd):/work getsentry/sentry-cli \
   sentry-cli --auth-token $TOKEN releases -o onlinejudge -p onlinejudgefe new $VERSION

# upload js and source_maps
docker run --rm -it -v $(pwd):/work getsentry/sentry-cli \
   sentry-cli --auth-token $TOKEN releases -o onlinejudge -p onlinejudgefe files $VERSION upload-sourcemaps ./dist/static/js
fi

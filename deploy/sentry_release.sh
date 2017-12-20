#!/bin/sh
DATE=`date +%Y%m%d`
COMMIT=`git rev-parse HEAD`
VERSION="$DATE-${COMMIT:0:5}"

echo "Current version is $VERSION"

# create new release according to `VERSION`
docker run --rm -it -v $(pwd):/work getsentry/sentry-cli \
    sentry-cli --auth-token 95c95811dcf14d4e9fdf2e63b9e027367b3bd1db91ab42a49e72648b7751ae6d releases -o onlinejudge -p onlinejudgefe $VERSION

# upload js and source_maps
docker run --rm -it -v $(pwd):/work getsentry/sentry-cli \
    sentry-cli --auth-token 95c95811dcf14d4e9fdf2e63b9e027367b3bd1db91ab42a49e72648b7751ae6d releases -o onlinejudge -p onlinejudgefe files $VERSION upload-sourcemaps ./dist/static/js 

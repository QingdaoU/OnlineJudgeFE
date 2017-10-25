#!/bin/sh

run_build() {
    cd $1
    npm install --registry=https://registry.npm.taobao.org && \
    npm run build

    if [ $? -ne 0 ]; then
        echo "Build error, please check node version and package.json"
        exit 1
    fi

    echo -e "Build success, dist files in $1/dist\n"
}

run_build /OJ_FE/oj
run_build /OJ_FE/admin
echo -e "\n\n Congratulations, All have done without error."
echo -e "you can check the onlinejudge with http://IP:80 \n"

exec nginx -c /OJ_FE/deploy/nginx.conf

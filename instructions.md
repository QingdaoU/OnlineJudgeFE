# QingdaoU OnlineJudge 安装及二次开发指南

> ### by sway 2018-12-16 ###

## 系统安装及更新

1. 安装操作系统：ubuntu 18.04 server LTS，全部用默认安装，无需特意设置，安装后重启；
2. 修改源：`sudo vi /etc/apt/sources.list`
   
  追加4行：
  `deb http://cn.archive.ubuntu.com/ubuntu bionic main multiverse restricted universe`
  `deb http://cn.archive.ubuntu.com/ubuntu bionic-updates main multiverse restricted universe`
  `deb http://cn.archive.ubuntu.com/ubuntu bionic-security main multiverse restricted universe`
  `deb http://cn.archive.ubuntu.com/ubuntu bionic-proposed main multiverse restricted universe`
3. sudo apt-get update
4. sudo apt-get upgrade

## 环境配置（有些已经预装，可忽略）

1. `sudo apt-get install -y vim`
2. `sudo apt-get install -y curl`
3. `sudo apt-get install -y python3-pip`
4. `sudo apt-get install -y git`
5. `pip3 install docker-compose`
6. `sudo snap install docker`

## 首次安装OJ

1. git clone -b 2.0 https://github.com/QingdaoU/OnlineJudgeDeploy.git && cd OnlineJudgeDeploy
2. root用户执行：`docker-compose up –d`
   
   非root用户执行：`sudo -E docker-compose up –d` （一定要-E参数，否则会出现数据丢失，原因未知）

## 更新OJ

1. `cd OnlineJudgeDeploy`
2. `sudo git pull`
3. `sudo docker-compose pull`
4. root用户执行：`docker-compose up –d`
   
   非root用户执行：`sudo -E docker-compose up –d` （一定要-E参数，否则会出现数据丢失，原因未知）
  
## 前端二次开发环境

1. `sudo apt-get install -y nodejs npm`
2. 首次拉取代码：`git clone https://github.com/shaohuihuang/OnlineJudgeFE.git`
   
   或者更新代码：`cd OnlineJudgeFE && git pull`
3. `cd OnlineJudgeFE`
4. `npm install`

## 前端注入

1. `NODE_ENV=production npm run build:dll`
2. `export TARGET=http://Your-backend`
3. `npm run build`
4. `sudo docker cp ./dist oj-backend:/app/`
5. `sudo docker exec -it oj-backend /bin/sh`
6. `cd deploy`
7. `./entrypoint.sh`
8. `exit`

## 后端二次开发

1. 首次拉取代码：`git clone https://github.com/shaohuihuang/OnlineJudge.git`
   
   或者更新代码：`cd OnlineJudge && git pull`
2. `cd OnlineJudge`
3. `sudo docker cp ./ oj-backend:/app/`

## 数据库容器操作

+ 进入：sudo docker exec -it oj-postgres /bin/sh
+ 备份：pg_dump -U onlinejudge -F t -f 1216.tar onlinejudge
+ 还原：pg_restore –c –U onlinejudge –d onlinejudge 1216.tar
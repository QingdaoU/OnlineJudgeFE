# QingdaoU OnlineJudge 安装及二次开发指南

> ### by sway 2018-12-21 ###

## 系统安装及更新

1. 安装操作系统：ubuntu 18.04 server LTS，全部用默认安装，无需特意设置，安装后重启；
2. 修改源：`sudo vi /etc/apt/sources.list`
   追加4行：
   ```
   deb http://cn.archive.ubuntu.com/ubuntu bionic main multiverse restricted universe
   deb http://cn.archive.ubuntu.com/ubuntu bionic-updates main multiverse restricted universe
   deb http://cn.archive.ubuntu.com/ubuntu bionic-security main multiverse restricted universe
   deb http://cn.archive.ubuntu.com/ubuntu bionic-proposed main multiverse restricted universe
   ```
3. `sudo apt-get update`
4. `sudo apt-get upgrade`

## 环境配置

1. `sudo apt-get install -y python3-pip`
2. `sudo apt-get install -y git`
3. `pip3 install docker-compose`
4. `sudo snap install docker`
   
## node版本

直接`sudo apt install nodejs`装的是8.10.0版本，为与开发文档一致，最好安装8.12.0版
1. 安装npm：`sudo apt install npm`
2. 安装n：`sudo npm install -g n`
3. 利用n下载安装指定node版本，支持以下命令：
   + `sudo n lts` 长期支持版
   + `sudo n stable` 稳定版
   + `sudo n latest` 最新版
   + `sudo n 8.12.0` 指定版本
   + `sudo n` 列出所有版本，然后直接键盘上下移动选择切换的版本，回车确认

## 首次安装OJ

1. `git clone -b 2.0 https://github.com/QingdaoU/OnlineJudgeDeploy.git && cd OnlineJudgeDeploy`
2. root用户执行：`docker-compose up`  
   非root用户执行：`sudo -E docker-compose up` （一定要-E参数，否则会出现数据丢失，原因未知）

## 更新OJ

1. `cd OnlineJudgeDeploy`
2. `sudo git pull`
3. `sudo docker-compose pull`
4. root用户执行：`docker-compose up –d`  
   非root用户执行：`sudo -E docker-compose up –d` （一定要-E参数，否则会出现数据丢失，原因未知）
  
## 前端二次开发环境

1. 首次拉取代码：`git clone https://github.com/shaohuihuang/OnlineJudgeFE.git`  
   或者更新代码：`cd OnlineJudgeFE && git pull`
2. `cd OnlineJudgeFE`
3. `npm install`

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

+ 进入：`sudo docker exec -it oj-postgres /bin/sh`
+ 备份：`pg_dump -U onlinejudge -F t -f 1216.tar onlinejudge`
+ 还原：`pg_restore –c –U onlinejudge –d onlinejudge 1216.tar`

## 不同数据库版本之间的备份

前面的备份在postgres版本不同时貌似不能成功，需要改为如下方案：

### 准备活动

1. 备份为sql格式：`sudo docker exec -it oj-postgres pg_dumpall -c -U onlinejudge > 1221.sql`
2. 复制到容器内：`sudo docker cp 1221.sql oj-postgres:/`
3. 断开数据库连接：`sudo docker stop oj-backend`

### psql操作

1. 进入容器：`sudo docker exec -it oj-postgres /bin/sh`
2. 用onlinejudge身份进入postgres数据库：`psql -U onlinejudge -d postgres`
3. 删除旧库：`drop database onlinejudge;`
4. 创建新库：`create database onlinejudge;`
5. 退出库：`\q`
6. 导入sql：`psql -U onlinejudge -d onlinejudge < 1221.sql` 
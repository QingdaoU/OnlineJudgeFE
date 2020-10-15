NODE_ENV=production npm run build:dll
export TARGET=http://Your-backend
npm run build
sudo docker cp ./dist oj-backend:/app/
sudo docker exec -it oj-backend /bin/sh

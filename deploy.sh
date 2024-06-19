cd ~/timetrack2;
git reset --hard origin/master;
sudo systemctl start mongod;
git pull;
cd client;
npm install;
npm run build;
cd ..;
npm install;
sed -i 's/const port = [0-9]\+;/const port = 80;/' index.js
sudo pm2 start npm -- start
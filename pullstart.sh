git reset --hard origin/master;
git pull;
cd ~/timetrack2;
cd client;
npm install;
npm run build;
cd ..;
npm install;
sed -i 's/const port = [0-9]\+;/const port = 80;/' index.js
sudo pm2 start npm -- start
cd ~/timetrack2;
git pull;
npm install;
sudo pm2 start npm -- start;
sudo systemctl start mongod;
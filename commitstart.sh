IPADDRESS="35.154.205.209"
REMOTE_COMMANDS="cd ~/timetrack2 && bash pullstart.sh"

if [ -n "$1" ]
  then
    git add .
    git commit -m "$1"
fi

ssh -i ~/.ssh/Ubuntu_server.pem ubuntu@$IPADDRESS "$REMOTE_COMMANDS"
exit
echo "Server not setup yet"
# rsync -av -e ssh --exclude='node_modules' --exclude='.git' --exclude='.env' --exclude='uploads' ./* ubuntu@89.12.19.102:/home/ubuntu/app/backend/
# ssh ubuntu@89.12.19.102 "cd app/backend && npm install && pm2 restart index && pm2 logs"
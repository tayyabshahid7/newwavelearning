#!/bin/bash
string=`cat ~/ip`

array=(${string//,/ })

for i in "${!array[@]}"
do
    echo "Deploy project on server ${array[i]}"
    ssh ubuntu@${array[i]} "
        pm2 delete 0;\\
        cd frontend &&\\
        git stash &&\\
        git fetch --all &&\\
        git pull &&\\
        rm -rf build &&\\
        yarn install &&\\
        yarn build &&\\
        pm2 start ~/ecosystem.config.js"
done
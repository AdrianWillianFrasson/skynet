#!/bin/bash
set +e
cd /home/orangepi/Documents/skynet

git reset --hard
git clean -fd
git pull

npm install
npm run build
npm run db_push

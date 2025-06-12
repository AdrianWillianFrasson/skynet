#!/bin/bash
cd /home/orangepi/Documents/skynet
sudo -E env "PATH=$PATH" npm run build
sudo -E env "PATH=$PATH" npm run preview

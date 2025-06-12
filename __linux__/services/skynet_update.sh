#!/bin/bash
cd /home/orangepi/Documents/skynet
sudo git reset --hard || true
sudo git clean -fd || true
sudo git pull || true

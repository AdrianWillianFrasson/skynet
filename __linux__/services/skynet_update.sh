#!/bin/bash
cd /home/orangepi/Documents/skynet
git reset --hard || true
git clean -fd || true
git pull || true

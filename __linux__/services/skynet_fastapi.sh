#!/bin/bash
cd /home/orangepi/Documents/skynet
sudo -E env "PATH=$PATH" fastapi run ./__python__/main.py

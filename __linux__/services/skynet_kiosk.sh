#!/bin/bash
set +e

xset s noblank
xset s off
xset -dpms

unclutter -idle 0.01 -root &

chromium http://localhost/IHM --kiosk --noerrdialogs --disable-infobars --disable-session-crashed-bubble

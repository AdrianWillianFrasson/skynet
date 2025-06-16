#!/bin/bash
set +e

xset s noblank
xset s off
xset -dpms

unclutter --hide-on-touch --timeout 0 --root &

chromium http://localhost/IHM --kiosk --noerrdialogs --disable-infobars --disable-session-crashed-bubble

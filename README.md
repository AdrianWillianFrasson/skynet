# SKYNET

LUL

```
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/node" "/usr/local/bin/node"
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npm" "/usr/local/bin/npm"
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npx" "/usr/local/bin/npx"
sudo ln -s "/home/orangepi/.pyenv/shims/fastapi" "/usr/local/bin/fastapi"
```

## Linux services

```
sudo cp -f /home/orangepi/Documents/skynet/__linux__/services/skynet_update.service /etc/systemd/system/skynet_update.service
sudo cp -f /home/orangepi/Documents/skynet/__linux__/services/skynet_fastapi.service /etc/systemd/system/skynet_fastapi.service
sudo cp -f /home/orangepi/Documents/skynet/__linux__/services/skynet_astro.service /etc/systemd/system/skynet_astro.service
```

```
chmod +x /home/orangepi/Documents/skynet/__linux__/services/skynet_update.sh
chmod +x /home/orangepi/Documents/skynet/__linux__/services/skynet_fastapi.sh
chmod +x /home/orangepi/Documents/skynet/__linux__/services/skynet_astro.sh

chown orangepi:orangepi /home/orangepi/Documents/skynet/__linux__/services/skynet_update.sh
chown orangepi:orangepi /home/orangepi/Documents/skynet/__linux__/services/skynet_fastapi.sh
chown orangepi:orangepi /home/orangepi/Documents/skynet/__linux__/services/skynet_astro.sh
```

```
sudo systemctl daemon-reexec
sudo systemctl daemon-reload

sudo systemctl enable skynet_update.service
sudo systemctl enable skynet_fastapi.service
sudo systemctl enable skynet_astro.service
```

Status:

```
sudo systemctl status skynet_update.service
sudo systemctl status skynet_fastapi.service
sudo systemctl status skynet_astro.service
```

Logs:

```
journalctl -u skynet_fastapi.service -f
journalctl -u skynet_astro.service -f
```

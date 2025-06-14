# SKYNET

LUL

```
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/node" "/usr/local/bin/node"
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npm" "/usr/local/bin/npm"
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npx" "/usr/local/bin/npx"
sudo ln -s "/home/orangepi/.pyenv/shims/fastapi" "/usr/local/bin/fastapi"
```

```
cd /home/orangepi/Documents
git clone https://github.com/AdrianWillianFrasson/skynet.git
```

```
cd /home/orangepi/Documents/skynet
git config --global --add safe.directory "*"
```

## Linux services

```
sudo cp -r -f /home/orangepi/Documents/skynet/__linux__/services /home/orangepi/Documents/services
```

```
sudo cp -f /home/orangepi/Documents/skynet/__linux__/services/skynet_update.service /etc/systemd/system/skynet_update.service
sudo cp -f /home/orangepi/Documents/skynet/__linux__/services/skynet_fastapi.service /etc/systemd/system/skynet_fastapi.service
sudo cp -f /home/orangepi/Documents/skynet/__linux__/services/skynet_astro.service /etc/systemd/system/skynet_astro.service
```

```
sudo chmod +x /home/orangepi/Documents/services/skynet_update.sh
sudo chmod +x /home/orangepi/Documents/services/skynet_fastapi.sh
sudo chmod +x /home/orangepi/Documents/services/skynet_astro.sh

sudo chown orangepi:orangepi /home/orangepi/Documents/services/skynet_update.sh
sudo chown orangepi:orangepi /home/orangepi/Documents/services/skynet_fastapi.sh
sudo chown orangepi:orangepi /home/orangepi/Documents/services/skynet_astro.sh
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

# SKYNET

LUL

## Linux services

```
sudo cp /home/orangepi/Documents/skynet/__linux__/services/skynet_update.service /etc/systemd/system/skynet_update.service
sudo cp /home/orangepi/Documents/skynet/__linux__/services/skynet_fastapi.service /etc/systemd/system/skynet_fastapi.service
sudo cp /home/orangepi/Documents/skynet/__linux__/services/skynet_astro.service /etc/systemd/system/skynet_astro.service
```

```
sudo chmod +x /home/orangepi/Documents/skynet/__linux__/services/skynet_update.sh
sudo chmod +x /home/orangepi/Documents/skynet/__linux__/services/skynet_fastapi.sh
sudo chmod +x /home/orangepi/Documents/skynet/__linux__/services/skynet_astro.sh
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

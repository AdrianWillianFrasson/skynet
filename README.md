# SKYNET

LUL

## Linux services

/etc/systemd/system/skynet_astro.service

/etc/systemd/system/skynet_fastapi.service

```
chmod +x /home/orangepi/Documents/skynet/__linux__/services/skynet_astro.sh
chmod +x /home/orangepi/Documents/skynet/__linux__/services/skynet_fastapi.sh
```

```
sudo systemctl daemon-reexec
sudo systemctl daemon-reload

sudo systemctl enable skynet_astro.service
sudo systemctl enable skynet_fastapi.service
```

Status:

```
sudo systemctl status skynet_astro.service
sudo systemctl status skynet_fastapi.service
```

Logs:

```
journalctl -u skynet_astro.service -f
journalctl -u skynet_fastapi.service -f
```

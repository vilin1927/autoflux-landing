# Deployment Info

## Production Server

- **IP**: 194.36.88.191
- **Hostname**: 194-36-88-191.cloud-xip.com
- **Location**: EU-FR - Frankfurt, Germany
- **Server ID**: 7623ee32-b987-41dd-8008-7d554149d288

### Specs
- CPU: 4 cores
- Memory: 8192 MB
- Disk: 100 GB
- OS: Linux

## Deployment Commands

```bash
# SSH to server
ssh root@194.36.88.191

# Deploy (run on server)
cd /var/www/autoflux-landing && git pull origin main && npm install && npm run build && pm2 restart autoflux
```

## Server Paths
- App location: `/var/www/autoflux-landing`
- PM2 process name: `autoflux`

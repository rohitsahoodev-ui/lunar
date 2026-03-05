# LunarHost Installation Guide

## Prerequisites
- Ubuntu 22.04 or later
- Node.js 18+
- MySQL 8+ or MariaDB
- Nginx (for reverse proxy)
- PM2 (for process management)

## Step 1: System Update
```bash
sudo apt update && sudo apt upgrade -y
```

## Step 2: Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Step 3: Install MySQL
```bash
sudo apt install mysql-server -y
sudo mysql_secure_installation
```

## Step 4: Create Database
```sql
CREATE DATABASE lunarhost;
CREATE USER 'lunaruser'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON lunarhost.* TO 'lunaruser'@'localhost';
FLUSH PRIVILEGES;
```

## Step 5: Clone and Configure
```bash
git clone https://github.com/your-repo/lunarhost.git
cd lunarhost
npm install
cp .env.example .env
# Edit .env with your credentials
```

## Step 6: Import Database Schema
```bash
mysql -u lunaruser -p lunarhost < database.sql
```

## Step 7: Start Server with PM2
```bash
sudo npm install -g pm2
pm2 start server.js --name "lunarhost"
pm2 save
pm2 startup
```

## Step 8: Configure Nginx (Optional)
Create a new Nginx config file:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

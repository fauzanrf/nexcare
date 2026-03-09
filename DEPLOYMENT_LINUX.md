# 🐧 Panduan Deployment di Linux Server (Production)

Panduan ini menjelaskan cara melakukan deployment NexCare (Backend NestJS + Frontend React) pada server Linux (Ubuntu/Debian) menggunakan **PM2** dan **Nginx**.

---

## 1. Prasyarat Server
Pastikan server Linux Anda sudah terinstall:
- **Node.js** (Minimal versi 18)
- **NPM** (Minimal versi 9)
- **MySQL** (Minimal versi 8.x)
- **Nginx**
- **Git**

---

## 2. Clone Repository
```bash
cd /var/www
git clone <url-repository-nexcare> nexcare
cd nexcare
```
*Pastikan folder `/var/www/nexcare` dimiliki oleh user Anda (bukan root).*

---

## 3. Setup Database MySQL
Login ke MySQL sebagai root:
```bash
sudo mysql -u root -p
```
Buat database dan beri hak akses:
```sql
CREATE DATABASE IF NOT EXISTS nexcare_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY 'password_kuat_anda';
GRANT ALL PRIVILEGES ON nexcare_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 4. Setup Backend (NestJS)

### A. Install Dependencies
```bash
cd /var/www/nexcare/nexcare-backend
npm install
```

### B. Konfigurasi Environment (`.env`)
```bash
cp .env.example .env
nano .env
```
Sesuaikan nilainya untuk production:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=password_kuat_anda
DB_NAME=nexcare_db

JWT_SECRET=rahasia_jwt_sangat_kuat_dan_panjang
JWT_EXPIRES_IN=60m
JWT_REFRESH_SECRET=rahasia_refresh_jwt_sangat_kuat
JWT_REFRESH_EXPIRES_IN=7d

PORT=3001
FRONTEND_URL=https://nama-domain-anda.com
UPLOADS_DIR=./uploads
```

### C. Build & Seed Database
```bash
npm run build
npm run seed  # Hanya dijalankan SEKALI saat instalasi pertama
```

### D. Jalankan dengan PM2
Agar backend berjalan di background dan otomatis restart saat server reboot:
```bash
# Install PM2 jika belum ada
sudo npm install -g pm2

# Mulai backend
pm2 start dist/main.js --name "nexcare-backend"

# Simpan konfigurasi agar auto-start
pm2 save
pm2 startup
```

---

## 5. Setup Frontend (React/Vite)

### A. Konfigurasi API Target
Edit file `api.js` untuk mengarah ke IP atau domain backend (contoh: setup dengan subdomain API):
```bash
cd /var/www/nexcare/nexcare-admin
nano src/lib/api.js
```
Ubah `BASE_URL`:
```javascript
const BASE_URL = 'https://api.nama-domain-anda.com'; 
```

### B. Build Frontend
```bash
npm install
npm run build
```
Hasil build akan berada di `/var/www/nexcare/nexcare-admin/dist`.

---

## 6. Konfigurasi Nginx (Reverse Proxy)

Kita buat 2 virtual host: satu untuk frontend, satu untuk backend API.

```bash
sudo nano /etc/nginx/sites-available/nexcare
```

Isi dengan konfigurasi berikut:

```nginx
# Konfigurasi Backend API
server {
    listen 80;
    server_name api.nama-domain-anda.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Untuk upload file besar (RFO PDF/Image)
        client_max_body_size 50M; 
    }
}

# Konfigurasi Frontend
server {
    listen 80;
    server_name nama-domain-anda.com;
    
    root /var/www/nexcare/nexcare-admin/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Aktifkan konfigurasi dan restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/nexcare /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 7. Setup SSL (HTTPS) dengan Certbot
Aplikasi sangat disarankan berjalan di HTTPS (terutama karena JWT menggunakan cookie).
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d nama-domain-anda.com -d api.nama-domain-anda.com
```

Selesai! NexCare sekarang dapat diakses melalui domain Anda.

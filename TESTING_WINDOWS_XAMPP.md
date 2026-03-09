# 🪟 Panduan Testing di Windows Menggunakan XAMPP

Panduan ini ditujukan jika Anda ingin melakukan pengujian NexCare (Backend NestJS + Frontend React) di sistem operasi Windows lokal menggunakan **XAMPP** sebagai database server.

---

## 1. Prasyarat 
Pastikan sistem Windows Anda sudah terpasang:
- **Node.js** (Minimal versi 18, disarankan versi LTS).
- **XAMPP** (Dengan modul MySQL/MariaDB).
- **Git** (Opsional, untuk clone repository).

---

## 2. Setup Database di XAMPP

1. Buka **XAMPP Control Panel**.
2. Klik tombol **Start** pada modul **MySQL**.
3. Klik tombol **Admin** pada modul MySQL untuk membuka **phpMyAdmin** (biasanya terbuka di `http://localhost/phpmyadmin`).
4. Pada phpMyAdmin, buka tab **SQL** dan jalankan perintah berikut untuk membuat database:
   ```sql
   CREATE DATABASE nexcare_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

*Catatan: Secara default, MySQL XAMPP menggunakan username `root` dan password kosong (` `).*

---

## 3. Clone / Extract File Project
Letakkan folder project NexCare Anda di direktori lokal (misal di `C:\Projects\nexcare`).
Anda tidak perlu meletakkan project ini di dalam folder `htdocs` XAMPP karena kita akan menggunakan Node.js untuk menjalankannya.

---

## 4. Setup Backend (NestJS)

Buka terminal/Command Prompt/PowerShell dan arahkan ke folder backend:

```cmd
cd C:\Path\Ke\Project\nexcare\nexcare-backend
```

### A. Ubah Konfigurasi Environment
Buat file `.env` (atau salin dari `.env.example`) dan pastikan konfigurasi databasenya sesuai dengan XAMPP:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=            # Kosongkan password karena default XAMPP tanpa password
DB_NAME=nexcare_db

JWT_SECRET=secret_uji_coba_lokal
JWT_EXPIRES_IN=60m
JWT_REFRESH_SECRET=refresh_secret_uji_coba_lokal
JWT_REFRESH_EXPIRES_IN=7d

PORT=3001
FRONTEND_URL=http://localhost:5173
UPLOADS_DIR=./uploads
```

### B. Install Dependencies & Jalankan
Lakukan instalasi module terlebih dahulu:
```cmd
npm install
```

Pertama kali jalankan, lakukan seeding agar ada akun administrator untuk login:
```cmd
npm run seed
```

Jalankan server backend:
```cmd
npm run start:dev
```
*Biarkan terminal ini tetap terbuka. Backend berjalan di `http://localhost:3001`.*

---

## 5. Setup Frontend (React)

Buka terminal/Command Prompt/PowerShell **baru**, lalu arahkan ke folder frontend:

```cmd
cd C:\Path\Ke\Project\nexcare\nexcare-admin
```

### A. Cek Konfigurasi API
Pastikan variabel URL API mengarah ke backend lokal Anda. Buka file `src/lib/api.js` (jika tidak menggunakan variabel `.env` client):

```javascript
// Pastikan BASE_URL mengarah ke localhost:3001
const BASE_URL = 'http://localhost:3001'; 
```

### B. Install Dependencies & Jalankan
Install module React:
```cmd
npm install
```

Jalankan server frontend lokal (Vite):
```cmd
npm run dev
```

*Frontend akan berjalan di `http://localhost:5173`. Biarkan terminal ini tetap terbuka.*

---

## 6. Mulai Testing!

1. Buka browser dan arahkan ke `http://localhost:5173`.
2. Halaman login akan muncul. Gunakan akun yang dibuat pada tahap *seed* sebelumnya:
   - **Super Admin:** `admin@internetwork.net.id` / `admin`
   - **NOC 2:** `noc2@internetwork.net.id` / `noc2`
3. Anda dapat melihat perubahan file di editor (misalnya VS Code) secara *real-time* tanpa perlu merestart server.
4. Database dan data Anda dapat dilihat sewaktu-waktu melalui `http://localhost/phpmyadmin`.

---

## ⚠️ Troubleshooting Umum di Windows:

- **MySQL tidak bisa Start di XAMPP:** Biasanya terjadi karena port 3306 sudah dipakai aplikasi lain (seperti MySQL bawaan Windows/Workbench). Matikan service MySQL Windows (`services.msc` -> cari MySQL -> Stop), atau ubah port MySQL XAMPP.
- **Backend Error Connection Refused:** Pastikan XAMPP MySQL dalam keadaan menyala ("Running") hijau di control panel.
- **File Upload Gagal:** Pastikan folder `uploads/` yang tertera pada `.env` backend terbentuk dan dapat ditulisi (biasanya di Windows tidak ada masalah *file permission* seperti di Linux).

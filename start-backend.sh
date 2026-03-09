#!/bin/bash
# NexCare Backend Startup Script

# Load Node.js from fnm
eval "$(/home/fauzan-r-faris/nexcare/.fnm/fnm env)"

echo "==================================="
echo "     NEXCARE BACKEND STARTUP"
echo "==================================="

# Step 1: Start MySQL
echo ""
echo "🔧 Starting MySQL server..."
sudo systemctl start mysql 2>/dev/null || sudo service mysql start 2>/dev/null || echo "⚠️  MySQL may already be running"

# Step 2: Create database
echo ""
echo "🗄️  Creating database nexcare_db (if not exists)..."
sudo mysql -u root -e "CREATE DATABASE IF NOT EXISTS nexcare_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null
sudo mysql -u root -e "CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY '';" 2>/dev/null || true
sudo mysql -u root -e "GRANT ALL PRIVILEGES ON nexcare_db.* TO 'root'@'localhost'; FLUSH PRIVILEGES;" 2>/dev/null

echo "✅ Database ready!"

# Step 3: Start backend
echo ""
echo "🚀 Starting NestJS backend on http://localhost:3001..."
cd /home/fauzan-r-faris/nexcare/nexcare-backend
npm run start:dev

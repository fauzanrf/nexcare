#!/bin/bash
# NexCare Frontend Startup Script

eval "$(/home/fauzan-r-faris/nexcare/.fnm/fnm env)"

echo "==================================="
echo "     NEXCARE FRONTEND STARTUP"
echo "==================================="

echo ""
echo "🌐 Starting React frontend on http://localhost:5173..."
cd /home/fauzan-r-faris/nexcare/nexcare-admin
npm run dev

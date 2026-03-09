#!/bin/bash
# NexCare Database Seeder
# Run this ONCE after backend is started for the first time

eval "$(/home/fauzan-r-faris/nexcare/.fnm/fnm env)"

echo "==============================="
echo "  NEXCARE DATABASE SEEDER"
echo "==============================="
echo ""
echo "🌱 Seeding initial users..."

cd /home/fauzan-r-faris/nexcare/nexcare-backend
npm run seed

echo ""
echo "Done! You can now login with:"
echo ""
echo "  Super Admin:       admin@internetwork.net.id   / admin"
echo "  NOC 2:             noc2@internetwork.net.id         / noc2"
echo "  NOC 1:             noc1@internetwork.net.id         / noc1"
echo "  Technical Support: techsup@internetwork.net.id         / techsup"
echo "  Magang:            magang@internetwork.net.id       / magang"
echo "  Provisioning:      provisioning@internetwork.net.id / provi"

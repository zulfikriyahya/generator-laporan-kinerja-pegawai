# E-Kinerja Backend - Setup Guide

Panduan lengkap untuk setup dan menjalankan backend E-Kinerja.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [Database Setup](#database-setup)
4. [Environment Configuration](#environment-configuration)
5. [Running the Application](#running-the-application)
6. [API Testing](#api-testing)
7. [Common Issues](#common-issues)

---

## Prerequisites

### Required Software

1. **Node.js** (v18 atau lebih tinggi)
   ```bash
   node --version  # Should be >= 18.x
   ```

2. **MySQL** (v8.0 atau lebih tinggi)
   ```bash
   mysql --version
   ```

3. **Redis** (v6.0 atau lebih tinggi)
   ```bash
   redis-server --version
   ```

4. **npm atau yarn**
   ```bash
   npm --version
   ```

### Optional

- **Docker & Docker Compose** (jika ingin menggunakan container)
- **Postman** atau **Insomnia** (untuk testing API)

---

## Installation Steps

### 1. Clone Repository

```bash
git clone <repository-url>
cd backend
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
```

Ini akan menginstall semua dependencies yang diperlukan termasuk:
- NestJS core & platform
- Prisma & Prisma Client
- Passport & JWT
- BullMQ & Redis
- Winston (logging)
- Helmet (security)
- Dan lain-lain

### 3. Verify Installation

```bash
npm run build
```

Jika build berhasil, maka instalasi sudah benar.

---

## Database Setup

### Option 1: Local MySQL

#### 1. Install MySQL

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
```

**macOS (with Homebrew):**
```bash
brew install mysql
brew services start mysql
```

**Windows:**
Download installer dari: https://dev.mysql.com/downloads/mysql/

#### 2. Create Database

```bash
# Login ke MySQL
mysql -u root -p

# Buat database
CREATE DATABASE ekinerja CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Buat user (opsional)
CREATE USER 'ekinerja_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON ekinerja.* TO 'ekinerja_user'@'localhost';
FLUSH PRIVILEGES;

# Exit
exit;
```

### Option 2: Docker MySQL

```bash
# Run MySQL container
docker run --name mysql-ekinerja \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=ekinerja \
  -p 3306:3306 \
  -d mysql:8.0

# Verify
docker ps | grep mysql-ekinerja
```

### Setup Prisma

#### 1. Update DATABASE_URL di `.env`

```env
DATABASE_URL="mysql://ekinerja_user:your_password@localhost:3306/ekinerja"
# atau jika pakai Docker:
DATABASE_URL="mysql://root:root@localhost:3306/ekinerja"
```

#### 2. Generate Prisma Client

```bash
npm run prisma:generate
```

#### 3. Run Migrations

```bash
# Development
npm run prisma:migrate

# Atau manual
npx prisma migrate dev --name init
```

#### 4. (Optional) Seed Database

```bash
npm run prisma:seed
```

#### 5. Verify Database

```bash
# Open Prisma Studio (Database GUI)
npm run prisma:studio
```

Akan membuka http://localhost:5555

---

## Redis Setup

### Option 1: Local Redis

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis
sudo systemctl enable redis

# Test
redis-cli ping  # Should return PONG
```

**macOS:**
```bash
brew install redis
brew services start redis
redis-cli ping
```

**Windows:**
Download dari: https://github.com/microsoftarchive/redis/releases

### Option 2: Docker Redis

```bash
docker run --name redis-ekinerja \
  -p 6379:6379 \
  -d redis:latest

# Test
docker exec -it redis-ekinerja redis-cli ping
```

---

## Environment Configuration

### 1. Copy Environment File

```bash
cp .env.example .env
```

### 2. Edit `.env` File

```env
# ============================================
# APPLICATION
# ============================================
NODE_ENV=development
PORT=3000
APP_NAME=E-Kinerja Backend API
API_VERSION=v1

# ============================================
# DATABASE
# ============================================
DATABASE_URL="mysql://ekinerja_user:password@localhost:3306/ekinerja"

# ============================================
# JWT AUTHENTICATION
# ============================================
# Generate dengan: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_REFRESH_EXPIRES_IN=30d

# ============================================
# REDIS
# ============================================
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# ============================================
# QUEUE (BullMQ)
# ============================================
QUEUE_PREFIX=ekinerja

# ============================================
# AI SERVICES (Pilih salah satu atau semua)
# ============================================
GEMINI_API_KEY=AIza...      # Free - https://makersuite.google.com/app/apikey
GROQ_API_KEY=gsk_...         # Free - https://console.groq.com/keys
TOGETHER_API_KEY=...         # Free tier - https://api.together.xyz
DEEPSEEK_API_KEY=...         # Very cheap - https://platform.deepseek.com
OPENAI_API_KEY=sk-...        # Paid - https://platform.openai.com/api-keys
CLAUDE_API_KEY=sk-ant-...    # Paid - https://console.anthropic.com

# ============================================
# FILE UPLOAD
# ============================================
MAX_FILE_SIZE=10485760       # 10MB in bytes
UPLOAD_DEST=./uploads

# ============================================
# CORS
# ============================================
CORS_ORIGIN=http://localhost:4321,http://localhost:3000
CORS_CREDENTIALS=true

# ============================================
# RATE LIMITING
# ============================================
RATE_LIMIT_TTL=60            # seconds
RATE_LIMIT_MAX=100           # max requests per TTL

# ============================================
# LOGGING
# ============================================
LOG_LEVEL=debug              # error | warn | info | debug
LOG_FILE_PATH=./logs

# ============================================
# MONITORING (Optional)
# ============================================
SENTRY_DSN=                  # https://sentry.io

# ============================================
# EMAIL (Optional)
# ============================================
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=noreply@ekinerja.com

# ============================================
# FRONTEND
# ============================================
FRONTEND_URL=http://localhost:4321

# ============================================
# FEATURE FLAGS
# ============================================
ENABLE_SWAGGER=true
ENABLE_WEBSOCKET=true
ENABLE_QUEUE=true
ENABLE_RATE_LIMIT=true
```

### 3. Generate JWT Secrets

```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate JWT_REFRESH_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy output dan paste ke `.env`

---

## Running the Application

### Development Mode

```bash
npm run start:dev
```

Server akan running di: http://localhost:3000

Swagger docs: http://localhost:3000/api/docs

### Production Mode

```bash
# Build
npm run build

# Start
npm run start:prod
```

### Watch Mode (Auto-reload)

```bash
npm run start:dev
```

### Debug Mode

```bash
npm run start:debug
```

Attach debugger di port 9229

---

## API Testing

### 1. Open Swagger UI

Browse ke: http://localhost:3000/api/docs

### 2. Test Authentication

#### Register User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!",
    "name": "Test User"
  }'
```

#### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!"
  }'
```

Response:
```json
{
  "user": {
    "id": "uuid-here",
    "email": "test@example.com",
    "name": "Test User",
    "role": "USER"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Test Protected Endpoint

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <your-access-token>"
```

### 3. Test dengan Postman

1. Import Swagger JSON: http://localhost:3000/api/docs-json
2. Atau buat collection manual
3. Set Bearer Token di Authorization tab

---

## Common Issues

### Issue 1: Database Connection Error

**Error:**
```
Error: P1001: Can't reach database server
```

**Solution:**
```bash
# Check if MySQL is running
sudo systemctl status mysql

# Start MySQL
sudo systemctl start mysql

# Check DATABASE_URL in .env
# Make sure host, port, username, password are correct
```

### Issue 2: Redis Connection Error

**Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:6379
```

**Solution:**
```bash
# Check if Redis is running
redis-cli ping

# Start Redis
sudo systemctl start redis

# Or with Docker
docker start redis-ekinerja
```

### Issue 3: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change PORT in .env
PORT=3001
```

### Issue 4: Prisma Generate Error

**Error:**
```
Error: Schema parsing error
```

**Solution:**
```bash
# Reset Prisma
rm -rf node_modules/.prisma
rm -rf prisma/migrations

# Regenerate
npm run prisma:generate

# Create new migration
npm run prisma:migrate
```

### Issue 5: Module Not Found

**Error:**
```
Error: Cannot find module '@nestjs/core'
```

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Or
npm cache clean --force
npm install
```

---

## Next Steps

Setelah backend berhasil running:

1. ✅ Test semua endpoints di Swagger
2. ✅ Setup minimal 1 AI API key (recommend: Gemini - gratis)
3. ✅ Test generate laporan via API
4. ✅ Integrate dengan frontend
5. ✅ Setup monitoring (Sentry - optional)
6. ✅ Setup email notifications (optional)

---

## Useful Commands

```bash
# Development
npm run start:dev          # Start dev server
npm run prisma:studio      # Open database GUI
npm run prisma:migrate     # Run migrations

# Production
npm run build              # Build for production
npm run start:prod         # Start production server

# Database
npm run prisma:generate    # Generate Prisma Client
npm run prisma:migrate     # Run migrations
npm run prisma:seed        # Seed database
npx prisma db push         # Push schema without migration

# Testing
npm run test               # Run unit tests
npm run test:e2e           # Run e2e tests
npm run test:cov           # Test coverage

# Linting
npm run lint               # Check code style
npm run format             # Format code
```

---

## Support

Jika menemui masalah:

1. Check [Common Issues](#common-issues) section
2. Check logs di folder `logs/`
3. Create issue di GitHub repository
4. Contact: zulfikriyahya18@gmail.com

---

**Happy Coding! 🚀**

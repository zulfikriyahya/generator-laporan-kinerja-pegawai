# E-Kinerja Backend - Quick Start

Get your backend up and running in 5 minutes! ⚡

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] MySQL 8+ installed & running
- [ ] Redis 6+ installed & running
- [ ] Git installed

## Quick Setup (5 Steps)

### 1️⃣ Clone & Install (2 min)

```bash
# Clone repository
git clone <repo-url>
cd backend

# Install dependencies
npm install
```

### 2️⃣ Setup Database (1 min)

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE ekinerja;
exit;
```

### 3️⃣ Configure Environment (1 min)

```bash
# Copy environment file
cp .env.example .env

# Edit .env file - Minimum required:
# DATABASE_URL="mysql://root:password@localhost:3306/ekinerja"
# JWT_SECRET=your-secret-key-here
# At least one AI API key (recommend: GEMINI_API_KEY for free)
```

**Quick JWT Secret Generator:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4️⃣ Setup Prisma (1 min)

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

### 5️⃣ Start Server (30 sec)

```bash
# Start in development mode
npm run start:dev

# Server running at: http://localhost:3000
# Swagger docs at: http://localhost:3000/api/docs
```

## ✅ Verify Installation

### Test Health Endpoint
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "info": {
    "database": { "status": "up" }
  }
}
```

### Test Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "Admin123!",
    "name": "Admin User"
  }'
```

## 🎯 First API Call

### 1. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "Admin123!"
  }'
```

Save the `accessToken` from response.

### 2. Get Current User
```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🚀 Next Steps

1. ✅ Explore Swagger UI: http://localhost:3000/api/docs
2. ✅ Read [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
3. ✅ Setup AI API keys in `.env`
4. ✅ Test report generation
5. ✅ Connect frontend

## 📝 Minimum .env Configuration

```env
# Application
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL="mysql://root:password@localhost:3306/ekinerja"

# JWT (Generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
JWT_SECRET=your-generated-secret-here
JWT_REFRESH_SECRET=your-generated-refresh-secret-here

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# AI (Choose at least one - Gemini is FREE!)
GEMINI_API_KEY=your-key-here     # Get from: https://makersuite.google.com/app/apikey

# Optional
CORS_ORIGIN=http://localhost:4321
ENABLE_SWAGGER=true
```

## 🐳 Alternative: Docker Setup

If you prefer Docker:

```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f api
```

Access:
- API: http://localhost:3000
- Swagger: http://localhost:3000/api/docs
- Adminer (DB UI): http://localhost:8080

## 🆘 Troubleshooting

### MySQL Connection Error
```bash
# Check MySQL is running
sudo systemctl status mysql

# Or restart
sudo systemctl restart mysql
```

### Redis Connection Error
```bash
# Check Redis is running
redis-cli ping

# Should return: PONG
```

### Port 3000 Already in Use
```bash
# Change PORT in .env
PORT=3001
```

### Prisma Error
```bash
# Clean and regenerate
rm -rf node_modules/.prisma
npm run prisma:generate
```

## 📚 Documentation

- **Full Setup**: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **API Docs**: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Structure**: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
- **Swagger UI**: http://localhost:3000/api/docs

## 💡 Tips

1. **Use Swagger UI** for easy API testing
2. **Enable logging** in development: `LOG_LEVEL=debug`
3. **Prisma Studio** for database GUI: `npm run prisma:studio`
4. **Redis Commander** for Redis GUI (optional)

## 🎉 You're Ready!

Backend is now running! You can:
- ✅ Register/Login users
- ✅ Manage employee data
- ✅ Generate reports with AI
- ✅ Upload files
- ✅ And more...

**Happy coding! 🚀**

---

Need help? Check:
- [README.md](README.md) - Overview
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup
- Issues on GitHub
- Email: zulfikriyahya18@gmail.com

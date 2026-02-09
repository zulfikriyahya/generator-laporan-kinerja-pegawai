# E-Kinerja Backend API

Backend API untuk Generator Laporan Kinerja Pegawai berbasis AI dengan Multi-Model Support.

## 🚀 Tech Stack

- **Framework**: NestJS v10
- **Database**: MySQL dengan Prisma ORM
- **Authentication**: JWT + Passport.js
- **Queue**: BullMQ + Redis
- **Validation**: Zod + Class-validator
- **Logging**: Winston
- **Error Tracking**: Sentry
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, Bcrypt
- **File Upload**: Multer
- **Real-time**: Socket.io
- **Date Handling**: date-fns

## 📋 Prerequisites

- Node.js >= 18.x
- MySQL >= 8.0
- Redis >= 6.0
- npm or yarn

## 🛠️ Installation

### 1. Clone repository

```bash
git clone <repository-url>
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```bash
cp .env.example .env
```

Edit `.env` file dengan konfigurasi Anda:

```env
# Application
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL="mysql://user:password@localhost:3306/ekinerja"

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# AI Services (isi sesuai kebutuhan)
GEMINI_API_KEY=
CLAUDE_API_KEY=
OPENAI_API_KEY=
GROQ_API_KEY=
```

### 4. Setup Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Seed database
npm run prisma:seed
```

### 5. Start Development Server

```bash
npm run start:dev
```

Server akan berjalan di: http://localhost:3000

Swagger Documentation: http://localhost:3000/api/docs

## 📁 Project Structure

```
src/
├── common/                 # Shared modules
│   ├── prisma/            # Prisma service
│   ├── filters/           # Exception filters
│   ├── interceptors/      # Response interceptors
│   └── guards/            # Custom guards
├── config/                # Configuration files
├── modules/               # Feature modules
│   ├── auth/             # Authentication & Authorization
│   ├── users/            # User management
│   ├── pegawai/          # Employee data
│   ├── reports/          # Report generation
│   ├── ai/               # AI services integration
│   ├── files/            # File upload & management
│   ├── instansi/         # Organization data
│   ├── notifications/    # Notifications
│   └── audit/            # Audit logs
├── utils/                # Utility functions
├── app.module.ts         # Root module
└── main.ts               # Application entry point
```

## 🔐 Authentication

API menggunakan JWT Bearer Token authentication.

### Register

```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!",
  "name": "John Doe"
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!"
}
```

Response:
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Menggunakan Token

```bash
GET /api/reports
Authorization: Bearer <accessToken>
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - List all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Pegawai
- `POST /api/pegawai` - Create pegawai data
- `GET /api/pegawai` - List pegawai
- `GET /api/pegawai/:id` - Get pegawai by ID
- `PATCH /api/pegawai/:id` - Update pegawai
- `DELETE /api/pegawai/:id` - Delete pegawai

### Reports
- `POST /api/reports/generate` - Generate laporan dengan AI
- `GET /api/reports` - List laporan
- `GET /api/reports/:id` - Get laporan by ID
- `PATCH /api/reports/:id` - Update laporan
- `DELETE /api/reports/:id` - Delete laporan
- `GET /api/reports/:id/pdf` - Download as PDF
- `GET /api/reports/:id/docx` - Download as DOCX

### AI Services
- `POST /api/ai/generate` - Generate content dengan AI
- `GET /api/ai/models` - List available AI models
- `GET /api/ai/usage` - Get AI usage statistics

### Files
- `POST /api/files/upload` - Upload file
- `GET /api/files/:id` - Get file info
- `DELETE /api/files/:id` - Delete file

## 🤖 AI Integration

Backend mendukung multiple AI providers:

1. **Google Gemini** (Free & Fast)
2. **Groq** (Free & Ultra Fast)
3. **Together AI** (Free)
4. **DeepSeek** (Very Cheap)
5. **OpenAI GPT** (Cheap)
6. **Anthropic Claude** (Premium)

### Konfigurasi AI

Set API keys di `.env`:

```env
GEMINI_API_KEY=AIza...
GROQ_API_KEY=gsk_...
OPENAI_API_KEY=sk-...
CLAUDE_API_KEY=sk-ant-...
```

### Generate Report

```bash
POST /api/reports/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "pegawaiId": "uuid",
  "instansiId": "uuid",
  "bulan": 1,
  "tahun": 2025,
  "modelAI": "gemini",
  "tugasPokok": "...",
  "tugasTambahan": "..."
}
```

## 🔄 Queue System

Backend menggunakan BullMQ untuk asynchronous processing:

- **report-generation**: Generate laporan dengan AI
- **file-processing**: Process uploaded files
- **notification**: Send notifications

Monitor queue di Redis:
```bash
redis-cli
> KEYS ekinerja:*
```

## 📊 Database Schema

### Key Tables

- **users**: User accounts & authentication
- **pegawai**: Employee data
- **akademik_data**: Academic data (for teachers)
- **instansi**: Organization data
- **reports**: Generated reports
- **file_uploads**: Uploaded files
- **audit_logs**: Audit trail
- **notifications**: User notifications

### Migrations

```bash
# Create new migration
npx prisma migrate dev --name your_migration_name

# Apply migrations
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🚢 Deployment

### Production Build

```bash
npm run build
npm run start:prod
```

### Environment Variables (Production)

```env
NODE_ENV=production
PORT=3000
DATABASE_URL="mysql://user:pass@host:3306/ekinerja"
JWT_SECRET=<strong-secret-key>
REDIS_HOST=<redis-host>
SENTRY_DSN=<your-sentry-dsn>
```

### Docker (Optional)

```bash
docker build -t ekinerja-backend .
docker run -p 3000:3000 ekinerja-backend
```

## 📝 Logging

Logs tersimpan di folder `logs/`:

- `error.log` - Error logs only
- `combined.log` - All logs

Log level bisa diatur via `LOG_LEVEL` environment variable:
- `error`
- `warn`
- `info`
- `debug`

## 🔒 Security Features

- ✅ Helmet (HTTP headers security)
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Password hashing (bcrypt)
- ✅ JWT authentication
- ✅ Input validation (Zod)
- ✅ SQL injection protection (Prisma)
- ✅ XSS protection

## 📈 Monitoring

### Health Check

```bash
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "database": "connected",
  "redis": "connected",
  "uptime": 12345
}
```

### Sentry Integration

Set `SENTRY_DSN` di `.env` untuk error monitoring:

```env
SENTRY_DSN=https://your-sentry-dsn
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file

## 👤 Author

**Yahya Zulfikri**
- Email: zulfikriyahya18@gmail.com
- GitHub: [@zulfikriyahya](https://github.com/zulfikriyahya)

## 🆘 Support

Untuk bantuan dan pertanyaan:
- Create issue di GitHub
- Email: zulfikriyahya18@gmail.com

---

**Version**: 1.0.0  
**Last Updated**: 2025

# E-Kinerja Backend - Project Structure

## 📁 Directory Structure

```
backend/
├── prisma/                          # Database schema & migrations
│   ├── schema.prisma               # Prisma schema definition
│   ├── migrations/                 # Database migrations
│   └── seed.ts                     # Database seeder
│
├── src/                            # Source code
│   ├── main.ts                     # Application entry point
│   ├── app.module.ts               # Root module
│   │
│   ├── common/                     # Shared modules & utilities
│   │   ├── prisma/                # Prisma service
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   ├── filters/               # Exception filters
│   │   ├── interceptors/          # Response interceptors
│   │   ├── guards/                # Custom guards
│   │   └── decorators/            # Custom decorators
│   │
│   ├── config/                    # Configuration files
│   │   ├── database.config.ts
│   │   ├── redis.config.ts
│   │   └── jwt.config.ts
│   │
│   ├── modules/                   # Feature modules
│   │   │
│   │   ├── auth/                  # Authentication & Authorization
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   └── index.ts
│   │   │   ├── interfaces/       # Interfaces
│   │   │   │   └── index.ts
│   │   │   ├── strategies/       # Passport strategies
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   ├── local.strategy.ts
│   │   │   │   └── jwt-refresh.strategy.ts
│   │   │   ├── guards/           # Auth guards
│   │   │   │   └── index.ts
│   │   │   └── decorators/       # Auth decorators
│   │   │       └── index.ts
│   │   │
│   │   ├── users/                # User management
│   │   │   ├── users.module.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── dto/
│   │   │   └── entities/
│   │   │
│   │   ├── pegawai/              # Employee data management
│   │   │   ├── pegawai.module.ts
│   │   │   ├── pegawai.service.ts
│   │   │   ├── pegawai.controller.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-pegawai.dto.ts
│   │   │   │   └── update-pegawai.dto.ts
│   │   │   └── entities/
│   │   │
│   │   ├── reports/              # Report generation & management
│   │   │   ├── reports.module.ts
│   │   │   ├── reports.service.ts
│   │   │   ├── reports.controller.ts
│   │   │   ├── dto/
│   │   │   │   └── generate-report.dto.ts
│   │   │   ├── queues/           # BullMQ queues
│   │   │   │   └── report.queue.ts
│   │   │   ├── processors/       # Queue processors
│   │   │   │   └── report.processor.ts
│   │   │   └── services/
│   │   │       ├── pdf-export.service.ts
│   │   │       └── docx-export.service.ts
│   │   │
│   │   ├── ai/                   # AI services integration
│   │   │   ├── ai.module.ts
│   │   │   ├── ai.service.ts
│   │   │   ├── ai.controller.ts
│   │   │   ├── providers/        # AI provider implementations
│   │   │   │   ├── gemini.provider.ts
│   │   │   │   ├── claude.provider.ts
│   │   │   │   ├── openai.provider.ts
│   │   │   │   ├── groq.provider.ts
│   │   │   │   ├── together.provider.ts
│   │   │   │   └── deepseek.provider.ts
│   │   │   ├── interfaces/
│   │   │   │   └── ai-provider.interface.ts
│   │   │   └── dto/
│   │   │
│   │   ├── files/                # File upload & management
│   │   │   ├── files.module.ts
│   │   │   ├── files.service.ts
│   │   │   ├── files.controller.ts
│   │   │   └── dto/
│   │   │
│   │   ├── instansi/             # Organization data
│   │   │   ├── instansi.module.ts
│   │   │   ├── instansi.service.ts
│   │   │   ├── instansi.controller.ts
│   │   │   └── dto/
│   │   │
│   │   ├── notifications/        # Notifications system
│   │   │   ├── notifications.module.ts
│   │   │   ├── notifications.service.ts
│   │   │   ├── notifications.controller.ts
│   │   │   ├── notifications.gateway.ts   # WebSocket gateway
│   │   │   └── dto/
│   │   │
│   │   ├── audit/                # Audit logging
│   │   │   ├── audit.module.ts
│   │   │   ├── audit.service.ts
│   │   │   ├── audit.controller.ts
│   │   │   └── interceptors/
│   │   │       └── audit.interceptor.ts
│   │   │
│   │   └── health/               # Health check
│   │       ├── health.module.ts
│   │       └── health.controller.ts
│   │
│   └── utils/                    # Utility functions
│       ├── helpers.ts
│       ├── validators.ts
│       └── constants.ts
│
├── test/                         # Test files
│   ├── unit/
│   ├── e2e/
│   └── jest-e2e.json
│
├── logs/                         # Log files (gitignored)
├── uploads/                      # Uploaded files (gitignored)
│
├── .env                          # Environment variables (gitignored)
├── .env.example                  # Environment template
├── .eslintrc.js                  # ESLint configuration
├── .prettierrc                   # Prettier configuration
├── .gitignore                    # Git ignore rules
│
├── tsconfig.json                 # TypeScript configuration
├── nest-cli.json                 # NestJS CLI configuration
├── package.json                  # Dependencies
│
├── Dockerfile                    # Docker image definition
├── docker-compose.yml            # Docker compose for development
│
├── README.md                     # Project overview
├── SETUP_GUIDE.md               # Setup instructions
├── API_DOCUMENTATION.md         # API documentation
└── PROJECT_STRUCTURE.md         # This file
```

## 🔧 Module Descriptions

### Common Modules

**Prisma Module**
- Database ORM service
- Connection management
- Query helpers

**Filters**
- Global exception filters
- Error formatting
- HTTP exception handling

**Interceptors**
- Response transformation
- Logging interceptors
- Performance monitoring

**Guards**
- Role-based access control
- Resource ownership verification
- Custom authorization logic

**Decorators**
- Custom route decorators
- Metadata decorators
- Validation decorators

### Feature Modules

**Auth Module**
- User registration
- Login/logout
- JWT token management
- Refresh token rotation
- Password encryption (bcrypt)
- Multiple auth strategies

**Users Module**
- User CRUD operations
- User profile management
- Role management
- User search & filtering

**Pegawai Module**
- Employee data management
- Academic data (for teachers)
- Employee search
- Data validation
- NIP/NUPTK verification

**Reports Module**
- Report generation with AI
- CRUD operations
- PDF export
- DOCX export
- Report status workflow
- Queue-based processing
- TTE (Digital signature)

**AI Module**
- Multi-model AI integration
- Provider abstraction
- Usage tracking
- Token counting
- Rate limiting
- Fallback mechanisms

**Files Module**
- File upload (Multer)
- File storage management
- Image optimization
- File type validation
- Secure file serving

**Instansi Module**
- Organization data
- Letterhead configuration
- Official signatures
- Logo management

**Notifications Module**
- Real-time notifications (Socket.io)
- Push notifications
- Email notifications (optional)
- Notification preferences
- Read/unread status

**Audit Module**
- Activity logging
- Change tracking
- User actions audit
- Data access logs
- Compliance reporting

**Health Module**
- System health checks
- Database connectivity
- Redis connectivity
- Uptime monitoring
- Version info

## 🗃️ Database Schema

### Core Tables

1. **users** - User accounts
2. **pegawai** - Employee data
3. **akademik_data** - Academic information
4. **instansi** - Organization data
5. **reports** - Generated reports
6. **file_uploads** - Uploaded files
7. **audit_logs** - Audit trail
8. **notifications** - User notifications
9. **settings** - System settings

### Relationships

```
User 1:1 Pegawai
Pegawai 1:1 AkademikData
Pegawai 1:N Reports
User 1:N Reports
Instansi 1:N Reports
User 1:N AuditLogs
User 1:N Notifications
```

## 🚀 Key Technologies

### Framework & Core
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **Express** - HTTP server

### Database
- **MySQL** - Relational database
- **Prisma** - Modern ORM
- **Redis** - Caching & queue

### Authentication
- **Passport.js** - Authentication middleware
- **JWT** - Token-based auth
- **Bcrypt** - Password hashing

### Queue & Jobs
- **BullMQ** - Background jobs
- **Redis** - Queue backend

### Validation
- **Zod** - Schema validation
- **Class-validator** - DTO validation
- **Class-transformer** - Object transformation

### Logging & Monitoring
- **Winston** - Logging framework
- **Sentry** - Error tracking
- **Terminus** - Health checks

### Documentation
- **Swagger** - API documentation
- **OpenAPI** - API specification

### File Processing
- **Multer** - File upload
- **Sharp** - Image processing (optional)

### Real-time
- **Socket.io** - WebSocket server

### Security
- **Helmet** - HTTP headers
- **CORS** - Cross-origin handling
- **Rate limiting** - Throttler

### Testing
- **Jest** - Unit testing
- **Supertest** - E2E testing

## 🔐 Security Features

1. **Authentication**
   - JWT with access/refresh tokens
   - Secure password hashing (bcrypt)
   - Token rotation
   - Logout token invalidation

2. **Authorization**
   - Role-based access control (RBAC)
   - Resource ownership verification
   - Guard-based protection

3. **Input Validation**
   - DTO validation with Zod
   - SQL injection protection (Prisma)
   - XSS protection

4. **Security Headers**
   - Helmet middleware
   - CORS configuration
   - CSP headers

5. **Rate Limiting**
   - Request throttling
   - Per-user limits
   - IP-based limits

6. **Audit Logging**
   - All actions logged
   - User tracking
   - Change history

## 📊 Performance Optimizations

1. **Database**
   - Connection pooling
   - Query optimization
   - Indexes on frequently queried fields

2. **Caching**
   - Redis caching
   - Response caching
   - Session caching

3. **Queue Processing**
   - Async report generation
   - Background file processing
   - Rate limiting with queues

4. **File Handling**
   - Streaming large files
   - Image optimization
   - CDN integration (optional)

## 🧪 Testing Strategy

1. **Unit Tests**
   - Service logic
   - Utility functions
   - Validators

2. **Integration Tests**
   - API endpoints
   - Database operations
   - Queue processing

3. **E2E Tests**
   - Full user flows
   - Authentication flows
   - Report generation

## 📈 Monitoring & Logging

1. **Application Logs**
   - Error logs
   - Info logs
   - Debug logs
   - Audit logs

2. **Performance Monitoring**
   - Request duration
   - Database query time
   - Queue processing time

3. **Health Monitoring**
   - Database connectivity
   - Redis connectivity
   - External API status

4. **Error Tracking**
   - Sentry integration
   - Error alerting
   - Stack traces

## 🔄 Development Workflow

1. Create feature branch
2. Implement feature
3. Write tests
4. Run linter & formatter
5. Run tests
6. Create pull request
7. Code review
8. Merge to main
9. Deploy

## 📦 Deployment

### Build Process
```bash
npm run build
```

### Production Start
```bash
npm run start:prod
```

### Docker Deployment
```bash
docker-compose up -d
```

### Environment Setup
1. Set production env vars
2. Run database migrations
3. Generate Prisma client
4. Start application

---

**For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)**

**For API documentation, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)**

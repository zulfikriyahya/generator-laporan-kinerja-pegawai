# E-Kinerja Backend - API Documentation

Dokumentasi lengkap untuk semua API endpoints.

## Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Authentication

Semua endpoint (kecuali public endpoints) memerlukan JWT Bearer Token.

### Header Format

```http
Authorization: Bearer <your-access-token>
```

---

## 📌 Authentication Endpoints

### 1. Register User

Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123!",
  "name": "John Doe",
  "role": "USER"
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 2. Login

Authenticate user and get tokens.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 3. Refresh Token

Get new access token using refresh token.

**Endpoint:** `POST /auth/refresh`

**Headers:**
```http
Authorization: Bearer <refresh-token>
```

**Response:** `200 OK`
```json
{
  "user": { ... },
  "accessToken": "new-access-token",
  "refreshToken": "new-refresh-token"
}
```

### 4. Logout

Invalidate current refresh token.

**Endpoint:** `POST /auth/logout`

**Headers:**
```http
Authorization: Bearer <access-token>
```

**Response:** `200 OK`
```json
{
  "message": "Logged out successfully"
}
```

### 5. Get Current User

Get authenticated user data.

**Endpoint:** `GET /auth/me`

**Headers:**
```http
Authorization: Bearer <access-token>
```

**Response:** `200 OK`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "USER",
  "isActive": true,
  "createdAt": "2025-01-15T10:00:00.000Z"
}
```

---

## 👤 Users Endpoints

### 1. Get All Users

**Endpoint:** `GET /users`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `role` (optional): Filter by role

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER",
      "isActive": true,
      "createdAt": "2025-01-15T10:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50
  }
}
```

### 2. Get User by ID

**Endpoint:** `GET /users/:id`

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "USER",
  "isActive": true,
  "createdAt": "2025-01-15T10:00:00.000Z",
  "updatedAt": "2025-01-15T10:00:00.000Z"
}
```

---

## 👨‍💼 Pegawai Endpoints

### 1. Create Pegawai

Create employee data.

**Endpoint:** `POST /pegawai`

**Request Body:**
```json
{
  "nip": "198501012010011001",
  "nuptk": "1234567890123456",
  "nik": "3601010101900001",
  "nama": "Ahmad Dahlan, S.Pd",
  "tempatLahir": "Pandeglang",
  "tanggalLahir": "1990-01-01",
  "gender": "L",
  "jenisPegawai": "PNS",
  "golongan": "III/b",
  "jabatan": "Guru Ahli Pertama",
  "unitKerja": "MTsN 1 Pandeglang",
  "alamat": "Jl. Raya Labuan Km 10",
  "hp": "081234567890",
  "email": "ahmad@example.com",
  "pendidikan": "S1 Pendidikan Matematika",
  "masaKerjaTahun": 5,
  "masaKerjaBulan": 6
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "nip": "198501012010011001",
  "nama": "Ahmad Dahlan, S.Pd",
  ...
}
```

### 2. Get All Pegawai

**Endpoint:** `GET /pegawai`

**Query Parameters:**
- `page`, `limit`
- `search`: Search by name or NIP
- `jenisPegawai`: Filter by type
- `jabatan`: Filter by position

**Response:** `200 OK`

### 3. Get Pegawai by ID

**Endpoint:** `GET /pegawai/:id`

**Response:** `200 OK`

### 4. Update Pegawai

**Endpoint:** `PATCH /pegawai/:id`

**Request Body:** (partial update)
```json
{
  "alamat": "New address",
  "hp": "089876543210"
}
```

**Response:** `200 OK`

### 5. Delete Pegawai

**Endpoint:** `DELETE /pegawai/:id`

**Response:** `200 OK`

---

## 📄 Reports Endpoints

### 1. Generate Report

Generate laporan kinerja using AI.

**Endpoint:** `POST /reports/generate`

**Request Body:**
```json
{
  "pegawaiId": "uuid",
  "instansiId": "uuid",
  "bulan": 1,
  "tahun": 2025,
  "modelAI": "gemini",
  "tugasPokok": "Merencanakan dan melaksanakan pembelajaran...",
  "tugasTambahan": "Wali Kelas VII-A",
  "targetTahunan": "Meningkatkan nilai rata-rata...",
  "hambatan": "Keterbatasan media pembelajaran",
  "solusi": "Memanfaatkan teknologi sederhana"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "nomorDokumen": "001/LPKP/01/2025",
  "content": "## BAB I: PENDAHULUAN\n\n...",
  "status": "DRAFT",
  "tokensUsed": 2500,
  "createdAt": "2025-01-15T10:00:00.000Z"
}
```

### 2. Get All Reports

**Endpoint:** `GET /reports`

**Query Parameters:**
- `page`, `limit`
- `pegawaiId`: Filter by employee
- `bulan`, `tahun`: Filter by period
- `status`: Filter by status
- `modelAI`: Filter by AI model

**Response:** `200 OK`

### 3. Get Report by ID

**Endpoint:** `GET /reports/:id`

**Response:** `200 OK`

### 4. Update Report

**Endpoint:** `PATCH /reports/:id`

**Request Body:**
```json
{
  "content": "Updated content...",
  "status": "SUBMITTED"
}
```

**Response:** `200 OK`

### 5. Delete Report

**Endpoint:** `DELETE /reports/:id`

**Response:** `200 OK`

### 6. Export to PDF

**Endpoint:** `GET /reports/:id/pdf`

**Response:** `200 OK` (Binary PDF file)

### 7. Export to DOCX

**Endpoint:** `GET /reports/:id/docx`

**Response:** `200 OK` (Binary DOCX file)

---

## 🤖 AI Services Endpoints

### 1. Generate Content

Generate content using specified AI model.

**Endpoint:** `POST /ai/generate`

**Request Body:**
```json
{
  "model": "gemini",
  "systemPrompt": "You are a helpful assistant",
  "userPrompt": "Generate a report...",
  "maxTokens": 2000,
  "temperature": 0.7
}
```

**Response:** `200 OK`
```json
{
  "content": "Generated content here...",
  "tokensUsed": 1500,
  "model": "gemini"
}
```

### 2. Get Available Models

**Endpoint:** `GET /ai/models`

**Response:** `200 OK`
```json
{
  "models": [
    {
      "id": "gemini",
      "name": "Google Gemini 2.0 Flash",
      "provider": "Google",
      "available": true,
      "pricing": "Free"
    },
    {
      "id": "groq",
      "name": "Groq Llama 3.3 70B",
      "provider": "Groq",
      "available": true,
      "pricing": "Free"
    }
  ]
}
```

### 3. Get AI Usage Stats

**Endpoint:** `GET /ai/usage`

**Query Parameters:**
- `startDate`, `endDate`

**Response:** `200 OK`
```json
{
  "totalRequests": 150,
  "totalTokens": 45000,
  "byModel": {
    "gemini": { "requests": 100, "tokens": 30000 },
    "groq": { "requests": 50, "tokens": 15000 }
  }
}
```

---

## 📁 File Upload Endpoints

### 1. Upload File

**Endpoint:** `POST /files/upload`

**Headers:**
```http
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: File to upload
- `category`: File category (FOTO_PEGAWAI, LOGO_INSTANSI, TTD, etc)

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "filename": "abc123.jpg",
  "originalName": "photo.jpg",
  "mimetype": "image/jpeg",
  "size": 102400,
  "url": "http://localhost:3000/uploads/abc123.jpg"
}
```

### 2. Get File Info

**Endpoint:** `GET /files/:id`

**Response:** `200 OK`

### 3. Delete File

**Endpoint:** `DELETE /files/:id`

**Response:** `200 OK`

---

## 🏢 Instansi Endpoints

### 1. Create Instansi

**Endpoint:** `POST /instansi`

**Request Body:**
```json
{
  "header1": "KEMENTERIAN AGAMA RI",
  "header2": "KANTOR KABUPATEN PANDEGLANG",
  "header3": "MTsN 1 PANDEGLANG",
  "alamat": "Jl. Raya Labuan Km. 5,7",
  "telepon": "(0253) 201000",
  "email": "mtsn1pandeglang@kemenag.go.id",
  "website": "mtsn1pandeglang.sch.id",
  "namaKepala": "Dr. H. Fulan",
  "nipKepala": "196501011990031001",
  "pangkatKepala": "Pembina/IV-a"
}
```

**Response:** `201 Created`

### 2. Get All Instansi

**Endpoint:** `GET /instansi`

**Response:** `200 OK`

### 3. Get Instansi by ID

**Endpoint:** `GET /instansi/:id`

**Response:** `200 OK`

### 4. Update Instansi

**Endpoint:** `PATCH /instansi/:id`

**Response:** `200 OK`

---

## 🔔 Notifications Endpoints

### 1. Get User Notifications

**Endpoint:** `GET /notifications`

**Query Parameters:**
- `isRead`: Filter by read status
- `type`: Filter by notification type

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Report Submitted",
      "message": "Your report has been submitted successfully",
      "type": "REPORT_SUBMITTED",
      "isRead": false,
      "createdAt": "2025-01-15T10:00:00.000Z"
    }
  ]
}
```

### 2. Mark as Read

**Endpoint:** `PATCH /notifications/:id/read`

**Response:** `200 OK`

### 3. Mark All as Read

**Endpoint:** `POST /notifications/read-all`

**Response:** `200 OK`

---

## 📊 Audit Log Endpoints

### 1. Get Audit Logs

**Endpoint:** `GET /audit/logs`

**Query Parameters:**
- `userId`: Filter by user
- `entity`: Filter by entity type
- `action`: Filter by action
- `startDate`, `endDate`

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "uuid",
      "action": "CREATE",
      "entity": "Report",
      "entityId": "report-uuid",
      "userId": "user-uuid",
      "createdAt": "2025-01-15T10:00:00.000Z"
    }
  ]
}
```

---

## ❤️ Health Check Endpoints

### 1. Health Check

**Endpoint:** `GET /health`

**Response:** `200 OK`
```json
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    }
  },
  "error": {},
  "details": {
    "database": {
      "status": "up"
    }
  }
}
```

### 2. System Info

**Endpoint:** `GET /health/info`

**Response:** `200 OK`
```json
{
  "name": "E-Kinerja Backend API",
  "version": "1.0.0",
  "environment": "production",
  "uptime": 3600,
  "timestamp": "2025-01-15T10:00:00.000Z"
}
```

---

## Error Responses

All endpoints may return error responses:

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email must be valid"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Forbidden resource"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

---

## Rate Limiting

API has rate limiting enabled:
- **Limit**: 100 requests per minute
- **Headers**:
  - `X-RateLimit-Limit`: Request limit
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset timestamp

**Response when rate limited:**
```json
{
  "statusCode": 429,
  "message": "Too Many Requests"
}
```

---

## WebSocket (Real-time Updates)

Connect to WebSocket for real-time notifications:

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  auth: {
    token: 'your-access-token'
  }
});

// Listen for notifications
socket.on('notification', (data) => {
  console.log('New notification:', data);
});
```

---

## Postman Collection

Import Swagger JSON to Postman:
```
http://localhost:3000/api/docs-json
```

---

**For more details, visit Swagger UI: http://localhost:3000/api/docs**

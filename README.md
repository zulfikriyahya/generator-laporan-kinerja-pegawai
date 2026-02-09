# E-Kinerja Backend API Documentation

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Base URL](#base-url)
4. [Common Response Format](#common-response-format)
5. [Error Handling](#error-handling)
6. [API Endpoints](#api-endpoints)
   - [Authentication](#authentication-endpoints)
   - [Users](#users-endpoints)
   - [Pegawai](#pegawai-endpoints)
   - [Instansi](#instansi-endpoints)
   - [Reports](#reports-endpoints)
   - [AI Services](#ai-services-endpoints)
   - [Files](#files-endpoints)
   - [Notifications](#notifications-endpoints)
   - [Audit Logs](#audit-logs-endpoints)
   - [Health Check](#health-check-endpoints)
7. [WebSocket](#websocket)
8. [Data Models](#data-models)

---

## Overview

E-Kinerja Backend API adalah sistem backend untuk aplikasi generator laporan kinerja pegawai. API ini menyediakan fitur untuk manajemen pegawai, pembuatan laporan otomatis menggunakan AI, dan sistem notifikasi real-time.

### Technology Stack

- NestJS
- Prisma ORM
- MySQL Database
- Redis (Queue & Cache)
- BullMQ (Job Queue)
- Socket.io (WebSocket)
- JWT Authentication

### Features

- Multi-AI provider support (Gemini, Claude, GPT, Groq, DeepSeek, Together)
- Real-time notifications via WebSocket
- File upload and management
- Audit logging
- Rate limiting
- Export to DOCX and PDF

---

## Authentication

API ini menggunakan JWT (JSON Web Token) untuk autentikasi. Token harus disertakan dalam header `Authorization` dengan format:

```
Authorization: Bearer <access_token>
```

### Token Types

1. **Access Token**: Digunakan untuk mengakses endpoint API (expires: 7 hari)
2. **Refresh Token**: Digunakan untuk mendapatkan access token baru (expires: 30 hari)

---

## Base URL

```
http://localhost:3000/api
```

Untuk production, sesuaikan dengan domain server Anda.

---

## Common Response Format

### Success Response

```json
{
  "data": {},
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

### Error Response

```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

---

## Error Handling

### HTTP Status Codes

- `200 OK`: Request berhasil
- `201 Created`: Resource berhasil dibuat
- `400 Bad Request`: Request tidak valid
- `401 Unauthorized`: Authentication gagal
- `403 Forbidden`: Tidak memiliki akses
- `404 Not Found`: Resource tidak ditemukan
- `422 Unprocessable Entity`: Validasi gagal
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

### Common Error Messages

```json
{
  "INVALID_CREDENTIALS": "Email atau password salah",
  "UNAUTHORIZED": "Anda tidak memiliki akses",
  "NOT_FOUND": "Data tidak ditemukan",
  "ALREADY_EXISTS": "Data sudah ada",
  "VALIDATION_ERROR": "Validasi gagal",
  "SERVER_ERROR": "Terjadi kesalahan server"
}
```

---

## API Endpoints

### Authentication Endpoints

#### 1. Register User

```http
POST /api/auth/register
```

**Request Body:**

```json
{
  "email": "ahmad.dahlan@kemenag.go.id",
  "password": "Kinerja2025!",
  "name": "Ahmad Dahlan",
  "role": "USER"
}
```

**Response (201):**

```json
{
  "user": {
    "id": "uuid",
    "email": "ahmad.dahlan@kemenag.go.id",
    "name": "Ahmad Dahlan",
    "role": "USER"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Validation Rules:**

- `email`: Must be valid email format
- `password`: Minimum 8 characters
- `name`: Minimum 2 characters, maximum 100 characters
- `role`: Optional, one of: USER, ADMIN, SUPER_ADMIN (default: USER)

---

#### 2. Login

```http
POST /api/auth/login
```

**Request Body:**

```json
{
  "email": "ahmad.dahlan@kemenag.go.id",
  "password": "Kinerja2025!"
}
```

**Response (200):**

```json
{
  "user": {
    "id": "uuid",
    "email": "ahmad.dahlan@kemenag.go.id",
    "name": "Ahmad Dahlan",
    "role": "USER"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### 3. Refresh Token

```http
POST /api/auth/refresh
```

**Headers:**

```
Authorization: Bearer <refresh_token>
```

**Response (200):**

```json
{
  "user": {
    "id": "uuid",
    "email": "ahmad.dahlan@kemenag.go.id",
    "name": "Ahmad Dahlan",
    "role": "USER"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### 4. Logout

```http
POST /api/auth/logout
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "message": "Logged out successfully"
}
```

---

#### 5. Get Current User

```http
GET /api/auth/me
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "id": "uuid",
  "email": "ahmad.dahlan@kemenag.go.id",
  "name": "Ahmad Dahlan",
  "role": "USER",
  "isActive": true
}
```

---

### Users Endpoints

#### 1. Get All Users (Admin Only)

```http
GET /api/users?page=1&limit=10&role=USER
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `role`: Filter by role (optional)

**Response (200):**

```json
{
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "name": "User Name",
      "role": "USER",
      "isActive": true,
      "createdAt": "2025-02-09T10:00:00.000Z",
      "lastLogin": "2025-02-09T10:00:00.000Z"
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

**Required Role:** ADMIN, SUPER_ADMIN

---

#### 2. Get User Profile

```http
GET /api/users/me
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "id": "uuid",
  "email": "ahmad.dahlan@kemenag.go.id",
  "name": "Ahmad Dahlan",
  "role": "USER",
  "isActive": true,
  "createdAt": "2025-02-09T10:00:00.000Z",
  "updatedAt": "2025-02-09T10:00:00.000Z",
  "lastLogin": "2025-02-09T10:00:00.000Z"
}
```

---

#### 3. Get User by ID (Admin Only)

```http
GET /api/users/:id
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "User Name",
  "role": "USER",
  "isActive": true,
  "createdAt": "2025-02-09T10:00:00.000Z",
  "updatedAt": "2025-02-09T10:00:00.000Z",
  "lastLogin": "2025-02-09T10:00:00.000Z"
}
```

**Required Role:** ADMIN, SUPER_ADMIN

---

#### 4. Update User

```http
PATCH /api/users/:id
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "name": "Updated Name",
  "role": "ADMIN"
}
```

**Response (200):**

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "Updated Name",
  "role": "ADMIN",
  "isActive": true
}
```

---

#### 5. Toggle User Status (Admin Only)

```http
PATCH /api/users/:id/toggle-status
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "User Name",
  "role": "USER",
  "isActive": false
}
```

**Required Role:** ADMIN, SUPER_ADMIN

---

#### 6. Delete User (Super Admin Only)

```http
DELETE /api/users/:id
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "id": "uuid",
  "email": "user@example.com"
}
```

**Required Role:** SUPER_ADMIN

---

### Pegawai Endpoints

#### 1. Create Pegawai Data

```http
POST /api/pegawai
```

**Headers:**

```
Authorization: Bearer <access_token>
```

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
  "statusPegawai": "AKTIF",
  "golongan": "III/a",
  "jabatan": "Guru Ahli Pertama",
  "unitKerja": "MTsN 1 Pandeglang",
  "alamat": "Jl. Raya Labuan Km 10 Pandeglang",
  "hp": "081234567890",
  "email": "ahmad.dahlan@gmail.com",
  "pendidikan": "S1 Pendidikan Matematika",
  "masaKerjaTahun": 5,
  "masaKerjaBulan": 6,
  "fotoPegawai": "base64_encoded_image..."
}
```

**Response (201):**

```json
{
  "id": "uuid",
  "userId": "uuid",
  "nip": "198501012010011001",
  "nama": "Ahmad Dahlan, S.Pd",
  "jabatan": "Guru Ahli Pertama",
  "user": {
    "id": "uuid",
    "email": "ahmad.dahlan@kemenag.go.id",
    "name": "Ahmad Dahlan",
    "role": "USER"
  },
  "createdAt": "2025-02-09T10:00:00.000Z"
}
```

**Validation Rules:**

- `nip`: 18 digit, unique
- `nuptk`: 16 digit (optional), unique
- `nik`: 16 digit (optional), unique
- `gender`: L or P
- `jenisPegawai`: PNS, PPPK, HONORER, GTT, PTT, GURU
- `statusPegawai`: AKTIF, CUTI, TUGAS_BELAJAR, NON_AKTIF

---

#### 2. Get All Pegawai (Admin Only)

```http
GET /api/pegawai?page=1&limit=10&search=ahmad
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search by nama, nip, jabatan, or unitKerja (optional)

**Response (200):**

```json
{
  "data": [
    {
      "id": "uuid",
      "nip": "198501012010011001",
      "nama": "Ahmad Dahlan, S.Pd",
      "jabatan": "Guru Ahli Pertama",
      "unitKerja": "MTsN 1 Pandeglang",
      "user": {
        "id": "uuid",
        "email": "ahmad.dahlan@kemenag.go.id",
        "name": "Ahmad Dahlan",
        "role": "USER",
        "isActive": true
      },
      "akademik": {
        "mapel": "Matematika",
        "kelas": "VII-A, VII-B"
      }
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

**Required Role:** ADMIN, SUPER_ADMIN

---

#### 3. Get Current User Pegawai Data

```http
GET /api/pegawai/me
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "id": "uuid",
  "userId": "uuid",
  "nip": "198501012010011001",
  "nuptk": "1234567890123456",
  "nik": "3601010101900001",
  "nama": "Ahmad Dahlan, S.Pd",
  "tempatLahir": "Pandeglang",
  "tanggalLahir": "1990-01-01T00:00:00.000Z",
  "gender": "L",
  "jenisPegawai": "PNS",
  "statusPegawai": "AKTIF",
  "golongan": "III/a",
  "jabatan": "Guru Ahli Pertama",
  "unitKerja": "MTsN 1 Pandeglang",
  "alamat": "Jl. Raya Labuan Km 10 Pandeglang",
  "hp": "081234567890",
  "email": "ahmad.dahlan@gmail.com",
  "pendidikan": "S1 Pendidikan Matematika",
  "masaKerjaTahun": 5,
  "masaKerjaBulan": 6,
  "akademik": {
    "kurikulum": "MERDEKA",
    "tahunPelajaran": "2024/2025",
    "semester": "GANJIL",
    "mapel": "Matematika",
    "kelas": "VII-A, VII-B",
    "jamMengajar": 24,
    "jumlahSiswa": 64,
    "ekskul": "Olimpiade Matematika"
  },
  "user": {
    "id": "uuid",
    "email": "ahmad.dahlan@kemenag.go.id",
    "name": "Ahmad Dahlan",
    "role": "USER"
  }
}
```

---

#### 4. Get Pegawai by ID

```http
GET /api/pegawai/:id
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "id": "uuid",
  "nama": "Ahmad Dahlan, S.Pd",
  "nip": "198501012010011001",
  "jabatan": "Guru Ahli Pertama",
  "user": {
    "id": "uuid",
    "email": "ahmad.dahlan@kemenag.go.id",
    "name": "Ahmad Dahlan"
  },
  "akademik": {
    "mapel": "Matematika",
    "kelas": "VII-A, VII-B"
  },
  "reports": [
    {
      "id": "uuid",
      "bulan": 1,
      "tahun": 2025,
      "status": "APPROVED",
      "createdAt": "2025-02-09T10:00:00.000Z"
    }
  ]
}
```

---

#### 5. Get Pegawai by NIP

```http
GET /api/pegawai/nip/:nip
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "id": "uuid",
  "nip": "198501012010011001",
  "nama": "Ahmad Dahlan, S.Pd",
  "jabatan": "Guru Ahli Pertama",
  "user": {
    "id": "uuid",
    "email": "ahmad.dahlan@kemenag.go.id",
    "name": "Ahmad Dahlan"
  }
}
```

---

#### 6. Update Pegawai

```http
PATCH /api/pegawai/:id
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "jabatan": "Guru Ahli Muda",
  "golongan": "III/b",
  "hp": "081234567891"
}
```

**Response (200):**

```json
{
  "id": "uuid",
  "nip": "198501012010011001",
  "nama": "Ahmad Dahlan, S.Pd",
  "jabatan": "Guru Ahli Muda",
  "golongan": "III/b",
  "user": {
    "id": "uuid",
    "email": "ahmad.dahlan@kemenag.go.id",
    "name": "Ahmad Dahlan"
  }
}
```

---

#### 7. Delete Pegawai (Admin Only)

```http
DELETE /api/pegawai/:id
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "message": "Pegawai berhasil dihapus"
}
```

**Required Role:** ADMIN, SUPER_ADMIN

---

#### 8. Get Pegawai Statistics (Admin Only)

```http
GET /api/pegawai/statistics
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "total": 150,
  "byJenis": [
    {
      "jenisPegawai": "PNS",
      "_count": 100
    },
    {
      "jenisPegawai": "PPPK",
      "_count": 30
    },
    {
      "jenisPegawai": "HONORER",
      "_count": 20
    }
  ],
  "byStatus": [
    {
      "statusPegawai": "AKTIF",
      "_count": 140
    },
    {
      "statusPegawai": "CUTI",
      "_count": 10
    }
  ],
  "topJabatan": [
    {
      "jabatan": "Guru Ahli Pertama",
      "_count": 50
    },
    {
      "jabatan": "Guru Ahli Muda",
      "_count": 30
    }
  ]
}
```

**Required Role:** ADMIN, SUPER_ADMIN

---

### Instansi Endpoints

#### 1. Create Instansi (Admin Only)

```http
POST /api/instansi
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "header1": "KEMENTERIAN AGAMA REPUBLIK INDONESIA",
  "header2": "KANTOR KABUPATEN PANDEGLANG",
  "header3": "MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG",
  "alamat": "Jl. Raya Labuan Km. 5,7 Pandeglang - Banten 42253",
  "telepon": "(0253) 201000",
  "email": "mtsn1pandeglang@kemenag.go.id",
  "website": "https://mtsn1pandeglang.sch.id",
  "logoUtama": "base64_encoded_image...",
  "logoInstansi": "base64_encoded_image...",
  "namaKepala": "Dr. H. Fulan bin Fulan, M.Pd",
  "nipKepala": "196501011990031001",
  "pangkatKepala": "Pembina/IV-a",
  "ttdKepala": "base64_encoded_signature...",
  "titimangsa": "Pandeglang",
  "isActive": true
}
```

**Response (201):**

```json
{
  "id": "uuid",
  "header1": "KEMENTERIAN AGAMA REPUBLIK INDONESIA",
  "header2": "KANTOR KABUPATEN PANDEGLANG",
  "header3": "MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG",
  "isActive": true,
  "createdAt": "2025-02-09T10:00:00.000Z"
}
```

**Required Role:** ADMIN, SUPER_ADMIN

---

#### 2. Get All Instansi

```http
GET /api/instansi?page=1&limit=10
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "data": [
    {
      "id": "uuid",
      "header3": "MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG",
      "alamat": "Jl. Raya Labuan Km. 5,7 Pandeglang - Banten 42253",
      "isActive": true,
      "createdAt": "2025-02-09T10:00:00.000Z"
    }
  ],
  "meta": {
    "total": 5,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

#### 3. Get Active Instansi

```http
GET /api/instansi/active
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "id": "uuid",
  "header1": "KEMENTERIAN AGAMA REPUBLIK INDONESIA",
  "header2": "KANTOR KABUPATEN PANDEGLANG",
  "header3": "MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG",
  "alamat": "Jl. Raya Labuan Km. 5,7 Pandeglang - Banten 42253",
  "telepon": "(0253) 201000",
  "email": "mtsn1pandeglang@kemenag.go.id",
  "website": "https://mtsn1pandeglang.sch.id",
  "namaKepala": "Dr. H. Fulan bin Fulan, M.Pd",
  "nipKepala": "196501011990031001",
  "pangkatKepala": "Pembina/IV-a",
  "titimangsa": "Pandeglang",
  "isActive": true
}
```

---

#### 4. Get Instansi by ID

```http
GET /api/instansi/:id
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "id": "uuid",
  "header1": "KEMENTERIAN AGAMA REPUBLIK INDONESIA",
  "header2": "KANTOR KABUPATEN PANDEGLANG",
  "header3": "MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG",
  "alamat": "Jl. Raya Labuan Km. 5,7 Pandeglang - Banten 42253",
  "reports": [
    {
      "id": "uuid",
      "bulan": 1,
      "tahun": 2025,
      "status": "APPROVED"
    }
  ]
}
```

---

#### 5. Update Instansi (Admin Only)

```http
PATCH /api/instansi/:id
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "telepon": "(0253) 201001",
  "email": "newemail@kemenag.go.id"
}
```

**Response (200):**

```json
{
  "id": "uuid",
  "header3": "MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG",
  "telepon": "(0253) 201001",
  "email": "newemail@kemenag.go.id"
}
```

**Required Role:** ADMIN, SUPER_ADMIN

---

#### 6. Set Instansi as Active (Admin Only)

```http
PATCH /api/instansi/:id/set-active
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "id": "uuid",
  "header3": "MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG",
  "isActive": true
}
```

**Required Role:** ADMIN, SUPER_ADMIN

---

#### 7. Delete Instansi (Super Admin Only)

```http
DELETE /api/instansi/:id
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "message": "Instansi berhasil dihapus"
}
```

**Required Role:** SUPER_ADMIN

---

### Reports Endpoints

#### 1. Generate Report

```http
POST /api/reports/generate
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "modelAI": "gemini",
  "bulan": 1,
  "tahun": 2025,
  "tugasPokok": "Merencanakan dan melaksanakan pembelajaran, mengevaluasi dan menilai hasil pembelajaran",
  "tugasTambahan": "Wali Kelas VII-A, Anggota Tim Penjamin Mutu, Piket Harian",
  "targetTahunan": "Meningkatkan nilai rata-rata kelas menjadi 80, Lulus 100%",
  "hambatan": "Sarana prasarana multimedia terbatas, koneksi internet lambat",
  "solusi": "Menggunakan media pembelajaran sederhana, tethering hotspot pribadi",
  "tokenLimit": 2000,
  "customInstruction": "Fokuskan pada kegiatan remedial dan pengayaan"
}
```

**Response (201):**

```json
{
  "id": "uuid",
  "pegawaiId": "uuid",
  "instansiId": "uuid",
  "bulan": 1,
  "tahun": 2025,
  "nomorDokumen": "001/LPKP/01/2025",
  "content": "# Laporan Kinerja\n\n## BAB I: PENDAHULUAN...",
  "modelAI": "gemini",
  "tokensUsed": 1850,
  "status": "DRAFT",
  "pegawai": {
    "nama": "Ahmad Dahlan, S.Pd",
    "nip": "198501012010011001",
    "jabatan": "Guru Ahli Pertama"
  },
  "instansi": {
    "header3": "MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG"
  },
  "createdAt": "2025-02-09T10:00:00.000Z"
}
```

**Available AI Models:**

- `gemini`: Google Gemini 2.5 Flash
- `claude`: Claude Sonnet 4
- `gpt`: GPT-4o Mini
- `groq`: Groq Llama 3.3 70B
- `deepseek`: DeepSeek Chat
- `together`: Together AI Llama 3 70B

---

#### 2. Get All Reports

```http
GET /api/reports?page=1&limit=10&status=APPROVED&bulan=1&tahun=2025
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `status`: Filter by status (optional)
- `bulan`: Filter by month (optional)
- `tahun`: Filter by year (optional)

**Response (200):**

```json
{
  "data": [
    {
      "id": "uuid",
      "bulan": 1,
      "tahun": 2025,
      "nomorDokumen": "001/LPKP/01/2025",
      "status": "APPROVED",
      "modelAI": "gemini",
      "tokensUsed": 1850,
      "pegawai": {
        "nama": "Ahmad Dahlan, S.Pd",
        "nip": "198501012010011001",
        "jabatan": "Guru Ahli Pertama"
      },
      "instansi": {
        "header3": "MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG"
      },
      "createdAt": "2025-02-09T10:00:00.000Z"
    }
  ],
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

---

#### 3. Get My Reports

```http
GET /api/reports/my-reports?page=1&limit=10
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "data": [
    {
      "id": "uuid",
      "bulan": 1,
      "tahun": 2025,
      "status": "APPROVED",
      "createdAt": "2025-02-09T10:00:00.000Z"
    }
  ],
  "meta": {
    "total": 12,
    "page": 1,
    "limit": 10,
    "totalPages": 2
  }
}
```

---

#### 4. Get Report by ID

```http
GET /api/reports/:id
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "id": "uuid",
  "pegawaiId": "uuid",
  "instansiId": "uuid",
  "userId": "uuid",
  "bulan": 1,
  "tahun": 2025,
  "nomorDokumen": "001/LPKP/01/2025",
  "tugasPokok": "Merencanakan dan melaksanakan pembelajaran...",
  "tugasTambahan": "Wali Kelas VII-A...",
  "targetTahunan": "Meningkatkan nilai rata-rata...",
  "hambatan": "Sarana prasarana multimedia terbatas...",
  "solusi": "Menggunakan media pembelajaran sederhana...",
  "content": "# Laporan Kinerja\n\n## BAB I: PENDAHULUAN...",
  "modelAI": "gemini",
  "tokensUsed": 1850,
  "status": "APPROVED",
  "publishedAt": "2025-02-09T10:00:00.000Z",
  "pegawai": {
    "id": "uuid",
    "nama": "Ahmad Dahlan, S.Pd",
    "nip": "198501012010011001",
    "jabatan": "Guru Ahli Pertama",
    "akademik": {
      "mapel": "Matematika",
      "kelas": "VII-A, VII-B"
    }
  },
  "instansi": {
    "id": "uuid",
    "header1": "KEMENTERIAN AGAMA REPUBLIK INDONESIA",
    "header2": "KANTOR KABUPATEN PANDEGLANG",
    "header3": "MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG",
    "alamat": "Jl. Raya Labuan Km. 5,7 Pandeglang - Banten 42253",
    "namaKepala": "Dr. H. Fulan bin Fulan, M.Pd",
    "nipKepala": "196501011990031001"
  },
  "user": {
    "id": "uuid",
    "name": "Ahmad Dahlan",
    "email": "ahmad.dahlan@kemenag.go.id"
  },
  "createdAt": "2025-02-09T10:00:00.000Z",
  "updatedAt": "2025-02-09T10:00:00.000Z"
}
```

---

#### 5. Update Report

```http
PATCH /api/reports/:id
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "content": "Updated markdown content...",
  "status": "SUBMITTED",
  "tugasPokok": "Updated tugas pokok..."
}
```

**Response (200):**

```json
{
  "id": "uuid",
  "bulan": 1,
  "tahun": 2025,
  "status": "SUBMITTED",
  "content": "Updated markdown content...",
  "updatedAt": "2025-02-09T10:00:00.000Z"
}
```

---

#### 6. Submit Report

```http
POST /api/reports/:id/submit
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "id": "uuid",
  "status": "SUBMITTED",
  "publishedAt": "2025-02-09T10:00:00.000Z"
}
```

**Note:** Only reports with status DRAFT can be submitted.

---

#### 7. Approve Report (Admin Only)

```http
POST /api/reports/:id/approve
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "id": "uuid",
  "status": "APPROVED"
}
```

**Required Role:** ADMIN, SUPER_ADMIN

**Note:** Only reports with status SUBMITTED can be approved.

---

#### 8. Reject Report (Admin Only)

```http
POST /api/reports/:id/reject
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "reason": "Tabel kegiatan kurang lengkap, mohon dilengkapi"
}
```

**Response (200):**

```json
{
  "id": "uuid",
  "status": "REJECTED",
  "metadata": {
    "reason": "Tabel kegiatan kurang lengkap, mohon dilengkapi"
  }
}
```

**Required Role:** ADMIN, SUPER_ADMIN

---

#### 9. Export Report to DOCX

```http
GET /api/reports/:id/export/docx
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

File download with headers:

```
Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document
Content-Disposition: attachment; filename="Laporan_Kinerja_Ahmad_Dahlan_1_2025.docx"
```

---

#### 10. Export Report to PDF

```http
GET /api/reports/:id/export/pdf
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

File download with headers:

```
Content-Type: application/pdf
Content-Disposition: attachment; filename="Laporan_Kinerja_Ahmad_Dahlan_1_2025.pdf"
```

---

#### 11. Delete Report (Admin Only)

```http
DELETE /api/reports/:id
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "message": "Laporan berhasil dihapus"
}
```

**Required Role:** ADMIN, SUPER_ADMIN

---

#### 12. Get Reports Statistics

```http
GET /api/reports/statistics
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "total": 125,
  "byStatus": [
    {
      "status": "DRAFT",
      "_count": 15
    },
    {
      "status": "SUBMITTED",
      "_count": 10
    },
    {
      "status": "APPROVED",
      "_count": 95
    },
    {
      "status": "REJECTED",
      "_count": 5
    }
  ],
  "byMonth": [
    {
      "bulan": 1,
      "tahun": 2025,
      "_count": 50
    },
    {
      "bulan": 12,
      "tahun": 2024,
      "_count": 48
    }
  ]
}
```

---

### AI Services Endpoints

#### 1. Generate Report (Direct AI Call)

```http
POST /api/ai/generate
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "model": "gemini",
  "bulan": 1,
  "tahun": 2025,
  "pegawai": {
    "nama": "Ahmad Dahlan, S.Pd",
    "nip": "198501012010011001",
    "jabatan": "Guru Ahli Pertama",
    "golongan": "III/a",
    "unitKerja": "MTsN 1 Pandeglang",
    "jenisPegawai": "PNS",
    "masaKerjaTahun": 5,
    "masaKerjaBulan": 6
  },
  "kinerja": {
    "tugasPokok": "Merencanakan dan melaksanakan pembelajaran...",
    "tugasTambahan": "Wali Kelas VII-A...",
    "targetTahunan": "Meningkatkan nilai rata-rata...",
    "hambatan": "Sarana prasarana multimedia terbatas...",
    "solusi": "Menggunakan media pembelajaran sederhana..."
  },
  "akademik": {
    "kurikulum": "MERDEKA",
    "tahunPelajaran": "2024/2025",
    "semester": "GANJIL",
    "mapel": "Matematika",
    "kelas": "VII-A, VII-B",
    "jamMengajar": 24,
    "jumlahSiswa": 64,
    "ekskul": "Olimpiade Matematika"
  },
  "maxTokens": 2000,
  "customInstruction": "Fokuskan pada kegiatan remedial dan pengayaan"
}
```

**Response (200):**

```json
{
  "success": true,
  "content": "# Laporan Kinerja\n\n## BAB I: PENDAHULUAN...",
  "tokensUsed": 1850,
  "model": "gemini-2.5-flash"
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "Failed to generate with Gemini: API key not configured"
}
```

---

#### 2. Get Available AI Models

```http
GET /api/ai/models
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "models": ["gemini", "claude", "gpt", "groq"]
}
```

**Note:** Returns only models with configured API keys.

---

#### 3. AI Service Health Check

```http
GET /api/ai/health
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "status": "ok",
  "availableModels": ["gemini", "claude", "gpt", "groq"]
}
```

---

### Files Endpoints

#### 1. Upload Single File

```http
POST /api/files/upload
```

**Headers:**

```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Form Data:**

- `file`: File to upload (required)
- `category`: File category (optional) - FOTO_PEGAWAI, LOGO_INSTANSI, TTD, LAMPIRAN, DOKUMEN, OTHER

**Response (201):**

```json
{
  "id": "uuid",
  "filename": "abc123.jpg",
  "originalName": "photo.jpg",
  "mimetype": "image/jpeg",
  "size": 245760,
  "path": "/uploads/abc123.jpg",
  "url": "/uploads/abc123.jpg",
  "category": "FOTO_PEGAWAI",
  "createdAt": "2025-02-09T10:00:00.000Z"
}
```

**File Limits:**

- Images: Max 500KB (jpeg, jpg, png, webp)
- Documents: Max 10MB (pdf, doc, docx)

---

#### 2. Upload Multiple Files

```http
POST /api/files/upload-multiple
```

**Headers:**

```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Form Data:**

- `files`: Multiple files (max 10 files)
- `category`: File category (optional)

**Response (201):**

```json
[
  {
    "id": "uuid-1",
    "filename": "abc123.jpg",
    "originalName": "photo1.jpg",
    "url": "/uploads/abc123.jpg"
  },
  {
    "id": "uuid-2",
    "filename": "def456.jpg",
    "originalName": "photo2.jpg",
    "url": "/uploads/def456.jpg"
  }
]
```

---

#### 3. Upload Base64 Image

```http
POST /api/files/upload-base64
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "data": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...",
  "category": "FOTO_PEGAWAI"
}
```

**Response (201):**

```json
{
  "id": "uuid",
  "filename": "1234567890.png",
  "mimetype": "image/png",
  "size": 245760,
  "url": "/uploads/1234567890.png",
  "category": "FOTO_PEGAWAI"
}
```

---

#### 4. Get All Files

```http
GET /api/files?page=1&limit=10&category=FOTO_PEGAWAI
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `category`: Filter by category (optional)

**Response (200):**

```json
{
  "data": [
    {
      "id": "uuid",
      "filename": "abc123.jpg",
      "originalName": "photo.jpg",
      "mimetype": "image/jpeg",
      "size": 245760,
      "url": "/uploads/abc123.jpg",
      "category": "FOTO_PEGAWAI",
      "createdAt": "2025-02-09T10:00:00.000Z"
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

---

#### 5. Get File by ID

```http
GET /api/files/:id
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "id": "uuid",
  "filename": "abc123.jpg",
  "originalName": "photo.jpg",
  "mimetype": "image/jpeg",
  "size": 245760,
  "path": "/uploads/abc123.jpg",
  "url": "/uploads/abc123.jpg",
  "category": "FOTO_PEGAWAI",
  "uploadedBy": "uuid",
  "createdAt": "2025-02-09T10:00:00.000Z"
}
```

---

#### 6. Get Storage Statistics

```http
GET /api/files/statistics
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "totalFiles": 150,
  "totalSize": 52428800,
  "byCategory": [
    {
      "category": "FOTO_PEGAWAI",
      "_count": 50,
      "_sum": {
        "size": 12582912
      }
    },
    {
      "category": "LOGO_INSTANSI",
      "_count": 10,
      "_sum": {
        "size": 2097152
      }
    }
  ]
}
```

---

#### 7. Delete File

```http
DELETE /api/files/:id
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "message": "File berhasil dihapus"
}
```

---

### Notifications Endpoints

#### 1. Get User Notifications

```http
GET /api/notifications?page=1&limit=20
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Laporan Disetujui",
      "message": "Laporan kinerja bulan 1/2025 telah disetujui",
      "type": "REPORT_APPROVED",
      "isRead": false,
      "readAt": null,
      "metadata": {
        "reportId": "uuid",
        "bulan": 1,
        "tahun": 2025
      },
      "createdAt": "2025-02-09T10:00:00.000Z"
    }
  ],
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 20,
    "totalPages": 2,
    "unreadCount": 5
  }
}
```

---

#### 2. Get Unread Count

```http
GET /api/notifications/unread-count
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "count": 5
}
```

---

#### 3. Mark Notification as Read

```http
PATCH /api/notifications/:id/read
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true
}
```

---

#### 4. Mark All Notifications as Read

```http
PATCH /api/notifications/read-all
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true
}
```

---

#### 5. Delete Notification

```http
DELETE /api/notifications/:id
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "success": true
}
```

---

### Audit Logs Endpoints

#### 1. Get All Audit Logs (Admin Only)

```http
GET /api/audit?page=1&limit=50&userId=uuid&entity=REPORT&action=CREATE&startDate=2025-01-01&endDate=2025-02-09
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 50)
- `userId`: Filter by user ID (optional)
- `entity`: Filter by entity (optional)
- `action`: Filter by action (optional)
- `startDate`: Filter by start date (optional)
- `endDate`: Filter by end date (optional)

**Response (200):**

```json
{
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "action": "CREATE",
      "entity": "REPORT",
      "entityId": "uuid",
      "oldData": null,
      "newData": {
        "bulan": 1,
        "tahun": 2025
      },
      "ipAddress": "192.168.1.1",
      "userAgent": "Mozilla/5.0...",
      "createdAt": "2025-02-09T10:00:00.000Z",
      "user": {
        "id": "uuid",
        "email": "ahmad.dahlan@kemenag.go.id",
        "name": "Ahmad Dahlan",
        "role": "USER"
      }
    }
  ],
  "meta": {
    "total": 500,
    "page": 1,
    "limit": 50,
    "totalPages": 10
  }
}
```

**Required Role:** ADMIN, SUPER_ADMIN

---

#### 2. Get My Activity

```http
GET /api/audit/my-activity?page=1&limit=50
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "data": [
    {
      "id": "uuid",
      "action": "CREATE",
      "entity": "REPORT",
      "entityId": "uuid",
      "createdAt": "2025-02-09T10:00:00.000Z"
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 50,
    "totalPages": 1
  }
}
```

---

#### 3. Get Audit Logs for Specific Entity (Admin Only)

```http
GET /api/audit/entity/:entity/:entityId?page=1&limit=20
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "data": [
    {
      "id": "uuid",
      "action": "UPDATE",
      "entity": "REPORT",
      "entityId": "uuid",
      "oldData": {
        "status": "DRAFT"
      },
      "newData": {
        "status": "SUBMITTED"
      },
      "user": {
        "name": "Ahmad Dahlan"
      },
      "createdAt": "2025-02-09T10:00:00.000Z"
    }
  ],
  "meta": {
    "total": 5,
    "page": 1,
    "limit": 20,
    "totalPages": 1
  }
}
```

**Required Role:** ADMIN, SUPER_ADMIN

---

#### 4. Get Audit Statistics (Admin Only)

```http
GET /api/audit/statistics?startDate=2025-01-01&endDate=2025-02-09
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "total": 1500,
  "byAction": [
    {
      "action": "CREATE",
      "_count": 500
    },
    {
      "action": "UPDATE",
      "_count": 700
    },
    {
      "action": "DELETE",
      "_count": 50
    }
  ],
  "byEntity": [
    {
      "entity": "REPORT",
      "_count": 800
    },
    {
      "entity": "USER",
      "_count": 200
    }
  ],
  "topUsers": [
    {
      "userId": "uuid",
      "_count": 150
    }
  ]
}
```

**Required Role:** ADMIN, SUPER_ADMIN

---

#### 5. Clean Old Audit Logs (Super Admin Only)

```http
POST /api/audit/clean?daysToKeep=90
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
  "deleted": 500,
  "cutoffDate": "2024-11-10T00:00:00.000Z"
}
```

**Required Role:** SUPER_ADMIN

---

### Health Check Endpoints

#### 1. Health Check

```http
GET /api/health
```

**No authentication required**

**Response (200):**

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

---

#### 2. Get System Info

```http
GET /api/health/info
```

**No authentication required**

**Response (200):**

```json
{
  "name": "E-Kinerja Backend API",
  "version": "1.0.0",
  "environment": "production",
  "uptime": 86400,
  "timestamp": "2025-02-09T10:00:00.000Z"
}
```

---

## WebSocket

### Connection

```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3000/notifications', {
  auth: {
    token: 'your_access_token',
  },
});
```

### Events

#### Connected

```javascript
socket.on('connected', (data) => {
  console.log(data);
  // { message: "Successfully connected to notifications", userId: "uuid" }
});
```

#### Notification

```javascript
socket.on('notification', (notification) => {
  console.log(notification);
  // {
  //   id: "uuid",
  //   title: "Laporan Disetujui",
  //   message: "Laporan kinerja bulan 1/2025 telah disetujui",
  //   type: "REPORT_APPROVED",
  //   ...
  // }
});
```

#### Ping/Pong

```javascript
socket.emit('ping');

socket.on('pong', (data) => {
  console.log(data);
  // { timestamp: "2025-02-09T10:00:00.000Z" }
});
```

#### Subscribe to Channel

```javascript
socket.emit('subscribe', { channel: 'reports' });

socket.on('subscribed', (data) => {
  console.log(data);
  // { channel: "reports" }
});
```

#### Unsubscribe from Channel

```javascript
socket.emit('unsubscribe', { channel: 'reports' });

socket.on('unsubscribed', (data) => {
  console.log(data);
  // { channel: "reports" }
});
```

---

## Data Models

### User

```typescript
{
  id: string;
  email: string;
  password: string; // Hashed
  name: string;
  role: "SUPER_ADMIN" | "ADMIN" | "USER" | "GUEST";
  isActive: boolean;
  lastLogin?: Date;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Pegawai

```typescript
{
  id: string;
  userId: string;
  nip: string; // 18 digits
  nuptk?: string; // 16 digits
  nik?: string; // 16 digits
  nama: string;
  tempatLahir?: string;
  tanggalLahir?: Date;
  gender: "L" | "P";
  jenisPegawai: "PNS" | "PPPK" | "HONORER" | "GTT" | "PTT" | "GURU";
  statusPegawai: "AKTIF" | "CUTI" | "TUGAS_BELAJAR" | "NON_AKTIF";
  golongan?: string;
  jabatan: string;
  unitKerja: string;
  alamat?: string;
  hp?: string;
  email?: string;
  pendidikan?: string;
  masaKerjaTahun: number;
  masaKerjaBulan: number;
  fotoPegawai?: string; // Base64
  createdAt: Date;
  updatedAt: Date;
}
```

### AkademikData

```typescript
{
  id: string;
  pegawaiId: string;
  kurikulum: "K13" | "MERDEKA" | "KTSP";
  tahunPelajaran: string; // e.g., "2024/2025"
  semester: "GANJIL" | "GENAP";
  mapel: string;
  kelas: string;
  jamMengajar: number;
  jumlahSiswa: number;
  ekskul?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Instansi

```typescript
{
  id: string;
  header1: string;
  header2: string;
  header3: string;
  alamat: string;
  telepon?: string;
  email?: string;
  website?: string;
  logoUtama?: string; // Base64
  logoInstansi?: string; // Base64
  namaKepala: string;
  nipKepala: string;
  pangkatKepala: string;
  ttdKepala?: string; // Base64
  titimangsa: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Report

```typescript
{
  id: string;
  pegawaiId: string;
  instansiId: string;
  userId: string;
  bulan: number; // 1-12
  tahun: number;
  tugasPokok: string;
  tugasTambahan?: string;
  targetTahunan?: string;
  hambatan?: string;
  solusi?: string;
  content: string; // Markdown
  modelAI: string;
  tokensUsed?: number;
  nomorDokumen: string; // Unique
  hashDokumen?: string;
  qrCode?: string;
  ttdTimestamp?: Date;
  status: "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED" | "ARCHIVED";
  publishedAt?: Date;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}
```

### FileUpload

```typescript
{
  id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  url?: string;
  uploadedBy: string;
  category: "FOTO_PEGAWAI" | "LOGO_INSTANSI" | "TTD" | "LAMPIRAN" | "DOKUMEN" | "OTHER";
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}
```

### Notification

```typescript
{
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "INFO" | "SUCCESS" | "WARNING" | "ERROR" | "REPORT_SUBMITTED" | "REPORT_APPROVED" | "REPORT_REJECTED";
  isRead: boolean;
  readAt?: Date;
  metadata?: any;
  createdAt: Date;
}
```

### AuditLog

```typescript
{
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId?: string;
  oldData?: any;
  newData?: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}
```

---

## Rate Limiting

API menggunakan rate limiting untuk mencegah abuse:

- Default: 100 requests per 60 seconds
- Konfigurasi: `RATE_LIMIT_TTL` dan `RATE_LIMIT_MAX` di .env

**Response saat rate limit exceeded:**

```json
{
  "statusCode": 429,
  "message": "Too Many Requests"
}
```

---

## Swagger Documentation

API documentation juga tersedia melalui Swagger UI:

```
http://localhost:3000/api/docs
```

Swagger menyediakan interactive API documentation dimana Anda bisa:

- Melihat semua endpoints
- Mencoba endpoints langsung dari browser
- Melihat request/response schemas
- Melakukan testing dengan authentication

---

## Environment Variables

Berikut adalah environment variables yang diperlukan:

```env
# Application
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL="mysql://user:password@localhost:3306/ekinerja"

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_REFRESH_EXPIRES_IN=30d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# AI Services
GEMINI_API_KEY=your-gemini-api-key
CLAUDE_API_KEY=your-claude-api-key
OPENAI_API_KEY=your-openai-api-key
GROQ_API_KEY=your-groq-api-key
DEEPSEEK_API_KEY=your-deepseek-api-key
TOGETHER_API_KEY=your-together-api-key

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DEST=./uploads

# CORS
CORS_ORIGIN=http://localhost:3000
CORS_CREDENTIALS=true

# Rate Limiting
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL=info
LOG_FILE_PATH=./logs

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

---

## Best Practices

### Authentication

1. Simpan access token di memory (state management)
2. Simpan refresh token di httpOnly cookie atau secure storage
3. Refresh token sebelum access token expire
4. Implement token refresh logic pada 401 response

### Error Handling

1. Selalu handle error responses
2. Display user-friendly error messages
3. Log errors untuk debugging
4. Implement retry logic untuk network errors

### File Upload

1. Validate file type dan size di frontend sebelum upload
2. Show upload progress
3. Handle upload errors
4. Compress images sebelum upload jika memungkinkan

### WebSocket

1. Handle reconnection automatically
2. Implement heartbeat/ping-pong
3. Buffer notifications saat disconnected
4. Show connection status di UI

### Performance

1. Implement pagination untuk list endpoints
2. Cache frequently accessed data
3. Lazy load components dan data
4. Optimize images dan assets
5. Use debounce untuk search inputs

---

## Support

Untuk pertanyaan atau issues, silakan hubungi:

- Email: support@ekinerja.com
- GitHub Issues: [repository-url]/issues

---

**Version:** 1.0.0  
**Last Updated:** February 9, 2025

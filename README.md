# E-Kinerja Frontend

Frontend application untuk E-Kinerja - Generator Laporan Kinerja Pegawai berbasis AI.

## Tech Stack

- Astro 5
- Alpine.js
- TailwindCSS 4
- TypeScript
- Axios

## Prerequisites

- Node.js 18+
- Backend API running di http://localhost:3000

## Installation

```bash
npm install
```

## Configuration

Buat file `.env` di root project:

```env
PUBLIC_API_URL=http://localhost:3000/api
```

## Development

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:4321`

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Fitur Utama

1. Authentication (Login/Register)
2. Data Pegawai Management
3. Data Instansi Management
4. AI Report Generation dengan multiple providers:
   - Google Gemini
   - Claude
   - GPT
   - Groq
   - DeepSeek
   - Together AI
5. Export ke PDF dan DOCX
6. Real-time auto-save
7. History management
8. File upload support

## Default Login

Gunakan credentials dari backend seeder:

```
Email: demo@ekinerja.com
Password: admin123
```

atau

```
Email: admin@ekinerja.com
Password: admin123
```

## Project Structure

```
src/
├── components/       # Astro components
├── layouts/         # Layout templates
├── pages/           # Astro pages (routes)
├── services/        # API services
├── stores/          # State management (nanostores)
├── styles/          # Global styles
├── types/           # TypeScript types
└── utils/           # Utility functions
```

## API Endpoints Used

- POST /api/auth/login
- POST /api/auth/register
- GET /api/pegawai/me
- POST /api/pegawai
- PATCH /api/pegawai/:id
- GET /api/instansi/active
- POST /api/instansi
- PATCH /api/instansi/:id
- POST /api/reports/generate
- GET /api/reports/my-reports
- GET /api/reports/:id
- DELETE /api/reports/:id
- POST /api/files/upload

## Notes

- Pastikan backend API sudah running sebelum menjalankan frontend
- Token disimpan di localStorage menggunakan nanostores persistent
- Auto-save aktif dengan debounce 800ms

// ============================================================================
// CONSTANTS & CONFIGURATIONS
// Version: 1.0.0
// ============================================================================

export const APP_INFO = {
  name: 'E-Kinerja Backend API',
  version: '1.0.0',
  description: 'Backend API untuk Generator Laporan Kinerja Pegawai',
  author: 'Yahya Zulfikri',
};

export const VALIDATION_RULES = {
  nip: {
    length: 18,
    regex: /^\d{18}$/,
    message: 'NIP harus 18 digit angka',
  },
  nuptk: {
    length: 16,
    regex: /^\d{16}$/,
    message: 'NUPTK harus 16 digit angka',
  },
  nik: {
    length: 16,
    regex: /^\d{16}$/,
    message: 'NIK harus 16 digit angka',
  },
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Format email tidak valid',
  },
  phone: {
    regex: /^(\+62|62|0)[0-9]{9,12}$/,
    message: 'Nomor telepon tidak valid',
  },
};

export const FILE_LIMITS = {
  image: {
    maxSize: 500 * 1024, // 500KB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  },
  document: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['application/pdf', 'application/msword'],
  },
};

export const BULAN_INDONESIA = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export const JENIS_PEGAWAI = ['PNS', 'PPPK', 'HONORER', 'GTT', 'PTT', 'GURU'];

export const STATUS_PEGAWAI = ['AKTIF', 'CUTI', 'TUGAS_BELAJAR', 'NON_AKTIF'];

export const REPORT_STATUS = ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED', 'ARCHIVED'];

export const AI_MODELS = {
  gemini: {
    name: 'Google Gemini 2.0 Flash',
    maxTokens: 8000,
    temperature: 0.7,
  },
  claude: {
    name: 'Claude Sonnet 4',
    maxTokens: 4000,
    temperature: 0.7,
  },
  gpt: {
    name: 'GPT-4o Mini',
    maxTokens: 4000,
    temperature: 0.7,
  },
  groq: {
    name: 'Groq Llama 3.3 70B',
    maxTokens: 8000,
    temperature: 0.7,
  },
};

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Email atau password salah',
  UNAUTHORIZED: 'Anda tidak memiliki akses',
  NOT_FOUND: 'Data tidak ditemukan',
  ALREADY_EXISTS: 'Data sudah ada',
  VALIDATION_ERROR: 'Validasi gagal',
  SERVER_ERROR: 'Terjadi kesalahan server',
};

export const SUCCESS_MESSAGES = {
  CREATED: 'Data berhasil dibuat',
  UPDATED: 'Data berhasil diupdate',
  DELETED: 'Data berhasil dihapus',
  LOGGED_IN: 'Login berhasil',
  LOGGED_OUT: 'Logout berhasil',
};

// ============================================================================
// GENERATOR LAPORAN KINERJA PEGAWAI - CONFIGURATION
// Version: 1.0.0
// ============================================================================

// ============================================================================
// APPLICATION INFO
// ============================================================================

export const APP_INFO = {
	name: "Generator Laporan Kinerja Pegawai",
	shortName: "E-Kinerja AI",
	version: "1.0.0",
	description: "Tools generate laporan kinerja pegawai berbasis AI",
	author: "Yahya Zulfikri",
	license: "MIT",
	repository: "https://github.com/zulfikriyahya/generator-laporan-kinerja-pegawai",
};

// ============================================================================
// API CONFIGURATION
// ============================================================================

export const API_CONFIG = {
	gemini: {
		baseURL: "https://generativelanguage.googleapis.com/v1beta",
		model: "gemini-2.0-flash-exp",
		maxTokens: 8000,
		temperature: 0.7,
	},
	claude: {
		baseURL: "https://api.anthropic.com/v1",
		model: "claude-sonnet-4-20250514",
		maxTokens: 4000,
		temperature: 0.7,
		version: "2023-06-01",
	},
	openai: {
		baseURL: "https://api.openai.com/v1",
		model: "gpt-4-turbo-preview",
		maxTokens: 4000,
		temperature: 0.7,
	},
	groq: {
		baseURL: "https://api.groq.com/openai/v1",
		model: "mixtral-8x7b-32768",
		maxTokens: 4000,
		temperature: 0.7,
	},
};

// ============================================================================
// STORAGE KEYS
// ============================================================================

export const STORAGE_KEYS = {
	appStore: "ekinerja-app-v1:",
	history: "ekinerja-history:",
	auditLog: "ekinerja-audit-logs",
	lastDocNumber: "ekinerja-last-doc-number",
	userPreferences: "ekinerja-user-prefs",
	tempDraft: "ekinerja-temp-draft",
};

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const VALIDATION_RULES = {
	nip: {
		length: 18,
		regex: /^\d{18}$/,
		message: "NIP harus 18 digit angka",
	},
	nuptk: {
		length: 16,
		regex: /^\d{16}$/,
		message: "NUPTK harus 16 digit angka",
	},
	nik: {
		length: 16,
		regex: /^\d{16}$/,
		message: "NIK harus 16 digit angka",
	},
	email: {
		regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		message: "Format email tidak valid",
	},
	phone: {
		minLength: 10,
		maxLength: 13,
		regex: /^(\+62|62|0)[0-9]{9,12}$/,
		message: "Nomor telepon tidak valid (10-13 digit)",
	},
};

// ============================================================================
// FILE LIMITS
// ============================================================================

export const FILE_LIMITS = {
	image: {
		maxSize: 500 * 1024, // 500 KB
		allowedTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
		allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"],
	},
	signature: {
		maxSize: 200 * 1024, // 200 KB
		allowedTypes: ["image/png"],
		allowedExtensions: [".png"],
	},
	excel: {
		maxSize: 5 * 1024 * 1024, // 5 MB
		allowedTypes: [
			"application/vnd.ms-excel",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		],
		allowedExtensions: [".xls", ".xlsx"],
	},
	pdf: {
		maxSize: 10 * 1024 * 1024, // 10 MB
		allowedTypes: ["application/pdf"],
		allowedExtensions: [".pdf"],
	},
};

// ============================================================================
// DOCUMENT SETTINGS
// ============================================================================

export const DOCUMENT_SETTINGS = {
	a4: {
		width: 210, // mm
		height: 297, // mm
		margin: {
			top: 15, // mm
			right: 20, // mm
			bottom: 15, // mm
			left: 20, // mm
		},
	},
	font: {
		family: "Times New Roman",
		size: {
			normal: 12, // pt
			header: 14, // pt
			title: 16, // pt
		},
		lineHeight: 1.5,
	},
	logo: {
		maxHeight: 80, // px
		maxWidth: 80, // px
	},
};

// ============================================================================
// UI CONSTANTS
// ============================================================================

export const UI_CONSTANTS = {
	toast: {
		duration: 3000, // ms
		position: "top-right",
	},
	debounceDelay: 800, // ms
	autoSaveInterval: 30000, // ms (30 seconds)
	maxHistoryItems: 20,
	previewUpdateDelay: 500, // ms
};

// ============================================================================
// DATE FORMATS
// ============================================================================

export const DATE_FORMATS = {
	indonesia: {
		full: "dd MMMM yyyy", // 01 Januari 2025
		short: "dd/MM/yyyy", // 01/01/2025
		monthYear: "MMMM yyyy", // Januari 2025
	},
	iso: "yyyy-MM-dd", // 2025-01-01
	filename: "yyyyMMdd", // 20250101
	timestamp: "yyyy-MM-dd HH:mm:ss", // 2025-01-01 14:30:00
};

// ============================================================================
// MASTER DATA
// ============================================================================

export const MASTER_DATA = {
	jenisPegawai: ["PNS", "PPPK", "Honorer", "GTT", "PTT", "Guru"],
	
	statusKepegawaian: ["Aktif", "Cuti", "Tugas Belajar"],
	
	jenisKelamin: [
		{ value: "L", label: "Laki-laki" },
		{ value: "P", label: "Perempuan" },
	],
	
	golonganPNS: [
		"I/a", "I/b", "I/c", "I/d",
		"II/a", "II/b", "II/c", "II/d",
		"III/a", "III/b", "III/c", "III/d",
		"IV/a", "IV/b", "IV/c", "IV/d", "IV/e",
	],
	
	kurikulum: [
		"Kurikulum 2013",
		"Kurikulum Merdeka",
		"KTSP",
	],
	
	semester: ["Ganjil", "Genap"],
	
	mataPelajaran: [
		"Matematika",
		"Bahasa Indonesia",
		"Bahasa Inggris",
		"IPA (Ilmu Pengetahuan Alam)",
		"IPS (Ilmu Pengetahuan Sosial)",
		"Pendidikan Agama Islam",
		"Pendidikan Agama Kristen",
		"Pendidikan Agama Katolik",
		"Pendidikan Agama Hindu",
		"Pendidikan Agama Buddha",
		"PJOK (Pendidikan Jasmani)",
		"Seni Budaya",
		"Prakarya",
		"Informatika",
		"Bahasa Arab",
		"Al-Quran Hadits",
		"Akidah Akhlak",
		"Fiqih",
		"Sejarah Kebudayaan Islam",
	],
	
	bulan: [
		{ value: "1", label: "Januari" },
		{ value: "2", label: "Februari" },
		{ value: "3", label: "Maret" },
		{ value: "4", label: "April" },
		{ value: "5", label: "Mei" },
		{ value: "6", label: "Juni" },
		{ value: "7", label: "Juli" },
		{ value: "8", label: "Agustus" },
		{ value: "9", label: "September" },
		{ value: "10", label: "Oktober" },
		{ value: "11", label: "November" },
		{ value: "12", label: "Desember" },
	],
};

// ============================================================================
// ERROR MESSAGES
// ============================================================================

export const ERROR_MESSAGES = {
	required: (field: string) => `${field} harus diisi`,
	invalid: (field: string) => `${field} tidak valid`,
	minLength: (field: string, min: number) =>
		`${field} minimal ${min} karakter`,
	maxLength: (field: string, max: number) =>
		`${field} maksimal ${max} karakter`,
	fileSize: (max: string) => `Ukuran file maksimal ${max}`,
	fileType: (types: string) => `Tipe file yang diizinkan: ${types}`,
	network: "Gagal terhubung ke server. Periksa koneksi internet Anda.",
	unknown: "Terjadi kesalahan yang tidak diketahui",
	apiKey: (model: string) => `API Key ${model} tidak ditemukan`,
	tokenLimit: "Token limit terlampaui",
	generateFailed: "Gagal generate laporan. Silakan coba lagi.",
	exportFailed: "Gagal export dokumen. Silakan coba lagi.",
	importFailed: "Gagal import data. Periksa format file Excel.",
};

// ============================================================================
// SUCCESS MESSAGES
// ============================================================================

export const SUCCESS_MESSAGES = {
	saved: "Data berhasil disimpan",
	generated: "Laporan berhasil dibuat",
	exported: "Dokumen berhasil diexport",
	imported: "Data berhasil diimport",
	copied: "Berhasil disalin ke clipboard",
	deleted: "Data berhasil dihapus",
};

// ============================================================================
// PROMPT TEMPLATES
// ============================================================================

export const PROMPT_TEMPLATES = {
	systemRole: `ROLE: Asisten Administrasi ASN Profesional
EXPERTISE: Menyusun laporan kinerja pegawai sesuai standar Indonesia
BEHAVIOR: Formal, objektif, faktual
OUTPUT: Markdown terstruktur dengan Bahasa Indonesia baku`,

	contentStructure: `
## BAB I: PENDAHULUAN
### 1.1 Latar Belakang
### 1.2 Tujuan Laporan
### 1.3 Ruang Lingkup

## BAB II: PELAKSANAAN TUGAS
### 2.1 Uraian Tugas Pokok
### 2.2 Tugas Tambahan
### 2.3 Rincian Kegiatan Harian

## BAB III: CAPAIAN KINERJA
### 3.1 Capaian Target
### 3.2 Analisis Kinerja
### 3.3 Hambatan dan Kendala
### 3.4 Solusi dan Tindak Lanjut

## BAB IV: PENUTUP
### 4.1 Kesimpulan
### 4.2 Rekomendasi
`,

	qualityChecklist: `
✓ Bahasa Indonesia baku dan formal
✓ Struktur BAB I-IV lengkap
✓ Tabel kegiatan minimal 15 baris
✓ Tanggal variatif sepanjang bulan
✓ Output terukur dan konkret
✓ Tidak ada placeholder [...]
✓ Total 1500-2500 kata
`,
};

// ============================================================================
// FEATURE FLAGS
// ============================================================================

export const FEATURES = {
	multiAI: true, // Multi-model AI support
	pdfExport: true,
	docxExport: true,
	excelImport: true,
	history: true,
	tte: true, // Tanda Tangan Elektronik
	qrCode: true,
	googleDrive: false, // Coming soon
	cloudBackup: false, // Coming soon
	multiUser: false, // Coming soon
	analytics: false, // Coming soon
};

// ============================================================================
// DEVELOPER INFO
// ============================================================================

export const DEVELOPER_INFO = {
	name: "Yahya Zulfikri",
	email: "zulfikriyahya18@gmail.com",
	phone: "+62 895-3518-56267",
	github: "https://github.com/zulfikriyahya",
	website: "https://zulfikriyahya.github.io",
};

// ============================================================================
// ANALYTICS EVENTS (for future implementation)
// ============================================================================

export const ANALYTICS_EVENTS = {
	pageView: "page_view",
	generateReport: "generate_report",
	exportPDF: "export_pdf",
	exportDOCX: "export_docx",
	importExcel: "import_excel",
	saveHistory: "save_history",
	loadHistory: "load_history",
	error: "error_occurred",
};

// ============================================================================
// ENVIRONMENT HELPERS
// ============================================================================

export const ENV = {
	isDevelopment: import.meta.env.DEV,
	isProduction: import.meta.env.PROD,
	mode: import.meta.env.MODE,
	baseURL: import.meta.env.BASE_URL,
};

// ============================================================================
// HELPER FUNCTIONS FOR CONFIG
// ============================================================================

/**
 * Get API key from environment
 */
export const getAPIKey = (model: "gemini" | "claude" | "gpt" | "groq"): string => {
	const keys = {
		gemini: import.meta.env.PUBLIC_GEMINI_API_KEY,
		claude: import.meta.env.PUBLIC_CLAUDE_API_KEY,
		gpt: import.meta.env.PUBLIC_OPENAI_API_KEY,
		groq: import.meta.env.PUBLIC_GROQ_API_KEY,
	};
	return keys[model] || "";
};

/**
 * Check if feature is enabled
 */
export const isFeatureEnabled = (feature: keyof typeof FEATURES): boolean => {
	return FEATURES[feature] === true;
};

/**
 * Get current year for default values
 */
export const getCurrentYear = (): number => {
	return new Date().getFullYear();
};

/**
 * Get current month (1-12)
 */
export const getCurrentMonth = (): number => {
	return new Date().getMonth() + 1;
};

/**
 * Get academic year (Tahun Pelajaran)
 */
export const getAcademicYear = (): string => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	
	// If before July, academic year is (year-1)/year
	// If July or after, academic year is year/(year+1)
	if (month < 7) {
		return `${year - 1}/${year}`;
	} else {
		return `${year}/${year + 1}`;
	}
};

/**
 * Get semester based on current month
 */
export const getCurrentSemester = (): "Ganjil" | "Genap" => {
	const month = new Date().getMonth() + 1;
	// Ganjil: July - December (7-12)
	// Genap: January - June (1-6)
	return month >= 7 ? "Ganjil" : "Genap";
};
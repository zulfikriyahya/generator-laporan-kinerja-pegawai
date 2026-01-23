// ============================================================================
// GENERATOR LAPORAN KINERJA PEGAWAI - CONFIGURATION
// Version: 1.0.0
// ============================================================================

export const APP_INFO = {
	name: "Generator Laporan Kinerja Pegawai",
	shortName: "E-Kinerja AI",
	version: "1.0.0",
	description: "Tools generate laporan kinerja pegawai berbasis AI",
	author: "Yahya Zulfikri",
	license: "MIT",
	repository:
		"https://github.com/zulfikriyahya/generator-laporan-kinerja-pegawai",
};

export const API_CONFIG = {
	gemini: {
		baseURL: "https://generativelanguage.googleapis.com/v1beta",
		model: "gemini-3-flash-preview",
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

export const STORAGE_KEYS = {
	appStore: "ekinerja-app-v1:",
	history: "ekinerja-history:",
	auditLog: "ekinerja-audit-logs",
	lastDocNumber: "ekinerja-last-doc-number",
	userPreferences: "ekinerja-user-prefs",
	tempDraft: "ekinerja-temp-draft",
};

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

export const FILE_LIMITS = {
	image: {
		maxSize: 500 * 1024,
		allowedTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
		allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"],
	},
	signature: {
		maxSize: 200 * 1024,
		allowedTypes: ["image/png"],
		allowedExtensions: [".png"],
	},
	excel: {
		maxSize: 5 * 1024 * 1024,
		allowedTypes: [
			"application/vnd.ms-excel",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		],
		allowedExtensions: [".xls", ".xlsx"],
	},
	pdf: {
		maxSize: 10 * 1024 * 1024,
		allowedTypes: ["application/pdf"],
		allowedExtensions: [".pdf"],
	},
};

export const DOCUMENT_SETTINGS = {
	a4: {
		width: 210,
		height: 297,
		margin: {
			top: 15,
			right: 20,
			bottom: 15,
			left: 20,
		},
	},
	font: {
		family: "Times New Roman",
		size: {
			normal: 12,
			header: 14,
			title: 16,
		},
		lineHeight: 1.5,
	},
	logo: {
		maxHeight: 80,
		maxWidth: 80,
	},
};

export const UI_CONSTANTS = {
	toast: {
		duration: 3000,
		position: "top-right",
	},
	debounceDelay: 800,
	autoSaveInterval: 30000,
	maxHistoryItems: 20,
	previewUpdateDelay: 500,
};

export const DATE_FORMATS = {
	indonesia: {
		full: "dd MMMM yyyy",
		short: "dd/MM/yyyy",
		monthYear: "MMMM yyyy",
	},
	iso: "yyyy-MM-dd",
	filename: "yyyyMMdd",
	timestamp: "yyyy-MM-dd HH:mm:ss",
};

export const MASTER_DATA = {
	jenisPegawai: ["PNS", "PPPK", "Honorer", "GTT", "PTT", "Guru"],

	statusKepegawaian: ["Aktif", "Cuti", "Tugas Belajar"],

	jenisKelamin: [
		{ value: "L", label: "Laki-laki" },
		{ value: "P", label: "Perempuan" },
	],

	golonganPNS: [
		"I/a",
		"I/b",
		"I/c",
		"I/d",
		"II/a",
		"II/b",
		"II/c",
		"II/d",
		"III/a",
		"III/b",
		"III/c",
		"III/d",
		"IV/a",
		"IV/b",
		"IV/c",
		"IV/d",
		"IV/e",
	],

	kurikulum: ["Kurikulum 2013", "Kurikulum Merdeka", "KTSP"],

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

export const ERROR_MESSAGES = {
	required: (field: string) => `${field} harus diisi`,
	invalid: (field: string) => `${field} tidak valid`,
	minLength: (field: string, min: number) => `${field} minimal ${min} karakter`,
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

export const SUCCESS_MESSAGES = {
	saved: "Data berhasil disimpan",
	generated: "Laporan berhasil dibuat",
	exported: "Dokumen berhasil diexport",
	imported: "Data berhasil diimport",
	copied: "Berhasil disalin ke clipboard",
	deleted: "Data berhasil dihapus",
};

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

export const FEATURES = {
	multiAI: true,
	pdfExport: true,
	docxExport: true,
	excelImport: true,
	history: true,
	tte: true,
	qrCode: true,
	googleDrive: false,
	nextCloud: false,
	cloudBackup: false,
	multiUser: false,
	analytics: false,
};

export const DEVELOPER_INFO = {
	name: "Yahya Zulfikri",
	email: "zulfikriyahya18@gmail.com",
	phone: "+62 895-3518-56267",
	github: "https://github.com/zulfikriyahya",
	website: "https://zulfikriyahya.github.io",
};

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

export const ENV = {
	isDevelopment: import.meta.env.DEV,
	isProduction: import.meta.env.PROD,
	mode: import.meta.env.MODE,
	baseURL: import.meta.env.BASE_URL,
};

export const getAPIKey = (
	model: "gemini" | "claude" | "gpt" | "groq" | "together" | "deepseek",
): string => {
	const keys = {
		gemini: import.meta.env.PUBLIC_GEMINI_API_KEY,
		claude: import.meta.env.PUBLIC_CLAUDE_API_KEY,
		gpt: import.meta.env.PUBLIC_OPENAI_API_KEY,
		groq: import.meta.env.PUBLIC_GROQ_API_KEY,
		together: import.meta.env.PUBLIC_TOGETHER_API_KEY || "",
		deepseek: import.meta.env.PUBLIC_DEEPSEEK_API_KEY || "",
	};
	return keys[model] || "";
};

export const isFeatureEnabled = (feature: keyof typeof FEATURES): boolean => {
	return FEATURES[feature] === true;
};

export const getCurrentYear = (): number => {
	return new Date().getFullYear();
};

export const getCurrentMonth = (): number => {
	return new Date().getMonth() + 1;
};

export const getAcademicYear = (): string => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;

	if (month < 7) {
		return `${year - 1}/${year}`;
	} else {
		return `${year}/${year + 1}`;
	}
};

export const getCurrentSemester = (): "Ganjil" | "Genap" => {
	const month = new Date().getMonth() + 1;
	return month >= 7 ? "Ganjil" : "Genap";
};

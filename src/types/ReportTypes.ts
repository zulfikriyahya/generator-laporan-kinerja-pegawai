// ============================================================================
// GENERATOR LAPORAN KINERJA PEGAWAI - TYPE DEFINITIONS
// Version: 1.0.0
// ============================================================================

// ============================================================================
// CORE DATA TYPES
// ============================================================================

export interface Pejabat {
	nama: string;
	nip: string;
	pangkat: string;
	ttd: string; // Base64 signature
}

export interface InstansiData {
	// 2.1 Identitas Instansi
	logoUtama: string; // Base64
	logoInstitusi: string; // Base64
	logoInstansi: string; // Base64
	header1: string;
	header2: string;
	header3: string;
	alamat: string;
	telepon: string;
	email: string;
	website: string;
	kepala: Pejabat;
	kepalaTu: Pejabat;
	titimangsa: string; // Tempat surat
}

export interface PegawaiData {
	// 2.2 Identitas Pegawai
	nama: string;
	nip: string;
	nuptk: string;
	nik: string;
	jenis: "PNS" | "PPPK" | "Honorer" | "GTT" | "PTT" | "Guru";
	status: "Aktif" | "Cuti" | "Tugas Belajar";
	golongan: string;
	jabatan: string;
	unitKerja: string;
	tempatLahir: string;
	tanggalLahir: string;
	gender: "L" | "P";
	alamat: string;
	hp: string;
	email: string;
	fotoPegawai: string; // Base64
	pendidikan: string; // S1/S2 Jurusan
	masaKerjaTahun: string;
	masaKerjaBulan: string;
}

export interface AkademikData {
	// 2.3 Data Akademik
	kurikulum: "Kurikulum 2013" | "Kurikulum Merdeka" | "KTSP";
	tahunPelajaran: string; // 2024/2025
	semester: "Ganjil" | "Genap";
	mapel: string;
	kelas: string;
	jamMengajar: string;
	jumlahSiswa: string;
	ekskul: string;
}

export interface KinerjaData {
	// 2.4 Data Kinerja
	tugasPokok: string;
	tugasTambahan: string;
	targetTahunan: string; // IKU
	targetKuantitatif: string;
	targetKualitatif: string;
	hambatan: string;
	solusi: string;
}

export interface ConfigData {
	// 2.6 Integrasi AI & System
	bulan: string;
	tahun: string;
	modelAI: AIModel;
	tokenLimit: number;
	customInstruction: string;
}

export interface TTEData {
	qrCode: string; // Base64
	nomorDokumen: string;
	hashDokumen: string;
	timestamp: string;
	statusValidasi: "Valid" | "Invalid" | "Expired";
}

export interface TitimangsaData {
	tempat: string;
	tanggal: string;
	bahasa: "Indonesia" | "Inggris";
}

export interface OutputData {
	// 2.5 Dokumen Output
	titimangsa: TitimangsaData;
	tte: TTEData;
	content: string; // Markdown result
	lastUpdated: string;
}

export interface AppStore {
	instansi: InstansiData;
	pegawai: PegawaiData;
	akademik: AkademikData;
	kinerja: KinerjaData;
	config: ConfigData;
	output: OutputData;
}

// ============================================================================
// HISTORY TYPES
// ============================================================================

export interface HistoryItem {
	id: string;
	title: string;
	date: string; // ISO format
	data: AppStore;
}

export interface HistoryStore {
	items: HistoryItem[];
}

// ============================================================================
// AI SERVICE TYPES
// ============================================================================

export type AIModel = "gemini" | "claude" | "gpt" | "groq";

export interface GenerateAIResult {
	success: boolean;
	content?: string;
	tokensUsed?: number;
	error?: string;
}

export interface AIModelConfig {
	model: string;
	maxTokens: number;
	temperature: number;
}

// ============================================================================
// VALIDATION TYPES
// ============================================================================

export interface ValidationError {
	field: string;
	message: string;
}

export interface ValidationResult {
	valid: boolean;
	errors: ValidationError[];
}

// ============================================================================
// EXCEL SERVICE TYPES
// ============================================================================

export interface ImportExcelResult {
	success: boolean;
	data?: AppStore;
	errors?: ValidationError[];
}

export interface ExcelTemplateConfig {
	sheets: string[];
	headers: Record<string, string[]>;
	validation: Record<string, any>;
}

// ============================================================================
// EXPORT SERVICE TYPES
// ============================================================================

export interface ExportResult {
	success: boolean;
	file?: Blob;
	error?: string;
}

export interface ExportOptions {
	format: "pdf" | "docx" | "xlsx";
	filename?: string;
	metadata?: Record<string, any>;
}

// ============================================================================
// UI STATE TYPES
// ============================================================================

export interface Tab {
	id: string;
	label: string;
	icon?: string;
}

export interface Toast {
	id: number;
	message: string;
	type: "success" | "error" | "info" | "warning";
	duration?: number;
}

export interface LoadingState {
	isLoading: boolean;
	message?: string;
	progress?: number;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type AsyncResult<T> = Promise<{
	success: boolean;
	data?: T;
	error?: string;
}>;

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface APIResponse<T = any> {
	success: boolean;
	data?: T;
	error?: {
		code: string;
		message: string;
		details?: any;
	};
	meta?: {
		timestamp: string;
		version: string;
	};
}
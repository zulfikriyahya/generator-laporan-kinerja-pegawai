// ============================================================================
// GENERATOR LAPORAN KINERJA PEGAWAI - EXCEL SERVICE (ENHANCED)
// Version: 1.0.0
// ============================================================================

import * as XLSX from "xlsx";
import { reportStore } from "../stores/reportStore";
import type { AppStore, ImportExcelResult, ValidationError } from "../types/ReportTypes";

// ============================================================================
// TEMPLATE CONFIGURATION
// ============================================================================

/**
 * Template headers untuk Excel import/export
 */
const TEMPLATE_HEADERS = {
	// Sheet 1: Data Pegawai
	pegawai: [
		"Nama Lengkap",
		"NIP",
		"NUPTK",
		"NIK",
		"Jenis Pegawai",
		"Status",
		"Golongan",
		"Jabatan",
		"Unit Kerja",
		"Tempat Lahir",
		"Tanggal Lahir",
		"Jenis Kelamin",
		"Alamat",
		"No. HP",
		"Email",
		"Pendidikan Terakhir",
		"Masa Kerja (Tahun)",
		"Masa Kerja (Bulan)",
	],
	
	// Sheet 2: Data Akademik (Khusus Guru)
	akademik: [
		"Kurikulum",
		"Tahun Pelajaran",
		"Semester",
		"Mata Pelajaran",
		"Kelas",
		"Jam Mengajar/Minggu",
		"Jumlah Siswa",
		"Ekstrakurikuler",
	],
	
	// Sheet 3: Data Kinerja
	kinerja: [
		"Tugas Pokok",
		"Tugas Tambahan",
		"Target Tahunan (IKU)",
		"Target Kuantitatif",
		"Target Kualitatif",
		"Hambatan",
		"Solusi",
	],
	
	// Sheet 4: Data Instansi
	instansi: [
		"Header 1",
		"Header 2",
		"Header 3",
		"Alamat",
		"Telepon",
		"Email",
		"Website",
		"Titimangsa",
		"Nama Kepala",
		"NIP Kepala",
		"Pangkat Kepala",
	],
};

/**
 * Sample data untuk template
 */
const SAMPLE_DATA = {
	pegawai: [
		{
			"Nama Lengkap": "Ahmad Dahlan, S.Pd",
			NIP: "198501012010011001",
			NUPTK: "1234567890123456",
			NIK: "3601010101900001",
			"Jenis Pegawai": "PNS",
			Status: "Aktif",
			Golongan: "III/b",
			Jabatan: "Guru Ahli Pertama",
			"Unit Kerja": "MTsN 1 Pandeglang",
			"Tempat Lahir": "Pandeglang",
			"Tanggal Lahir": "1990-01-01",
			"Jenis Kelamin": "L",
			Alamat: "Jl. Raya Labuan Km 10 Pandeglang",
			"No. HP": "081234567890",
			Email: "ahmad.dahlan@gmail.com",
			"Pendidikan Terakhir": "S1 Pendidikan Matematika",
			"Masa Kerja (Tahun)": "5",
			"Masa Kerja (Bulan)": "6",
		},
	],
	akademik: [
		{
			Kurikulum: "Kurikulum Merdeka",
			"Tahun Pelajaran": "2024/2025",
			Semester: "Ganjil",
			"Mata Pelajaran": "Matematika",
			Kelas: "VII-A, VII-B",
			"Jam Mengajar/Minggu": "24",
			"Jumlah Siswa": "64",
			Ekstrakurikuler: "Olimpiade Matematika",
		},
	],
	kinerja: [
		{
			"Tugas Pokok":
				"Merencanakan dan melaksanakan pembelajaran, mengevaluasi hasil belajar, membimbing siswa",
			"Tugas Tambahan": "Wali Kelas VII-A, Pembina Ekstrakurikuler",
			"Target Tahunan (IKU)":
				"Meningkatkan nilai rata-rata kelas di atas KKM (75)",
			"Target Kuantitatif": "Minimal 85% siswa tuntas belajar",
			"Target Kualitatif": "Peningkatan keterampilan berpikir kritis siswa",
			Hambatan: "Keterbatasan media pembelajaran digital",
			Solusi: "Memanfaatkan media pembelajaran berbasis teknologi sederhana",
		},
	],
	instansi: [
		{
			"Header 1": "KEMENTERIAN AGAMA REPUBLIK INDONESIA",
			"Header 2": "KANTOR KABUPATEN PANDEGLANG",
			"Header 3": "MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG",
			Alamat: "Jl. Raya Labuan Km. 5,7 Pandeglang - Banten 42253",
			Telepon: "(0253) 201000",
			Email: "mtsn1pandeglang@kemenag.go.id",
			Website: "mtsn1pandeglang.sch.id",
			Titimangsa: "Pandeglang",
			"Nama Kepala": "Dr. H. Fulan bin Fulan, M.Pd",
			"NIP Kepala": "196501011990031001",
			"Pangkat Kepala": "Pembina/IV-a",
		},
	],
};

// ============================================================================
// TEMPLATE GENERATION
// ============================================================================

/**
 * Download template Excel dengan multiple sheets
 */
export const downloadTemplate = (): void => {
	const workbook = XLSX.utils.book_new();
	
	// Sheet 1: Data Pegawai
	const wsPegawai = XLSX.utils.json_to_sheet(SAMPLE_DATA.pegawai, {
		header: TEMPLATE_HEADERS.pegawai,
	});
	applySheetStyling(wsPegawai, TEMPLATE_HEADERS.pegawai);
	XLSX.utils.book_append_sheet(workbook, wsPegawai, "Data Pegawai");
	
	// Sheet 2: Data Akademik
	const wsAkademik = XLSX.utils.json_to_sheet(SAMPLE_DATA.akademik, {
		header: TEMPLATE_HEADERS.akademik,
	});
	applySheetStyling(wsAkademik, TEMPLATE_HEADERS.akademik);
	XLSX.utils.book_append_sheet(workbook, wsAkademik, "Data Akademik");
	
	// Sheet 3: Data Kinerja
	const wsKinerja = XLSX.utils.json_to_sheet(SAMPLE_DATA.kinerja, {
		header: TEMPLATE_HEADERS.kinerja,
	});
	applySheetStyling(wsKinerja, TEMPLATE_HEADERS.kinerja);
	XLSX.utils.book_append_sheet(workbook, wsKinerja, "Data Kinerja");
	
	// Sheet 4: Data Instansi
	const wsInstansi = XLSX.utils.json_to_sheet(SAMPLE_DATA.instansi, {
		header: TEMPLATE_HEADERS.instansi,
	});
	applySheetStyling(wsInstansi, TEMPLATE_HEADERS.instansi);
	XLSX.utils.book_append_sheet(workbook, wsInstansi, "Data Instansi");
	
	// Sheet 5: Petunjuk
	const wsPetunjuk = createInstructionSheet();
	XLSX.utils.book_append_sheet(workbook, wsPetunjuk, "Petunjuk");
	
	// Download
	const filename = `Template_Ekinerja_${new Date().getTime()}.xlsx`;
	XLSX.writeFile(workbook, filename);
};

/**
 * Apply styling to worksheet
 */
const applySheetStyling = (worksheet: XLSX.WorkSheet, headers: string[]): void => {
	// Set column widths
	const colWidths = headers.map((header) => ({
		wch: Math.max(header.length + 5, 15),
	}));
	worksheet["!cols"] = colWidths;
	
	// Freeze first row (header)
	worksheet["!freeze"] = { xSplit: 0, ySplit: 1, topLeft: "A2" };
};

/**
 * Create instruction sheet
 */
const createInstructionSheet = (): XLSX.WorkSheet => {
	const instructions = [
		["PETUNJUK PENGGUNAAN TEMPLATE IMPORT DATA E-KINERJA"],
		[""],
		["1. CARA MENGISI:"],
		["   - Isi data pada setiap sheet sesuai dengan petunjuk"],
		["   - Jangan mengubah nama kolom/header"],
		["   - Pastikan format data sesuai (contoh: tanggal, angka)"],
		["   - Gunakan format tanggal: YYYY-MM-DD (contoh: 1990-01-01)"],
		[""],
		["2. SHEET YANG TERSEDIA:"],
		["   - Data Pegawai: Informasi identitas pegawai (WAJIB)"],
		["   - Data Akademik: Khusus untuk Jabatan Guru/GTT"],
		["   - Data Kinerja: Tugas dan target kinerja"],
		["   - Data Instansi: Informasi instansi/sekolah"],
		[""],
		["3. FIELD WAJIB DIISI:"],
		["   - Nama Lengkap"],
		["   - NIP"],
		["   - Jabatan"],
		["   - Unit Kerja"],
		[""],
		["4. VALIDASI DATA:"],
		["   - NIP: 18 digit"],
		["   - NUPTK: 16 digit (untuk guru)"],
		["   - NIK: 16 digit"],
		["   - Email: format valid (contoh@email.com)"],
		["   - No. HP: 10-13 digit"],
		[""],
		["5. JENIS PEGAWAI:"],
		["   - PNS, PPPK, Honorer, GTT, PTT, Guru"],
		[""],
		["6. LANGKAH IMPORT:"],
		["   - Isi semua data yang diperlukan"],
		["   - Simpan file Excel"],
		["   - Klik tombol 'Import' di aplikasi"],
		["   - Pilih file Excel yang sudah diisi"],
		["   - Data akan otomatis terisi di form"],
		[""],
		["7. CATATAN PENTING:"],
		["   - Backup data lama sebelum import"],
		["   - Periksa data setelah import"],
		["   - Simpan draft setelah import berhasil"],
		[""],
		["Versi Template: 1.0.0"],
		["Tanggal: " + new Date().toLocaleDateString("id-ID")],
	];
	
	return XLSX.utils.aoa_to_sheet(instructions);
};

// ============================================================================
// IMPORT FUNCTIONALITY
// ============================================================================

/**
 * Import data dari Excel file
 */
export const importFromExcel = async (file: File): Promise<ImportExcelResult> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		
		reader.onload = async (e) => {
			try {
				const data = new Uint8Array(e.target?.result as ArrayBuffer);
				const workbook = XLSX.read(data, { type: "array" });
				
				// Validate workbook
				const validation = validateWorkbook(workbook);
				if (!validation.valid) {
					resolve({
						success: false,
						errors: validation.errors,
					});
					return;
				}
				
				// Parse data from sheets
				const parsedData = parseWorkbookData(workbook);
				
				// Validate parsed data
				const dataValidation = validateImportedData(parsedData);
				if (!dataValidation.valid) {
					resolve({
						success: false,
						errors: dataValidation.errors,
					});
					return;
				}
				
				// Apply to store
				const current = reportStore.get();
				const merged = mergeImportedData(current, parsedData);
				reportStore.set(merged);
				
				resolve({
					success: true,
					data: merged,
				});
			} catch (error: any) {
				reject(new Error("Gagal membaca file Excel: " + error.message));
			}
		};
		
		reader.onerror = () => {
			reject(new Error("Gagal membaca file"));
		};
		
		reader.readAsArrayBuffer(file);
	});
};

/**
 * Validate workbook structure
 */
const validateWorkbook = (
	workbook: XLSX.WorkBook,
): { valid: boolean; errors: ValidationError[] } => {
	const errors: ValidationError[] = [];
	
	// Check required sheets
	const requiredSheets = ["Data Pegawai"];
	const sheetNames = workbook.SheetNames;
	
	for (const required of requiredSheets) {
		if (!sheetNames.includes(required)) {
			errors.push({
				field: "sheet",
				message: `Sheet "${required}" tidak ditemukan`,
			});
		}
	}
	
	return {
		valid: errors.length === 0,
		errors,
	};
};

/**
 * Parse data from workbook
 */
const parseWorkbookData = (workbook: XLSX.WorkBook): Partial<AppStore> => {
	const result: Partial<AppStore> = {};
	
	// Parse Data Pegawai
	if (workbook.Sheets["Data Pegawai"]) {
		const pegawaiData = XLSX.utils.sheet_to_json(workbook.Sheets["Data Pegawai"]);
		if (pegawaiData.length > 0) {
			result.pegawai = parsePegawaiData(pegawaiData[0] as any);
		}
	}
	
	// Parse Data Akademik
	if (workbook.Sheets["Data Akademik"]) {
		const akademikData = XLSX.utils.sheet_to_json(workbook.Sheets["Data Akademik"]);
		if (akademikData.length > 0) {
			result.akademik = parseAkademikData(akademikData[0] as any);
		}
	}
	
	// Parse Data Kinerja
	if (workbook.Sheets["Data Kinerja"]) {
		const kinerjaData = XLSX.utils.sheet_to_json(workbook.Sheets["Data Kinerja"]);
		if (kinerjaData.length > 0) {
			result.kinerja = parseKinerjaData(kinerjaData[0] as any);
		}
	}
	
	// Parse Data Instansi
	if (workbook.Sheets["Data Instansi"]) {
		const instansiData = XLSX.utils.sheet_to_json(workbook.Sheets["Data Instansi"]);
		if (instansiData.length > 0) {
			result.instansi = parseInstansiData(instansiData[0] as any);
		}
	}
	
	return result;
};

/**
 * Parse pegawai data
 */
const parsePegawaiData = (row: any): any => {
	return {
		nama: row["Nama Lengkap"] || "",
		nip: String(row["NIP"] || ""),
		nuptk: String(row["NUPTK"] || ""),
		nik: String(row["NIK"] || ""),
		jenis: row["Jenis Pegawai"] || "PNS",
		status: row["Status"] || "Aktif",
		golongan: row["Golongan"] || "",
		jabatan: row["Jabatan"] || "",
		unitKerja: row["Unit Kerja"] || "",
		tempatLahir: row["Tempat Lahir"] || "",
		tanggalLahir: row["Tanggal Lahir"] || "",
		gender: row["Jenis Kelamin"] || "L",
		alamat: row["Alamat"] || "",
		hp: String(row["No. HP"] || ""),
		email: row["Email"] || "",
		fotoPegawai: "",
		pendidikan: row["Pendidikan Terakhir"] || "",
		masaKerjaTahun: String(row["Masa Kerja (Tahun)"] || "0"),
		masaKerjaBulan: String(row["Masa Kerja (Bulan)"] || "0"),
	};
};

/**
 * Parse akademik data
 */
const parseAkademikData = (row: any): any => {
	return {
		kurikulum: row["Kurikulum"] || "Kurikulum Merdeka",
		tahunPelajaran: row["Tahun Pelajaran"] || "",
		semester: row["Semester"] || "Ganjil",
		mapel: row["Mata Pelajaran"] || "",
		kelas: row["Kelas"] || "",
		jamMengajar: String(row["Jam Mengajar/Minggu"] || "24"),
		jumlahSiswa: String(row["Jumlah Siswa"] || "32"),
		ekskul: row["Ekstrakurikuler"] || "",
	};
};

/**
 * Parse kinerja data
 */
const parseKinerjaData = (row: any): any => {
	return {
		tugasPokok: row["Tugas Pokok"] || "",
		tugasTambahan: row["Tugas Tambahan"] || "",
		targetTahunan: row["Target Tahunan (IKU)"] || "",
		targetKuantitatif: row["Target Kuantitatif"] || "",
		targetKualitatif: row["Target Kualitatif"] || "",
		hambatan: row["Hambatan"] || "",
		solusi: row["Solusi"] || "",
	};
};

/**
 * Parse instansi data
 */
const parseInstansiData = (row: any): any => {
	return {
		logoUtama: "",
		logoInstitusi: "",
		logoInstansi: "",
		header1: row["Header 1"] || "",
		header2: row["Header 2"] || "",
		header3: row["Header 3"] || "",
		alamat: row["Alamat"] || "",
		telepon: row["Telepon"] || "",
		email: row["Email"] || "",
		website: row["Website"] || "",
		titimangsa: row["Titimangsa"] || "",
		kepala: {
			nama: row["Nama Kepala"] || "",
			nip: row["NIP Kepala"] || "",
			pangkat: row["Pangkat Kepala"] || "",
			ttd: "",
		},
		kepalaTu: {
			nama: "",
			nip: "",
			pangkat: "",
			ttd: "",
		},
	};
};

/**
 * Validate imported data
 */
const validateImportedData = (
	data: Partial<AppStore>,
): { valid: boolean; errors: ValidationError[] } => {
	const errors: ValidationError[] = [];
	
	// Validate pegawai
	if (data.pegawai) {
		if (!data.pegawai.nama) {
			errors.push({ field: "pegawai.nama", message: "Nama harus diisi" });
		}
		if (!data.pegawai.nip) {
			errors.push({ field: "pegawai.nip", message: "NIP harus diisi" });
		}
		if (data.pegawai.nip && data.pegawai.nip.replace(/\D/g, "").length !== 18) {
			errors.push({ field: "pegawai.nip", message: "NIP harus 18 digit" });
		}
	}
	
	return {
		valid: errors.length === 0,
		errors,
	};
};

/**
 * Merge imported data with existing store
 */
const mergeImportedData = (
	current: AppStore,
	imported: Partial<AppStore>,
): AppStore => {
	return {
		...current,
		...(imported.instansi && { instansi: { ...current.instansi, ...imported.instansi } }),
		...(imported.pegawai && { pegawai: { ...current.pegawai, ...imported.pegawai } }),
		...(imported.akademik && { akademik: { ...current.akademik, ...imported.akademik } }),
		...(imported.kinerja && { kinerja: { ...current.kinerja, ...imported.kinerja } }),
	};
};

// ============================================================================
// EXPORT FUNCTIONALITY
// ============================================================================

/**
 * Export current data to Excel
 */
export const exportToExcel = (): void => {
	const store = reportStore.get();
	const workbook = XLSX.utils.book_new();
	
	// Create sheets from current data
	const pegawaiSheet = XLSX.utils.json_to_sheet([{
		"Nama Lengkap": store.pegawai.nama,
		"NIP": store.pegawai.nip,
		"NUPTK": store.pegawai.nuptk,
		"NIK": store.pegawai.nik,
		"Jenis Pegawai": store.pegawai.jenis,
		"Status": store.pegawai.status,
		"Golongan": store.pegawai.golongan,
		"Jabatan": store.pegawai.jabatan,
		"Unit Kerja": store.pegawai.unitKerja,
		"Tempat Lahir": store.pegawai.tempatLahir,
		"Tanggal Lahir": store.pegawai.tanggalLahir,
		"Jenis Kelamin": store.pegawai.gender,
		"Alamat": store.pegawai.alamat,
		"No. HP": store.pegawai.hp,
		"Email": store.pegawai.email,
		"Pendidikan Terakhir": store.pegawai.pendidikan,
		"Masa Kerja (Tahun)": store.pegawai.masaKerjaTahun,
		"Masa Kerja (Bulan)": store.pegawai.masaKerjaBulan,
	}]);
	
	XLSX.utils.book_append_sheet(workbook, pegawaiSheet, "Data Pegawai");
	
	// Download
	const filename = `Backup_Ekinerja_${store.pegawai.nama}_${new Date().getTime()}.xlsx`;
	XLSX.writeFile(workbook, filename);
};

// ============================================================================
// BULK IMPORT (Future Feature)
// ============================================================================

/**
 * Import multiple pegawai data (untuk admin)
 */
export const importBulkData = async (
	file: File,
): Promise<{ success: boolean; imported: number; errors: ValidationError[] }> => {
	// Placeholder untuk future implementation
	// This will allow importing multiple pegawai at once
	return {
		success: false,
		imported: 0,
		errors: [{ field: "general", message: "Fitur ini akan tersedia di versi mendatang" }],
	};
};
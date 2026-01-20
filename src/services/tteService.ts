// ============================================================================
// GENERATOR LAPORAN KINERJA PEGAWAI - QR CODE & TTE SERVICE
// Version: 1.0.0
// ============================================================================

import QRCode from "qrcode";
import type { TTEData, AppStore } from "../types/ReportTypes";
import { generateHash } from "../utils/helpers";

// ============================================================================
// TTE (TANDA TANGAN ELEKTRONIK) SERVICE
// ============================================================================

/**
 * Generate TTE Data lengkap dengan QR Code
 */
export const generateTTE = async (store: AppStore): Promise<TTEData> => {
	const nomorDokumen = generateNomorDokumen(store);
	const timestamp = new Date().toISOString();
	
	// Generate hash dari content dokumen
	const contentHash = await generateDocumentHash(store);
	
	// Generate QR Code dengan metadata TTE
	const qrData = generateQRData({
		nomorDokumen,
		timestamp,
		hash: contentHash,
		pegawai: store.pegawai.nama,
		nip: store.pegawai.nip,
		periode: `${store.config.bulan}/${store.config.tahun}`,
	});
	
	const qrCode = await generateQRCodeImage(qrData);
	
	return {
		qrCode,
		nomorDokumen,
		hashDokumen: contentHash,
		timestamp,
		statusValidasi: "Valid",
	};
};

/**
 * Generate nomor dokumen sesuai format
 */
export const generateNomorDokumen = (store: AppStore): string => {
	const tahun = store.config.tahun;
	const bulan = store.config.bulan.padStart(2, "0");
	
	// Format: NNN/LPKP/MM/YYYY
	// NNN = nomor urut (3 digit)
	// LPKP = Laporan Kinerja Pegawai
	// MM = bulan
	// YYYY = tahun
	
	const nomorUrut = generateNomorUrut();
	return `${nomorUrut}/LPKP/${bulan}/${tahun}`;
};

/**
 * Generate nomor urut untuk dokumen
 */
const generateNomorUrut = (): string => {
	// Ambil dari localStorage untuk konsistensi
	const key = "ekinerja-last-doc-number";
	const lastNumber = parseInt(localStorage.getItem(key) || "0", 10);
	const newNumber = lastNumber + 1;
	
	// Simpan nomor baru
	localStorage.setItem(key, newNumber.toString());
	
	// Format 3 digit: 001, 002, dst
	return newNumber.toString().padStart(3, "0");
};

/**
 * Reset nomor urut (untuk awal tahun baru)
 */
export const resetNomorUrut = (): void => {
	localStorage.setItem("ekinerja-last-doc-number", "0");
};

/**
 * Generate hash dari content dokumen
 */
export const generateDocumentHash = async (store: AppStore): Promise<string> => {
	// Combine semua data penting untuk hash
	const dataToHash = JSON.stringify({
		pegawai: {
			nama: store.pegawai.nama,
			nip: store.pegawai.nip,
		},
		periode: {
			bulan: store.config.bulan,
			tahun: store.config.tahun,
		},
		content: store.output.content,
		timestamp: new Date().toISOString(),
	});
	
	return await generateHash(dataToHash);
};

/**
 * Generate QR Data dengan format terstruktur
 */
const generateQRData = (data: {
	nomorDokumen: string;
	timestamp: string;
	hash: string;
	pegawai: string;
	nip: string;
	periode: string;
}): string => {
	// Format QR Code data sebagai JSON
	const qrData = {
		type: "LAPORAN_KINERJA_PEGAWAI",
		doc_number: data.nomorDokumen,
		timestamp: data.timestamp,
		hash: data.hash,
		pegawai: {
			nama: data.pegawai,
			nip: data.nip,
		},
		periode: data.periode,
		verification_url: `${window.location.origin}/verify/${data.hash}`,
	};
	
	return JSON.stringify(qrData);
};

/**
 * Generate QR Code image sebagai base64
 */
export const generateQRCodeImage = async (
	data: string,
	options?: {
		size?: number;
		margin?: number;
		color?: { dark?: string; light?: string };
	},
): Promise<string> => {
	try {
		const qrOptions = {
			errorCorrectionLevel: "H" as const,
			type: "image/png" as const,
			width: options?.size || 200,
			margin: options?.margin || 2,
			color: {
				dark: options?.color?.dark || "#000000",
				light: options?.color?.light || "#FFFFFF",
			},
		};
		
		return await QRCode.toDataURL(data, qrOptions);
	} catch (error) {
		console.error("QR Code generation failed:", error);
		throw new Error("Gagal generate QR Code");
	}
};

/**
 * Verify TTE dari QR Code data
 */
export const verifyTTE = async (
	qrData: string,
	documentContent: string,
): Promise<{
	valid: boolean;
	message: string;
	data?: any;
}> => {
	try {
		const data = JSON.parse(qrData);
		
		// Verify hash
		const currentHash = await generateHash(documentContent);
		
		if (data.hash !== currentHash) {
			return {
				valid: false,
				message: "Dokumen telah dimodifikasi. Hash tidak cocok.",
			};
		}
		
		// Verify timestamp (tidak lebih dari 1 tahun)
		const docDate = new Date(data.timestamp);
		const now = new Date();
		const daysDiff = Math.floor(
			(now.getTime() - docDate.getTime()) / (1000 * 60 * 60 * 24),
		);
		
		if (daysDiff > 365) {
			return {
				valid: false,
				message: "Dokumen sudah lebih dari 1 tahun.",
				data,
			};
		}
		
		return {
			valid: true,
			message: "Dokumen valid dan belum dimodifikasi.",
			data,
		};
	} catch (error) {
		return {
			valid: false,
			message: "Format QR Code tidak valid.",
		};
	}
};

// ============================================================================
// DIGITAL SIGNATURE UTILITIES
// ============================================================================

/**
 * Generate metadata untuk digital signature
 */
export const generateSignatureMetadata = (store: AppStore): string => {
	const metadata = {
		document_type: "LAPORAN_KINERJA_PEGAWAI",
		pegawai: {
			nama: store.pegawai.nama,
			nip: store.pegawai.nip,
			jabatan: store.pegawai.jabatan,
		},
		pejabat_penilai: {
			nama: store.instansi.kepala.nama,
			nip: store.instansi.kepala.nip,
			pangkat: store.instansi.kepala.pangkat,
		},
		periode: {
			bulan: store.config.bulan,
			tahun: store.config.tahun,
		},
		instansi: {
			nama: store.instansi.header3,
			wilayah: store.instansi.header2,
		},
		timestamp: new Date().toISOString(),
	};
	
	return JSON.stringify(metadata, null, 2);
};

/**
 * Create signature block untuk PDF/DOCX
 */
export const createSignatureBlock = (
	tte: TTEData,
	pejabat: { nama: string; nip: string; pangkat: string },
): string => {
	const date = new Date(tte.timestamp);
	const formattedDate = date.toLocaleDateString("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
	
	return `
DOKUMEN INI TELAH DITANDATANGANI SECARA ELEKTRONIK

Nomor Dokumen: ${tte.nomorDokumen}
Tanggal: ${formattedDate}
Hash Dokumen: ${tte.hashDokumen.substring(0, 16)}...
Status: ${tte.statusValidasi}

Ditandatangani oleh:
${pejabat.nama}
NIP. ${pejabat.nip}
${pejabat.pangkat}

Scan QR Code untuk verifikasi
`.trim();
};

/**
 * Generate verification URL
 */
export const generateVerificationURL = (hash: string): string => {
	const baseURL = window.location.origin;
	return `${baseURL}/verify/${hash}`;
};

/**
 * Shorten hash for display
 */
export const shortenHash = (hash: string, length: number = 8): string => {
	if (hash.length <= length * 2) return hash;
	return `${hash.substring(0, length)}...${hash.substring(hash.length - length)}`;
};

// ============================================================================
// EXPORT UTILITIES FOR TTE
// ============================================================================

/**
 * Export TTE data sebagai JSON
 */
export const exportTTEData = (tte: TTEData): void => {
	const data = {
		...tte,
		exported_at: new Date().toISOString(),
		version: "1.0.0",
	};
	
	const blob = new Blob([JSON.stringify(data, null, 2)], {
		type: "application/json",
	});
	
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = `TTE_${tte.nomorDokumen.replace(/\//g, "_")}.json`;
	link.click();
	URL.revokeObjectURL(url);
};

/**
 * Import TTE data dari JSON
 */
export const importTTEData = async (file: File): Promise<TTEData | null> => {
	try {
		const text = await file.text();
		const data = JSON.parse(text);
		
		// Validate TTE data structure
		if (
			!data.qrCode ||
			!data.nomorDokumen ||
			!data.hashDokumen ||
			!data.timestamp
		) {
			throw new Error("Invalid TTE data structure");
		}
		
		return data as TTEData;
	} catch (error) {
		console.error("Import TTE data failed:", error);
		return null;
	}
};

// ============================================================================
// WATERMARK UTILITIES
// ============================================================================

/**
 * Generate watermark text untuk dokumen
 */
export const generateWatermark = (store: AppStore): string => {
	return `${store.instansi.header3} - ${store.config.tahun}`;
};

/**
 * Add watermark to canvas/image
 */
export const addWatermarkToCanvas = (
	canvas: HTMLCanvasElement,
	text: string,
): void => {
	const ctx = canvas.getContext("2d");
	if (!ctx) return;
	
	ctx.save();
	ctx.globalAlpha = 0.1;
	ctx.font = "30px Arial";
	ctx.fillStyle = "#000000";
	ctx.textAlign = "center";
	ctx.rotate(-45 * (Math.PI / 180));
	
	const x = canvas.width / 2;
	const y = canvas.height / 2;
	
	ctx.fillText(text, x, y);
	ctx.restore();
};

// ============================================================================
// AUDIT TRAIL
// ============================================================================

/**
 * Log TTE generation untuk audit
 */
export const logTTEGeneration = (
	tte: TTEData,
	pegawai: { nama: string; nip: string },
): void => {
	const auditLog = {
		action: "TTE_GENERATED",
		timestamp: new Date().toISOString(),
		document: tte.nomorDokumen,
		hash: tte.hashDokumen,
		pegawai: pegawai.nama,
		nip: pegawai.nip,
		user_agent: navigator.userAgent,
		ip_info: "client-side", // In production, get from backend
	};
	
	// Save to localStorage for local audit
	const logs = JSON.parse(localStorage.getItem("ekinerja-audit-logs") || "[]");
	logs.push(auditLog);
	
	// Keep only last 100 logs
	if (logs.length > 100) {
		logs.shift();
	}
	
	localStorage.setItem("ekinerja-audit-logs", JSON.stringify(logs));
	
	// In production: Send to backend
	// await fetch('/api/audit-log', { method: 'POST', body: JSON.stringify(auditLog) });
};

/**
 * Get audit logs
 */
export const getAuditLogs = (): any[] => {
	return JSON.parse(localStorage.getItem("ekinerja-audit-logs") || "[]");
};

/**
 * Clear audit logs
 */
export const clearAuditLogs = (): void => {
	localStorage.removeItem("ekinerja-audit-logs");
};
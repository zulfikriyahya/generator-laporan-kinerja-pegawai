// ============================================================================
// GENERATOR LAPORAN KINERJA PEGAWAI - UTILITY FUNCTIONS
// Version: 1.0.0
// ============================================================================

import { marked } from "marked";
import DOMPurify from "dompurify";

// ============================================================================
// MARKDOWN PROCESSING
// ============================================================================

/**
 * Parse Markdown to HTML with sanitization
 */
export const parseMarkdown = async (text: string): Promise<string> => {
	if (!text) return "";

	// Configure marked for better table support
	marked.setOptions({
		gfm: true, // GitHub Flavored Markdown
		breaks: true, // Convert \n to <br>
		headerIds: true,
		mangle: false,
	});

	// Custom renderer for better table styling
	const renderer = new marked.Renderer();
	
	// Table renderer dengan class custom
	renderer.table = (header: string, body: string) => {
		return `<table class="report-table">
			<thead>${header}</thead>
			<tbody>${body}</tbody>
		</table>`;
	};

	// Heading renderer dengan ID untuk navigation
	renderer.heading = (text: string, level: number) => {
		const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
		return `<h${level} id="${escapedText}" class="heading-${level}">${text}</h${level}>`;
	};

	marked.use({ renderer });

	const html = await marked.parse(text);
	return DOMPurify.sanitize(html, {
		ALLOWED_TAGS: [
			"h1", "h2", "h3", "h4", "h5", "h6",
			"p", "br", "strong", "em", "u", "s",
			"ul", "ol", "li",
			"table", "thead", "tbody", "tr", "th", "td",
			"blockquote", "code", "pre",
			"a", "img",
			"div", "span",
		],
		ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "id"],
	});
};

// ============================================================================
// DATE FORMATTING
// ============================================================================

/**
 * Format tanggal ke format Indonesia
 */
export const formatDateIndonesia = (date: Date | string): string => {
	const d = typeof date === "string" ? new Date(date) : date;
	
	return d.toLocaleDateString("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
};

/**
 * Get nama bulan Indonesia
 */
export const getBulanIndonesia = (month: number): string => {
	const bulan = [
		"Januari", "Februari", "Maret", "April", "Mei", "Juni",
		"Juli", "Agustus", "September", "Oktober", "November", "Desember",
	];
	return bulan[month - 1] || "";
};

/**
 * Get nama hari Indonesia
 */
export const getHariIndonesia = (day: number): string => {
	const hari = [
		"Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu",
	];
	return hari[day] || "";
};

/**
 * Format tanggal untuk filename (YYYYMMDD)
 */
export const formatDateForFilename = (date: Date = new Date()): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}${month}${day}`;
};

// ============================================================================
// STRING UTILITIES
// ============================================================================

/**
 * Capitalize first letter
 */
export const capitalize = (str: string): string => {
	if (!str) return "";
	return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Title case conversion
 */
export const toTitleCase = (str: string): string => {
	return str
		.toLowerCase()
		.split(" ")
		.map((word) => capitalize(word))
		.join(" ");
};

/**
 * Sanitize filename - remove invalid characters
 */
export const sanitizeFilename = (name: string): string => {
	return name
		.replace(/[^a-zA-Z0-9_\-\s]/g, "_")
		.replace(/\s+/g, "_")
		.replace(/_+/g, "_")
		.substring(0, 100);
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (str: string, maxLength: number = 50): string => {
	if (!str || str.length <= maxLength) return str;
	return str.substring(0, maxLength - 3) + "...";
};

/**
 * Remove HTML tags
 */
export const stripHtml = (html: string): string => {
	const tmp = document.createElement("DIV");
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText || "";
};

// ============================================================================
// NUMBER UTILITIES
// ============================================================================

/**
 * Format number to Indonesian locale
 */
export const formatNumber = (num: number): string => {
	return new Intl.NumberFormat("id-ID").format(num);
};

/**
 * Format currency (Rupiah)
 */
export const formatRupiah = (amount: number): string => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(amount);
};

/**
 * Parse Indonesian number format to number
 */
export const parseIndonesianNumber = (str: string): number => {
	const cleaned = str.replace(/\./g, "").replace(/,/g, ".");
	return parseFloat(cleaned) || 0;
};

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validate NIP (18 digit)
 */
export const isValidNIP = (nip: string): boolean => {
	const cleaned = nip.replace(/\D/g, "");
	return cleaned.length === 18;
};

/**
 * Validate NUPTK (16 digit)
 */
export const isValidNUPTK = (nuptk: string): boolean => {
	const cleaned = nuptk.replace(/\D/g, "");
	return cleaned.length === 16;
};

/**
 * Validate NIK (16 digit)
 */
export const isValidNIK = (nik: string): boolean => {
	const cleaned = nik.replace(/\D/g, "");
	return cleaned.length === 16;
};

/**
 * Validate email
 */
export const isValidEmail = (email: string): boolean => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
};

/**
 * Validate phone number (Indonesia)
 */
export const isValidPhone = (phone: string): boolean => {
	const cleaned = phone.replace(/\D/g, "");
	return cleaned.length >= 10 && cleaned.length <= 13;
};

// ============================================================================
// FILE UTILITIES
// ============================================================================

/**
 * Get file extension
 */
export const getFileExtension = (filename: string): string => {
	return filename.split(".").pop()?.toLowerCase() || "";
};

/**
 * Check if file is image
 */
export const isImageFile = (filename: string): boolean => {
	const ext = getFileExtension(filename);
	return ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext);
};

/**
 * Check if file is document
 */
export const isDocumentFile = (filename: string): boolean => {
	const ext = getFileExtension(filename);
	return ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(ext);
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
};

/**
 * Read file as base64
 */
export const readFileAsBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
};

/**
 * Read file as text
 */
export const readFileAsText = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsText(file);
	});
};

// ============================================================================
// CRYPTO UTILITIES
// ============================================================================

/**
 * Generate SHA-256 hash
 */
export const generateHash = async (text: string): Promise<string> => {
	const encoder = new TextEncoder();
	const data = encoder.encode(text);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

/**
 * Generate random ID
 */
export const generateId = (prefix: string = ""): string => {
	const timestamp = Date.now();
	const random = Math.random().toString(36).substring(2, 9);
	return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
};

/**
 * Generate UUID v4
 */
export const generateUUID = (): string => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

// ============================================================================
// QR CODE UTILITIES
// ============================================================================

/**
 * Generate QR Code as base64
 */
export const generateQRCode = async (text: string): Promise<string> => {
	try {
		const QRCode = (await import("qrcode")).default;
		return await QRCode.toDataURL(text, {
			errorCorrectionLevel: "H",
			type: "image/png",
			width: 200,
			margin: 1,
		});
	} catch (error) {
		console.error("QR Code generation failed:", error);
		return "";
	}
};

// ============================================================================
// CLIPBOARD UTILITIES
// ============================================================================

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (error) {
		console.error("Copy to clipboard failed:", error);
		return false;
	}
};

/**
 * Read from clipboard
 */
export const readFromClipboard = async (): Promise<string> => {
	try {
		return await navigator.clipboard.readText();
	} catch (error) {
		console.error("Read from clipboard failed:", error);
		return "";
	}
};

// ============================================================================
// DOWNLOAD UTILITIES
// ============================================================================

/**
 * Download blob as file
 */
export const downloadBlob = (blob: Blob, filename: string): void => {
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
};

/**
 * Download text as file
 */
export const downloadText = (text: string, filename: string): void => {
	const blob = new Blob([text], { type: "text/plain" });
	downloadBlob(blob, filename);
};

/**
 * Download JSON as file
 */
export const downloadJSON = (data: any, filename: string): void => {
	const text = JSON.stringify(data, null, 2);
	downloadText(text, filename);
};

// ============================================================================
// DEBOUNCE & THROTTLE
// ============================================================================

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
	func: T,
	wait: number,
): ((...args: Parameters<T>) => void) => {
	let timeout: ReturnType<typeof setTimeout>;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
};

/**
 * Throttle function
 */
export const throttle = <T extends (...args: any[]) => any>(
	func: T,
	limit: number,
): ((...args: Parameters<T>) => void) => {
	let inThrottle: boolean;
	return (...args: Parameters<T>) => {
		if (!inThrottle) {
			func(...args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
};

// ============================================================================
// LOCAL STORAGE UTILITIES
// ============================================================================

/**
 * Safe localStorage setItem
 */
export const setLocalStorage = (key: string, value: any): boolean => {
	try {
		localStorage.setItem(key, JSON.stringify(value));
		return true;
	} catch (error) {
		console.error("localStorage setItem failed:", error);
		return false;
	}
};

/**
 * Safe localStorage getItem
 */
export const getLocalStorage = <T = any>(key: string, defaultValue?: T): T | null => {
	try {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : defaultValue || null;
	} catch (error) {
		console.error("localStorage getItem failed:", error);
		return defaultValue || null;
	}
};

/**
 * Clear localStorage with prefix
 */
export const clearLocalStoragePrefix = (prefix: string): void => {
	const keys = Object.keys(localStorage);
	keys.forEach((key) => {
		if (key.startsWith(prefix)) {
			localStorage.removeItem(key);
		}
	});
};

// ============================================================================
// BROWSER DETECTION
// ============================================================================

/**
 * Check if mobile device
 */
export const isMobile = (): boolean => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent,
	);
};

/**
 * Check if iOS device
 */
export const isIOS = (): boolean => {
	return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

/**
 * Check if Android device
 */
export const isAndroid = (): boolean => {
	return /Android/.test(navigator.userAgent);
};

/**
 * Get browser name
 */
export const getBrowserName = (): string => {
	const userAgent = navigator.userAgent;
	if (userAgent.includes("Firefox")) return "Firefox";
	if (userAgent.includes("Chrome")) return "Chrome";
	if (userAgent.includes("Safari")) return "Safari";
	if (userAgent.includes("Edge")) return "Edge";
	return "Unknown";
};

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================

/**
 * Measure execution time
 */
export const measureTime = async <T>(
	fn: () => T | Promise<T>,
	label?: string,
): Promise<{ result: T; duration: number }> => {
	const start = performance.now();
	const result = await fn();
	const duration = performance.now() - start;
	
	if (label) {
		console.log(`${label}: ${duration.toFixed(2)}ms`);
	}
	
	return { result, duration };
};

/**
 * Sleep/delay function
 */
export const sleep = (ms: number): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

// ============================================================================
// ARRAY UTILITIES
// ============================================================================

/**
 * Remove duplicates from array
 */
export const unique = <T>(array: T[]): T[] => {
	return [...new Set(array)];
};

/**
 * Chunk array into smaller arrays
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
	const chunks: T[][] = [];
	for (let i = 0; i < array.length; i += size) {
		chunks.push(array.slice(i, i + size));
	}
	return chunks;
};

/**
 * Shuffle array
 */
export const shuffle = <T>(array: T[]): T[] => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

/**
 * Group by property
 */
export const groupBy = <T>(
	array: T[],
	key: keyof T,
): Record<string, T[]> => {
	return array.reduce((result, item) => {
		const groupKey = String(item[key]);
		if (!result[groupKey]) {
			result[groupKey] = [];
		}
		result[groupKey].push(item);
		return result;
	}, {} as Record<string, T[]>);
};
# Project Files

.
├── astro.config.mjs
├── package.json
├── public
│   ├── 192x192.png
│   ├── 512x512.png
│   └── favicon.svg
├── src
│   ├── components
│   │   ├── common
│   │   ├── forms
│   │   │   ├── FormAkademik.astro
│   │   │   ├── FormInstansi.astro
│   │   │   ├── FormKinerja.astro
│   │   │   ├── FormPegawai.astro
│   │   │   ├── KopSuratConfig.astro
│   │   │   ├── SelectGroup.astro
│   │   │   └── TabNavigation.astro
│   │   ├── HistoryPanel.astro
│   │   ├── InputGroup.astro
│   │   ├── layout
│   │   ├── reports
│   │   ├── TextAreaGroup.astro
│   │   └── ui
│   │   ├── AutoSaveIndicator.astro
│   │   ├── DocumentStats.astro
│   │   ├── KeyboardShortcuts.astro
│   │   ├── ProgressBar.astro
│   │   ├── Skeleton.astro
│   │   ├── ToastContainer.astro
│   │   └── ZoomControl.astro
│   ├── config
│   │   └── constants.ts
│   ├── layouts
│   │   └── Layout.astro
│   ├── pages
│   │   └── index.astro
│   ├── services
│   │   ├── aiService.ts
│   │   ├── excelService.ts
│   │   ├── exportService.ts
│   │   ├── pdf
│   │   ├── storage
│   │   └── tteService.ts
│   ├── stores
│   │   ├── reportStore.ts
│   │   └── toastStore.ts
│   ├── styles
│   │   └── global.css
│   ├── types
│   │   └── ReportTypes.ts
│   └── utils
│   ├── helpers.ts
│   ├── markdown.ts
│   └── validation.ts
└── tsconfig.json

19 directories, 37 files

# File Contents

## ./src/layouts/Layout.astro

```astro
---
import "../styles/global.css";
import { pwaInfo } from "virtual:pwa-info";
interface Props {
	title: string;
}
const { title } = Astro.props;
---

<!doctype html>
<html lang="id" class="dark scroll-smooth">
	<head>
		<meta charset="UTF-8" />
		<meta name="description" content="Generator Laporan Kinerja Pegawai AI" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
		/>
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<meta name="theme-color" content="#0f172a" />
		<title>{title}</title>
		{pwaInfo && <Fragment set:html={pwaInfo.webManifest.linkTag} />}
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap"
			rel="stylesheet"
		/>
	</head>
	<body
		class="bg-slate-900 text-slate-100 min-h-screen font-sans antialiased selection:bg-blue-500/30 overflow-x-hidden"
	>
		<div
			class="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900 pointer-events-none -z-10"
		>
		</div>
		<slot />
		<script>
			import { registerSW } from "virtual:pwa-register";
			registerSW({
				immediate: true,
				onNeedRefresh() {
					if (confirm("Versi baru tersedia. Refresh sekarang?")) {
						window.location.reload();
					}
				},
				onOfflineReady() {
					console.log("Aplikasi siap digunakan offline");
				},
			});
		</script>
	</body>
</html>

```

---

## ./src/utils/validation.ts

```typescript
// ============================================================================
// ENHANCED VALIDATION UTILITIES
// Version: 1.0.0
// ============================================================================

export const ValidationRules = {
	nip: {
		length: 18,
		regex: /^[0-9]{18}$/,
		validate: (value: string): boolean => {
			if (!value || value.length !== 18) return false;

			// Validate format: YYYYMMDD-GENDER-REGION-SEQUENCE
			const year = parseInt(value.substring(0, 4));
			const month = parseInt(value.substring(4, 6));
			const day = parseInt(value.substring(6, 8));

			if (year < 1900 || year > new Date().getFullYear()) return false;
			if (month < 1 || month > 12) return false;
			if (day < 1 || day > 31) return false;

			return true;
		},
		message: "NIP harus 18 digit dengan format yang valid",
	},

	nuptk: {
		length: 16,
		regex: /^[0-9]{16}$/,
		validate: (value: string): boolean => {
			return value.length === 16 && /^[0-9]{16}$/.test(value);
		},
		message: "NUPTK harus 16 digit angka",
	},

	nik: {
		length: 16,
		regex: /^[0-9]{16}$/,
		validate: (value: string): boolean => {
			if (!value || value.length !== 16) return false;

			// Validate province code
			const provinceCode = parseInt(value.substring(0, 2));
			if (provinceCode < 11 || provinceCode > 94) return false;

			// Validate date
			const day = parseInt(value.substring(6, 8));
			const month = parseInt(value.substring(8, 10));
			const year = parseInt(value.substring(10, 12));

			// Adjust day for female (add 40)
			const actualDay = day > 40 ? day - 40 : day;

			if (actualDay < 1 || actualDay > 31) return false;
			if (month < 1 || month > 12) return false;

			return true;
		},
		message: "NIK harus 16 digit dengan format yang valid",
	},

	email: {
		regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
		validate: (value: string): boolean => {
			if (!value) return true; // Email optional
			return ValidationRules.email.regex.test(value);
		},
		message: "Format email tidak valid",
	},

	phone: {
		regex: /^(\+62|62|0)[0-9]{9,12}$/,
		validate: (value: string): boolean => {
			if (!value) return true; // Phone optional
			const cleaned = value.replace(/[\s-()]/g, "");
			return ValidationRules.phone.regex.test(cleaned);
		},
		message:
			"Nomor telepon tidak valid (format: 08xxxxxxxxxx atau +628xxxxxxxxxx)",
	},

	required: {
		validate: (value: string): boolean => {
			return !!value && value.trim().length > 0;
		},
		message: "Field ini wajib diisi",
	},

	minLength: (min: number) => ({
		validate: (value: string): boolean => {
			return value.length >= min;
		},
		message: `Minimal ${min} karakter`,
	}),

	maxLength: (max: number) => ({
		validate: (value: string): boolean => {
			return value.length <= max;
		},
		message: `Maksimal ${max} karakter`,
	}),

	numeric: {
		regex: /^[0-9]+$/,
		validate: (value: string): boolean => {
			return /^[0-9]+$/.test(value);
		},
		message: "Harus berupa angka",
	},

	alphanumeric: {
		regex: /^[a-zA-Z0-9]+$/,
		validate: (value: string): boolean => {
			return /^[a-zA-Z0-9]+$/.test(value);
		},
		message: "Hanya boleh huruf dan angka",
	},
};

export type ValidationRule = keyof typeof ValidationRules;

export interface ValidationError {
	field: string;
	message: string;
}

export interface ValidationResult {
	valid: boolean;
	errors: ValidationError[];
}

export const validateField = (
	field: ValidationRule,
	value: string,
): { valid: boolean; message?: string } => {
	const rule = ValidationRules[field];

	if (!rule) {
		return { valid: true };
	}

	const isValid = rule.validate(value);

	return {
		valid: isValid,
		message: isValid ? undefined : rule.message,
	};
};

export const validateMultipleFields = (
	fields: Array<{ name: string; value: string; rules: ValidationRule[] }>,
): ValidationResult => {
	const errors: ValidationError[] = [];

	for (const field of fields) {
		for (const rule of field.rules) {
			const result = validateField(rule, field.value);
			if (!result.valid) {
				errors.push({
					field: field.name,
					message: result.message || "Validasi gagal",
				});
			}
		}
	}

	return {
		valid: errors.length === 0,
		errors,
	};
};

// Real-time validation composable
export const useFieldValidation = (field: ValidationRule) => {
	return {
		validate: (value: string) => validateField(field, value),
		regex: ValidationRules[field].regex,
		message: ValidationRules[field].message,
	};
};

// Batch validation for form
export const validateForm = (
	data: Record<string, any>,
	schema: Record<string, ValidationRule[]>,
): ValidationResult => {
	const errors: ValidationError[] = [];

	for (const [fieldName, rules] of Object.entries(schema)) {
		const value = String(data[fieldName] || "");

		for (const rule of rules) {
			const result = validateField(rule, value);
			if (!result.valid) {
				errors.push({
					field: fieldName,
					message: result.message || "Validasi gagal",
				});
				break; // Stop at first error for this field
			}
		}
	}

	return {
		valid: errors.length === 0,
		errors,
	};
};

// Custom validators
export const customValidators = {
	dateFormat: (format: string = "YYYY-MM-DD") => ({
		validate: (value: string): boolean => {
			if (!value) return true;
			const regex = /^\d{4}-\d{2}-\d{2}$/;
			if (!regex.test(value)) return false;

			const [year, month, day] = value.split("-").map(Number);
			const date = new Date(year, month - 1, day);

			return (
				date.getFullYear() === year &&
				date.getMonth() === month - 1 &&
				date.getDate() === day
			);
		},
		message: `Format tanggal harus ${format}`,
	}),

	fileSize: (maxSizeKB: number) => ({
		validate: (file: File): boolean => {
			return file.size <= maxSizeKB * 1024;
		},
		message: `Ukuran file maksimal ${maxSizeKB}KB`,
	}),

	fileType: (allowedTypes: string[]) => ({
		validate: (file: File): boolean => {
			return allowedTypes.includes(file.type);
		},
		message: `Tipe file harus salah satu dari: ${allowedTypes.join(", ")}`,
	}),

	numberRange: (min: number, max: number) => ({
		validate: (value: string): boolean => {
			const num = parseFloat(value);
			return !isNaN(num) && num >= min && num <= max;
		},
		message: `Nilai harus antara ${min} dan ${max}`,
	}),

	match: (otherField: string, otherValue: string) => ({
		validate: (value: string): boolean => {
			return value === otherValue;
		},
		message: `Harus sama dengan ${otherField}`,
	}),

	url: {
		validate: (value: string): boolean => {
			if (!value) return true;
			try {
				new URL(value);
				return true;
			} catch {
				return false;
			}
		},
		message: "Format URL tidak valid",
	},
};

// Export all
export default {
	ValidationRules,
	validateField,
	validateMultipleFields,
	validateForm,
	useFieldValidation,
	customValidators,
};
```

---

## ./src/utils/helpers.ts

```typescript
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
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6",
			"p",
			"br",
			"strong",
			"em",
			"u",
			"s",
			"ul",
			"ol",
			"li",
			"table",
			"thead",
			"tbody",
			"tr",
			"th",
			"td",
			"blockquote",
			"code",
			"pre",
			"a",
			"img",
			"div",
			"span",
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
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember",
	];
	return bulan[month - 1] || "";
};

/**
 * Get nama hari Indonesia
 */
export const getHariIndonesia = (day: number): string => {
	const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
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
	return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
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
export const getLocalStorage = <T = any>(
	key: string,
	defaultValue?: T,
): T | null => {
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
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
	return array.reduce(
		(result, item) => {
			const groupKey = String(item[key]);
			if (!result[groupKey]) {
				result[groupKey] = [];
			}
			result[groupKey].push(item);
			return result;
		},
		{} as Record<string, T[]>,
	);
};
```

---

## ./src/utils/markdown.ts

````typescript
// ============================================================================
// ENHANCED MARKDOWN PARSER
// Version: 1.0.0
// ============================================================================

import { marked } from "marked";
import DOMPurify from "dompurify";

// ============================================================================
// CONFIGURATION
// ============================================================================

marked.setOptions({
	gfm: true, // GitHub Flavored Markdown
	breaks: true, // Convert \n to <br>
	headerIds: true,
	mangle: false,
	pedantic: false,
});

// ============================================================================
// CUSTOM RENDERER
// ============================================================================

const renderer = new marked.Renderer();

/**
 * Enhanced table renderer dengan styling yang lebih baik
 */
renderer.table = (header: string, body: string): string => {
	return `
    <div class="table-wrapper overflow-x-auto my-6 shadow-sm">
      <table class="report-table min-w-full border-collapse border border-slate-300">
        <thead class="bg-slate-100">${header}</thead>
        <tbody class="bg-white">${body}</tbody>
      </table>
    </div>
  `;
};

/**
 * Enhanced table header cell renderer
 */
renderer.tablecell = (
	content: string,
	flags: {
		header: boolean;
		align: "center" | "left" | "right" | null;
	},
): string => {
	const type = flags.header ? "th" : "td";
	const align = flags.align ? ` style="text-align: ${flags.align}"` : "";
	const classes = flags.header
		? "px-4 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border border-slate-300"
		: "px-4 py-3 text-sm text-slate-900 border border-slate-300";

	return `<${type}${align} class="${classes}">${content}</${type}>`;
};

/**
 * Enhanced heading renderer dengan anchor links dan proper hierarchy
 */
renderer.heading = (text: string, level: number): string => {
	const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");

	const sizeClasses = {
		1: "text-2xl font-bold mb-6 mt-8 pb-2 border-b-2 border-slate-200",
		2: "text-xl font-bold mb-4 mt-6",
		3: "text-lg font-semibold mb-3 mt-5",
		4: "text-base font-semibold mb-2 mt-4",
		5: "text-sm font-semibold mb-2 mt-3",
		6: "text-sm font-semibold mb-2 mt-2",
	};

	const sizeClass = sizeClasses[level as keyof typeof sizeClasses] || "";

	return `
    <h${level} id="${escapedText}" class="heading-${level} ${sizeClass} group relative">
      ${text}
      <a href="#${escapedText}" class="anchor-link opacity-0 group-hover:opacity-100 ml-2 text-blue-500 transition-opacity">#</a>
    </h${level}>
  `;
};

/**
 * Enhanced list renderer
 */
renderer.list = (body: string, ordered: boolean, start: number): string => {
	const type = ordered ? "ol" : "ul";
	const startAttr = ordered && start !== 1 ? ` start="${start}"` : "";
	const listStyle = ordered ? "list-decimal" : "list-disc";

	return `<${type}${startAttr} class="${listStyle} ml-6 my-4 space-y-2">${body}</${type}>`;
};

/**
 * Enhanced list item renderer
 */
renderer.listitem = (text: string): string => {
	return `<li class="text-sm leading-relaxed">${text}</li>`;
};

/**
 * Enhanced blockquote renderer
 */
renderer.blockquote = (quote: string): string => {
	return `
    <blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-slate-600 bg-blue-50 rounded-r">
      ${quote}
    </blockquote>
  `;
};

/**
 * Enhanced code block renderer dengan syntax highlighting support
 */
renderer.code = (code: string, language: string | undefined): string => {
	const lang = language || "text";
	const escapedCode = escapeHtml(code);

	return `
    <div class="code-block my-4">
      <div class="code-header bg-slate-800 text-slate-300 px-4 py-2 rounded-t text-xs font-mono">
        ${lang}
      </div>
      <pre class="bg-slate-900 text-slate-100 rounded-b p-4 overflow-x-auto"><code class="language-${lang}">${escapedCode}</code></pre>
    </div>
  `;
};

/**
 * Enhanced inline code renderer
 */
renderer.codespan = (code: string): string => {
	return `<code class="bg-slate-100 text-red-600 px-2 py-1 rounded text-sm font-mono">${code}</code>`;
};

/**
 * Enhanced paragraph renderer
 */
renderer.paragraph = (text: string): string => {
	return `<p class="mb-4 text-sm leading-relaxed text-justify">${text}</p>`;
};

/**
 * Enhanced link renderer dengan security
 */
renderer.link = (href: string, title: string | null, text: string): string => {
	const titleAttr = title ? ` title="${title}"` : "";
	const isExternal = href.startsWith("http");
	const externalAttrs = isExternal
		? ' target="_blank" rel="noopener noreferrer"'
		: "";

	return `<a href="${href}"${titleAttr}${externalAttrs} class="text-blue-600 hover:text-blue-800 underline">${text}</a>`;
};

/**
 * Enhanced image renderer dengan lazy loading
 */
renderer.image = (href: string, title: string | null, text: string): string => {
	const titleAttr = title ? ` title="${title}"` : "";
	const altAttr = text ? ` alt="${text}"` : "";

	return `
    <figure class="my-6">
      <img src="${href}"${altAttr}${titleAttr} loading="lazy" class="max-w-full h-auto rounded shadow-lg" />
      ${title ? `<figcaption class="text-center text-sm text-slate-600 mt-2 italic">${title}</figcaption>` : ""}
    </figure>
  `;
};

/**
 * Enhanced strong (bold) renderer
 */
renderer.strong = (text: string): string => {
	return `<strong class="font-bold text-slate-900">${text}</strong>`;
};

/**
 * Enhanced emphasis (italic) renderer
 */
renderer.em = (text: string): string => {
	return `<em class="italic">${text}</em>`;
};

/**
 * Enhanced horizontal rule renderer
 */
renderer.hr = (): string => {
	return `<hr class="my-8 border-t-2 border-slate-200" />`;
};

// Apply custom renderer
marked.use({ renderer });

// ============================================================================
// MAIN PARSER FUNCTION
// ============================================================================

/**
 * Parse markdown to HTML with enhanced rendering and sanitization
 */
export const parseMarkdown = async (text: string): Promise<string> => {
	if (!text) return "";

	try {
		// Parse markdown
		const html = await marked.parse(text, { async: true });

		// Sanitize with comprehensive config
		const sanitized = DOMPurify.sanitize(html, {
			ALLOWED_TAGS: [
				// Headings
				"h1",
				"h2",
				"h3",
				"h4",
				"h5",
				"h6",
				// Text formatting
				"p",
				"br",
				"strong",
				"em",
				"u",
				"s",
				"del",
				"ins",
				"mark",
				"small",
				"sub",
				"sup",
				// Lists
				"ul",
				"ol",
				"li",
				// Tables
				"table",
				"thead",
				"tbody",
				"tfoot",
				"tr",
				"th",
				"td",
				"caption",
				// Quotes and code
				"blockquote",
				"code",
				"pre",
				// Links and media
				"a",
				"img",
				"figure",
				"figcaption",
				// Structure
				"div",
				"span",
				"hr",
				// Semantic
				"article",
				"section",
				"aside",
				"nav",
			],
			ALLOWED_ATTR: [
				"href",
				"src",
				"alt",
				"title",
				"class",
				"id",
				"target",
				"rel",
				"colspan",
				"rowspan",
				"start",
				"type",
				"loading",
				"style", // Limited style for alignment
			],
			ALLOWED_STYLES: {
				"*": {
					"text-align": [/^(left|right|center|justify)$/],
				},
			},
			ALLOW_DATA_ATTR: false,
			ADD_ATTR: ["target", "rel"], // For external links
		});

		return sanitized;
	} catch (error) {
		console.error("[Markdown Parser] Parsing error:", error);
		return `<div class="p-4 bg-red-50 border border-red-200 rounded text-red-700">
      <strong>Error:</strong> Gagal memproses konten markdown.
    </div>`;
	}
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Escape HTML special characters
 */
const escapeHtml = (unsafe: string): string => {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
};

/**
 * Strip markdown from text (get plain text)
 */
export const stripMarkdown = (markdown: string): string => {
	return (
		markdown
			// Remove code blocks
			.replace(/```[\s\S]*?```/g, "")
			// Remove inline code
			.replace(/`([^`]+)`/g, "$1")
			// Remove images
			.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
			// Remove links
			.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
			// Remove headers
			.replace(/^#{1,6}\s+/gm, "")
			// Remove bold
			.replace(/\*\*([^*]+)\*\*/g, "$1")
			.replace(/__([^_]+)__/g, "$1")
			// Remove italic
			.replace(/\*([^*]+)\*/g, "$1")
			.replace(/_([^_]+)_/g, "$1")
			// Remove strikethrough
			.replace(/~~([^~]+)~~/g, "$1")
			// Remove horizontal rules
			.replace(/^[-*_]{3,}$/gm, "")
			// Remove blockquotes
			.replace(/^\s*>\s+/gm, "")
			// Clean up multiple spaces
			.replace(/\s+/g, " ")
			.trim()
	);
};

/**
 * Get word count from markdown
 */
export const getWordCount = (markdown: string): number => {
	const plain = stripMarkdown(markdown);
	const words = plain.split(/\s+/).filter((word) => word.length > 0);
	return words.length;
};

/**
 * Get reading time estimate (average 200 words per minute)
 */
export const getReadingTime = (markdown: string): string => {
	const wordCount = getWordCount(markdown);
	const minutes = Math.ceil(wordCount / 200);
	return minutes === 0 ? "< 1 menit" : `${minutes} menit`;
};

/**
 * Get table of contents from markdown
 */
export const getTableOfContents = (
	markdown: string,
): Array<{ level: number; text: string; id: string }> => {
	const headings: Array<{ level: number; text: string; id: string }> = [];
	const lines = markdown.split("\n");

	for (const line of lines) {
		const match = line.match(/^(#{1,6})\s+(.+)$/);
		if (match) {
			const level = match[1].length;
			const text = match[2].trim();
			const id = text.toLowerCase().replace(/[^\w]+/g, "-");

			headings.push({ level, text, id });
		}
	}

	return headings;
};

/**
 * Validate markdown structure
 */
export const validateMarkdown = (
	markdown: string,
): { valid: boolean; warnings: string[] } => {
	const warnings: string[] = [];

	// Check for unclosed code blocks
	const codeBlockCount = (markdown.match(/```/g) || []).length;
	if (codeBlockCount % 2 !== 0) {
		warnings.push("Ditemukan code block yang tidak ditutup");
	}

	// Check for unclosed links
	const openBrackets = (markdown.match(/\[/g) || []).length;
	const closeBrackets = (markdown.match(/\]/g) || []).length;
	if (openBrackets !== closeBrackets) {
		warnings.push("Ditemukan link yang tidak lengkap");
	}

	// Check for empty headers
	const emptyHeaders = markdown.match(/^#{1,6}\s*$/gm);
	if (emptyHeaders && emptyHeaders.length > 0) {
		warnings.push("Ditemukan heading kosong");
	}

	return {
		valid: warnings.length === 0,
		warnings,
	};
};

// ============================================================================
// EXPORT
// ============================================================================

export default {
	parseMarkdown,
	stripMarkdown,
	getWordCount,
	getReadingTime,
	getTableOfContents,
	validateMarkdown,
};
````

---

## ./src/styles/global.css

```css
@import "tailwindcss";

:root {
	--color-blue-600: #2563eb;
	--color-emerald-500: #10b981;
	--color-red-500: #ef4444;
}

@theme {
	--font-sans: "Lexend", system-ui, sans-serif;
}

@layer base {
	body {
		@apply bg-slate-900 text-slate-100 min-h-screen;
		background-image:
			radial-gradient(at 0% 0%, rgba(56, 189, 248, 0.15) 0px, transparent 50%),
			radial-gradient(at 100% 0%, rgba(168, 85, 247, 0.15) 0px, transparent 50%);
	}
}

@layer components {
	.glass-panel {
		@apply bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl;
	}

	.btn-primary {
		@apply bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg 
        shadow-lg shadow-blue-900/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed;
	}

	.custom-scrollbar::-webkit-scrollbar {
		width: 6px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.2);
		border-radius: 10px;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.3);
	}
}

@layer utilities {
	.prose-report {
		font-family: "Times New Roman", Times, serif;
		color: #000000 !important;
		line-height: 1.4; /* Sedikit dirapatkan agar muat banyak */
		font-size: 12pt;
	}

	.prose-report table {
		width: 100%;
		border-collapse: collapse;
		margin: 0.8rem 0;
		font-size: 11pt;
	}

	.prose-report th,
	.prose-report td {
		border: 1px solid #000000;
		padding: 4px 6px;
		vertical-align: top;
	}

	.prose-report th {
		background-color: #e5e7eb !important;
		font-weight: bold;
		text-align: center;
		print-color-adjust: exact;
	}

	.prose-report h1,
	.prose-report h2,
	.prose-report h3 {
		color: #000000 !important;
		font-weight: bold;
		margin-top: 1.2rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}
	.prose-report ul,
	.prose-report ol {
		padding-left: 1.2rem;
		margin-bottom: 0.8rem;
	}
}

/* --- PRINT A4 PRECISION --- */
@media print {
	@page {
		margin: 1.5cm 2cm 1.5cm 2cm; /* Top Right Bottom Left */
		size: A4 portrait;
	}

	body {
		background: white !important;
		color: black !important;
		visibility: hidden; /* Hide everything initially */
	}

	/* Hanya tampilkan area dokumen */
	#document-preview {
		visibility: visible;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		margin: 0;
		padding: 0;
		box-shadow: none !important;
		transform: none !important; /* Reset scale transform */
	}

	/* Fix image quality on print */
	img {
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
	}

	/* Hilangkan UI browser (header/footer url) */
	html {
		height: 100%;
	}
}
```

---

## ./src/stores/reportStore.ts

```typescript
// ============================================================================
// GENERATOR LAPORAN KINERJA PEGAWAI - DATA STORE
// Version: 1.0.0
// ============================================================================

import { persistentMap } from "@nanostores/persistent";
import type { AppStore, HistoryStore, HistoryItem } from "../types/ReportTypes";

// ============================================================================
// DEFAULT STATE - Sesuai Spesifikasi DRAFT PROJECT
// ============================================================================
const defaultState: AppStore = {
	// 2.1 DATA IDENTITAS INSTANSI
	instansi: {
		logoUtama: "", // Logo Kiri
		logoInstitusi: "", // Logo Tengah
		logoInstansi: "", // Logo Kanan

		// Header Kop Surat (3 Baris)
		header1: "KEMENTERIAN AGAMA REPUBLIK INDONESIA",
		header2: "KANTOR KABUPATEN PANDEGLANG",
		header3: "MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG",

		// Kontak Instansi
		alamat: "Jl. Raya Labuan Km. 5,7 Pandeglang - Banten 42253",
		telepon: "(0253) 201000",
		email: "mtsn1pandeglang@kemenag.go.id",
		website: "mtsn1pandeglang.sch.id",

		// Pejabat Penandatangan
		kepala: {
			nama: "",
			nip: "",
			pangkat: "Pembina/IV-a",
			ttd: "",
		},
		kepalaTu: {
			nama: "",
			nip: "",
			pangkat: "Penata/III-c",
			ttd: "",
		},

		// Footer
		titimangsa: "Pandeglang",
	},

	// 2.2 DATA IDENTITAS PEGAWAI
	pegawai: {
		// Identitas Dasar
		nama: "",
		nip: "",
		nuptk: "",
		nik: "",

		// Status Kepegawaian
		jenis: "PNS",
		status: "Aktif",
		golongan: "III/a",
		jabatan: "Guru Ahli Pertama",
		unitKerja: "MTsN 1 Pandeglang",

		// Data Pribadi
		tempatLahir: "Pandeglang",
		tanggalLahir: "1990-01-01",
		gender: "L",
		alamat: "",
		hp: "",
		email: "",
		fotoPegawai: "",

		// Pendidikan & Masa Kerja
		pendidikan: "S1 Pendidikan",
		masaKerjaTahun: "5",
		masaKerjaBulan: "0",
	},

	// 2.3 DATA AKADEMIK
	akademik: {
		kurikulum: "Kurikulum Merdeka",
		tahunPelajaran: `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`,
		semester: "Ganjil",
		mapel: "",
		kelas: "",
		jamMengajar: "24",
		jumlahSiswa: "32",
		ekskul: "",
	},

	// 2.4 DATA KINERJA PEGAWAI
	kinerja: {
		tugasPokok: "Merencanakan, melaksanakan, dan mengevaluasi pembelajaran.",
		tugasTambahan: "Wali Kelas, Piket Harian",
		targetTahunan: "Meningkatkan ketuntasan belajar siswa minimal 85%",
		targetKuantitatif: "Laporan Kinerja Bulanan, Perangkat Pembelajaran",
		targetKualitatif: "Tercapainya standar kompetensi lulusan",
		hambatan: "",
		solusi: "",
	},

	// 2.6 DATA INTEGRASI AI & CONFIG
	config: {
		bulan: (new Date().getMonth() + 1).toString(),
		tahun: new Date().getFullYear().toString(),
		modelAI: "gemini",
		tokenLimit: 2000,
		customInstruction: "",
	},

	// 2.5 DATA DOKUMEN OUTPUT
	output: {
		titimangsa: {
			tempat: "Pandeglang",
			tanggal: "",
			bahasa: "Indonesia",
		},
		tte: {
			qrCode: "",
			nomorDokumen: "",
			hashDokumen: "",
			timestamp: "",
			statusValidasi: "Valid",
		},
		content: "",
		lastUpdated: "",
	},
};

// ============================================================================
// MAIN STORE - Persistent dengan localStorage
// ============================================================================
export const reportStore = persistentMap<AppStore>(
	"ekinerja-app-v1:",
	defaultState,
	{
		encode: JSON.stringify,
		decode: JSON.parse,
	},
);

// ============================================================================
// HISTORY STORE - Menyimpan riwayat laporan
// ============================================================================
const defaultHistoryState: HistoryStore = {
	items: [],
};

export const historyStore = persistentMap<HistoryStore>(
	"ekinerja-history:",
	defaultHistoryState,
	{
		encode: JSON.stringify,
		decode: JSON.parse,
	},
);

// ============================================================================
// STORE UTILITIES
// ============================================================================

/**
 * Reset store ke default state
 */
export const resetStore = () => {
	reportStore.set(defaultState);
};

/**
 * Update specific key di store
 */
export const updateStore = <K extends keyof AppStore>(
	key: K,
	value: AppStore[K],
) => {
	const current = reportStore.get();
	reportStore.set({ ...current, [key]: value });
};

/**
 * Deep update nested property
 */
export const updateNested = (path: string[], value: any) => {
	const current = reportStore.get();
	const updated = { ...current };

	let target: any = updated;
	for (let i = 0; i < path.length - 1; i++) {
		target[path[i]] = { ...target[path[i]] };
		target = target[path[i]];
	}
	target[path[path.length - 1]] = value;

	reportStore.set(updated);
};

/**
 * Simpan state saat ini ke history
 */
export const saveToHistory = (title?: string) => {
	const current = reportStore.get();
	const history = historyStore.get();

	const id = `history_${Date.now()}`;
	const date = new Date().toISOString();

	// Generate title otomatis jika tidak disediakan
	const autoTitle = title || generateHistoryTitle(current);

	const newItem: HistoryItem = {
		id,
		title: autoTitle,
		date,
		data: JSON.parse(JSON.stringify(current)), // Deep clone
	};

	// Tambahkan ke awal array
	const updatedHistory = {
		items: [newItem, ...history.items].slice(0, 20), // Max 20 items
	};

	historyStore.set(updatedHistory);
	return id;
};

/**
 * Load data dari history
 */
export const loadFromHistory = (id: string) => {
	const history = historyStore.get();
	const item = history.items.find((i) => i.id === id);

	if (item) {
		reportStore.set(JSON.parse(JSON.stringify(item.data)));
		return true;
	}
	return false;
};

/**
 * Hapus item dari history
 */
export const deleteHistory = (id: string) => {
	const history = historyStore.get();
	const updatedHistory = {
		items: history.items.filter((i) => i.id !== id),
	};
	historyStore.set(updatedHistory);
};

/**
 * Clear all history
 */
export const clearHistory = () => {
	historyStore.set(defaultHistoryState);
};

/**
 * Generate auto title untuk history
 */
const generateHistoryTitle = (data: AppStore): string => {
	const namaPegawai = data.pegawai.nama || "Tanpa Nama";
	const bulan = getBulanName(parseInt(data.config.bulan));
	const tahun = data.config.tahun;

	return `Laporan ${namaPegawai} - ${bulan} ${tahun}`;
};

/**
 * Utility: Nama bulan Indonesia
 */
const getBulanName = (bulan: number): string => {
	const namaBulan = [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember",
	];
	return namaBulan[bulan - 1] || "";
};

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validasi data pegawai minimal
 */
export const validatePegawai = (data: AppStore): string[] => {
	const errors: string[] = [];

	if (!data.pegawai.nama) errors.push("Nama pegawai harus diisi");
	if (!data.pegawai.nip) errors.push("NIP harus diisi");
	if (!data.pegawai.jabatan) errors.push("Jabatan harus diisi");

	// Validasi khusus untuk Guru
	if (data.pegawai.jenis === "Guru") {
		if (!data.akademik.mapel)
			errors.push("Mata pelajaran harus diisi untuk Guru");
		if (!data.akademik.kelas) errors.push("Kelas harus diisi untuk Guru");
	}

	return errors;
};

/**
 * Validasi konfigurasi AI
 */
export const validateAIConfig = (data: AppStore): string[] => {
	const errors: string[] = [];

	if (!data.config.bulan) errors.push("Bulan laporan harus dipilih");
	if (!data.config.tahun) errors.push("Tahun laporan harus diisi");
	if (data.config.tokenLimit < 500) errors.push("Token limit minimal 500");

	return errors;
};

/**
 * Validasi lengkap sebelum generate
 */
export const validateBeforeGenerate = (
	data: AppStore,
): {
	valid: boolean;
	errors: string[];
} => {
	const errors = [...validatePegawai(data), ...validateAIConfig(data)];

	return {
		valid: errors.length === 0,
		errors,
	};
};

// ============================================================================
// EXPORT UTILITIES
// ============================================================================

/**
 * Export data ke JSON
 */
export const exportToJSON = (): string => {
	const current = reportStore.get();
	return JSON.stringify(current, null, 2);
};

/**
 * Import data dari JSON
 */
export const importFromJSON = (jsonString: string): boolean => {
	try {
		const data = JSON.parse(jsonString);
		// Merge dengan default untuk memastikan semua field ada
		const merged = { ...defaultState, ...data };
		reportStore.set(merged);
		return true;
	} catch (error) {
		console.error("Import JSON failed:", error);
		return false;
	}
};

/**
 * Get formatted date untuk titimangsa
 */
export const getFormattedTitimangsa = (): string => {
	const current = reportStore.get();
	const tempat = current.instansi.titimangsa || "Pandeglang";
	const tanggal = new Date().toLocaleDateString("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return `${tempat}, ${tanggal}`;
};

/**
 * Generate nomor dokumen otomatis
 */
export const generateNomorDokumen = (): string => {
	const current = reportStore.get();
	const tahun = current.config.tahun;
	const bulan = current.config.bulan.padStart(2, "0");
	const random = Math.floor(Math.random() * 999) + 1;
	const nomorUrut = random.toString().padStart(3, "0");

	return `${nomorUrut}/LPKP/${bulan}/${tahun}`;
};
```

---

## ./src/stores/toastStore.ts

```typescript
import { atom } from "nanostores";

export type ToastType = "success" | "error" | "info";

export type Toast = {
	id: number;
	message: string;
	type: ToastType;
};

export const $toasts = atom<Toast[]>([]);

export const addToast = (message: string, type: ToastType = "info") => {
	const id = Date.now();
	$toasts.set([...$toasts.get(), { id, message, type }]);

	setTimeout(() => {
		$toasts.set($toasts.get().filter((t) => t.id !== id));
	}, 3000);
};
```

---

## ./src/types/ReportTypes.ts

```typescript
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
```

---

## ./src/config/constants.ts

```typescript
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
	repository:
		"https://github.com/zulfikriyahya/generator-laporan-kinerja-pegawai",
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

// ============================================================================
// ERROR MESSAGES
// ============================================================================

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
	nextCloud: false, // Coming soon
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
export const getAPIKey = (
	model: "gemini" | "claude" | "gpt" | "groq",
): string => {
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
```

---

## ./src/components/forms/FormAkademik.astro

```astro
---
import InputGroup from "../InputGroup.astro";
import SelectGroup from "./SelectGroup.astro";
---

<div class="space-y-4 animate-fade-in">
	<div
		class="p-3 bg-blue-900/20 border border-blue-500/20 rounded text-xs text-blue-300 mb-2"
	>
		Khusus untuk Pegawai fungsional Guru.
	</div>
	<InputGroup label="Mata Pelajaran" name="mapel" model="form.akademik.mapel" />
	<div class="grid grid-cols-2 gap-3">
		<InputGroup label="Kelas Ajar" name="kls" model="form.akademik.kelas" />
		<InputGroup label="Jml Siswa" name="siswa" model="form.akademik.jmlSiswa" />
	</div>
	<div class="grid grid-cols-2 gap-3">
		<InputGroup
			label="Jam/Minggu"
			name="jam"
			model="form.akademik.jamMengajar"
		/>
		<SelectGroup
			label="Kurikulum"
			name="kur"
			model="form.akademik.kurikulum"
			options={[
				{ val: "Merdeka", label: "Kurikulum Merdeka" },
				{ val: "K13", label: "K13 Revisi" },
			]}
		/>
	</div>
	<InputGroup
		label="Tugas Ekstrakurikuler"
		name="ekskul"
		model="form.akademik.ekskul"
	/>
</div>

```

---

## ./src/components/forms/SelectGroup.astro

```astro
---
interface Props {
	label: string;
	name: string;
	model: string;
	options: { val: string; label: string }[];
}
const { label, name, model, options } = Astro.props;
---

<div class="flex flex-col gap-2 group">
	<label
		class="text-xs font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-blue-400 transition-colors"
	>
		{label}
	</label>
	<div class="relative">
		<select
			x-model={model}
			class="w-full appearance-none bg-slate-950/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all cursor-pointer"
		>
			{options.map((opt) => <option value={opt.val}>{opt.label}</option>)}
		</select>
		<div
			class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400"
		>
			<svg class="h-4 w-4 fill-current" viewBox="0 0 20 20"
				><path
					d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
				></path></svg
			>
		</div>
	</div>
</div>

```

---

## ./src/components/forms/FormKinerja.astro

```astro
---
import TextAreaGroup from "../TextAreaGroup.astro";
---

<div class="space-y-4 animate-fade-in">
	<TextAreaGroup
		label="Tugas Pokok (Job Desc)"
		name="tp"
		model="form.kinerja.tugasPokok"
		rows="3"
	/>
	<TextAreaGroup
		label="Tugas Tambahan"
		name="tt"
		model="form.kinerja.tugasTambahan"
		rows="2"
	/>

	<div class="pt-4 border-t border-white/5">
		<h4 class="text-xs font-bold text-slate-500 uppercase mb-2">
			Analisis & Target
		</h4>
		<TextAreaGroup
			label="Target Capaian Tahunan (IKU)"
			name="iku"
			model="form.kinerja.targetTahunan"
			rows="2"
			placeholder="Contoh: Meningkatkan rata-rata nilai siswa..."
		/>
		<TextAreaGroup
			label="Hambatan / Kendala Bulan Ini"
			name="hambat"
			model="form.kinerja.hambatan"
			rows="2"
			placeholder="Jika ada kendala, tulis disini..."
		/>
		<TextAreaGroup
			label="Solusi / Tindak Lanjut"
			name="solusi"
			model="form.kinerja.solusi"
			rows="2"
			placeholder="Solusi atas kendala diatas..."
		/>
	</div>
</div>

```

---

## ./src/components/forms/KopSuratConfig.astro

```astro
---
import InputGroup from "../InputGroup.astro";
---

<div class="space-y-4">
	<h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
		Header Kop Surat
	</h3>
	<InputGroup
		label="Baris 1 (Induk)"
		name="baris1"
		model="form.institusiBarisSatuNama"
		placeholder="KEMENTERIAN AGAMA RI"
	/>
	<InputGroup
		label="Baris 2 (Wilayah)"
		name="baris2"
		model="form.institusiBarisDuaNama"
		placeholder="KANTOR KABUPATEN..."
	/>
	<InputGroup
		label="Nama Satuan Kerja"
		name="instansi"
		model="form.instansiNama"
		placeholder="MADRASAH / SEKOLAH..."
	/>
	<InputGroup
		label="Alamat Lengkap"
		name="alamat"
		model="form.instansiAlamat"
		placeholder="Jl. Raya..."
	/>
	<InputGroup
		label="Kontak / Website"
		name="website"
		model="form.instansiWebsite"
		placeholder="Website / Email / Telp"
	/>
	<InputGroup
		label="Titimangsa (Tempat, Tanggal)"
		name="titimangsa"
		model="form.titimangsa"
		placeholder="Pandeglang, 31 Januari 2025"
	/>

	<!-- UPLOAD LOGO SECTION -->
	<div class="grid grid-cols-2 gap-4 mt-4 border-t border-white/10 pt-4">
		<!-- LOGO KIRI (Institusi) -->
		<div class="flex flex-col gap-2 group">
			<label class="text-xs font-bold text-slate-400 uppercase tracking-wider"
				>Logo Kiri (Induk)</label
			>
			<div class="flex flex-col gap-2">
				<div
					class="w-16 h-16 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden relative"
				>
					<template x-if="form.logoInstitusiBase64">
						<img
							:src="form.logoInstitusiBase64"
							class="w-full h-full object-contain"
						/>
					</template>
					<template x-if="!form.logoInstitusiBase64">
						<span class="text-[10px] text-slate-500 text-center px-1"
							>No Logo</span
						>
					</template>
					<button
						x-show="form.logoInstitusiBase64"
						@click="form.logoInstitusiBase64 = ''"
						class="absolute inset-0 bg-black/60 flex items-center justify-center text-red-400 opacity-0 hover:opacity-100 transition"
						>✕</button
					>
				</div>
				<input
					type="file"
					accept="image/*"
					@change="handleLogoUpload($event, 'logoInstitusiBase64')"
					class="text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20"
				/>
			</div>
		</div>

		<!-- LOGO KANAN (Instansi) -->
		<div class="flex flex-col gap-2 group">
			<label class="text-xs font-bold text-slate-400 uppercase tracking-wider"
				>Logo Kanan (Satker)</label
			>
			<div class="flex flex-col gap-2">
				<div
					class="w-16 h-16 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden relative"
				>
					<template x-if="form.logoInstansiBase64">
						<img
							:src="form.logoInstansiBase64"
							class="w-full h-full object-contain"
						/>
					</template>
					<template x-if="!form.logoInstansiBase64">
						<span class="text-[10px] text-slate-500 text-center px-1"
							>No Logo</span
						>
					</template>
					<button
						x-show="form.logoInstansiBase64"
						@click="form.logoInstansiBase64 = ''"
						class="absolute inset-0 bg-black/60 flex items-center justify-center text-red-400 opacity-0 hover:opacity-100 transition"
						>✕</button
					>
				</div>
				<input
					type="file"
					accept="image/*"
					@change="handleLogoUpload($event, 'logoInstansiBase64')"
					class="text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20"
				/>
			</div>
		</div>
	</div>
</div>

```

---

## ./src/components/forms/TabNavigation.astro

```astro
<div
	class="flex overflow-x-auto gap-2 p-1 mb-6 bg-slate-950/50 rounded-xl border border-white/5 scrollbar-hide"
>
	<template x-for="tab in tabs" :key="tab.id">
		<button
			@click="activeTab = tab.id"
			:class="activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'"
			class="px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
			x-text="tab.label"></button>
	</template>
</div>

```

---

## ./src/components/forms/FormPegawai.astro

```astro
---
import InputGroup from "../InputGroup.astro";
import SelectGroup from "./SelectGroup.astro";
---

<div class="space-y-4 animate-fade-in pb-10">
	<h3
		class="text-xs font-bold text-blue-400 uppercase border-b border-white/10 pb-1"
	>
		2.2 Data Identitas Pegawai
	</h3>

	<InputGroup
		label="Nama Lengkap (Sesuai KTP)"
		name="nama"
		model="form.pegawai.nama"
	/>

	<div class="grid grid-cols-2 gap-3">
		<InputGroup
			label="NIP"
			name="nip"
			model="form.pegawai.nip"
			@blur="validateNIP"
		/>
		<script>
			function validateNIP() {
				const result = validateField("nip", form.pegawai.nip);
				if (!result.valid) {
					showError(result.message);
				}
			}
		</script>
		<InputGroup label="NUPTK / NIK" name="nuptk" model="form.pegawai.nuptk" />
	</div>

	<div class="grid grid-cols-2 gap-3">
		<SelectGroup
			label="Status Kepegawaian"
			name="stts"
			model="form.pegawai.jenis"
			options={[
				{ val: "PNS", label: "PNS" },
				{ val: "PPPK", label: "PPPK" },
				{ val: "Honorer", label: "Honorer" },
			]}
		/>
		<InputGroup
			label="Pangkat/Golongan"
			name="gol"
			model="form.pegawai.golongan"
		/>
	</div>

	<InputGroup label="Jabatan" name="jab" model="form.pegawai.jabatan" />
	<InputGroup label="Unit Kerja" name="unit" model="form.pegawai.unitKerja" />

	<div class="grid grid-cols-2 gap-3">
		<InputGroup
			label="Tempat Lahir"
			name="tmplahir"
			model="form.pegawai.tempatLahir"
		/>
		<InputGroup
			label="Tanggal Lahir"
			name="tgllahir"
			model="form.pegawai.tanggalLahir"
			type="date"
		/>
	</div>

	<InputGroup
		label="Pendidikan Terakhir"
		name="pend"
		model="form.pegawai.pendidikan"
		placeholder="S1 - Manajemen Pendidikan"
	/>

	<div class="grid grid-cols-2 gap-3">
		<InputGroup
			label="Masa Kerja (Tahun)"
			name="mkt"
			model="form.pegawai.masaKerjaTahun"
			type="number"
		/>
		<InputGroup
			label="Masa Kerja (Bulan)"
			name="mkb"
			model="form.pegawai.masaKerjaBulan"
			type="number"
		/>
	</div>
</div>

```

---

## ./src/components/forms/FormInstansi.astro

```astro
---
import InputGroup from "../InputGroup.astro";
---

<div class="space-y-6 animate-fade-in pb-10">
	<!-- Header Dokumen -->
	<div class="space-y-3">
		<h3
			class="text-xs font-bold text-blue-400 uppercase border-b border-white/10 pb-1"
		>
			2.1 Identitas Instansi (Kop Surat)
		</h3>
		<InputGroup
			label="Header 1 (Induk/Kementerian)"
			name="h1"
			model="form.instansi.header1"
			placeholder="KEMENTERIAN AGAMA RI"
		/>
		<InputGroup
			label="Header 2 (Wilayah/Dinas)"
			name="h2"
			model="form.instansi.header2"
			placeholder="KANTOR KABUPATEN..."
		/>
		<InputGroup
			label="Header 3 (Satuan Kerja)"
			name="h3"
			model="form.instansi.header3"
			placeholder="MADRASAH TSANAWIYAH..."
		/>
		<InputGroup
			label="Alamat Lengkap"
			name="addr"
			model="form.instansi.alamat"
		/>
		<div class="grid grid-cols-2 gap-3">
			<InputGroup label="Telepon" name="telp" model="form.instansi.telepon" />
			<InputGroup label="Email" name="mail" model="form.instansi.email" />
		</div>
		<InputGroup label="Website" name="web" model="form.instansi.website" />
	</div>

	<!-- Upload Logo (Sesuai Draft 2.1) -->
	<div class="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
		<!-- Logo Kiri -->
		<div class="bg-slate-800 p-2 rounded text-center">
			<span class="text-[10px] text-slate-400 block mb-2">Logo Kiri</span>
			<div
				class="w-10 h-10 mx-auto mb-2 border border-dashed border-slate-600 flex items-center justify-center overflow-hidden"
			>
				<template x-if="form.instansi.logoUtama">
					<img
						:src="form.instansi.logoUtama"
						class="w-full h-full object-contain"
					/>
				</template>
			</div>
			<input
				type="file"
				accept="image/*"
				@change="handleUpload($event, 'logoUtama')"
				class="w-full text-[9px] text-slate-500 file:py-1 file:px-2 file:border-0 file:rounded file:bg-slate-700 file:text-white"
			/>
		</div>

		<!-- Logo Tengah -->
		<div class="bg-slate-800 p-2 rounded text-center">
			<span class="text-[10px] text-slate-400 block mb-2">Logo Tengah</span>
			<div
				class="w-10 h-10 mx-auto mb-2 border border-dashed border-slate-600 flex items-center justify-center overflow-hidden"
			>
				<template x-if="form.instansi.logoInstitusi">
					<img
						:src="form.instansi.logoInstitusi"
						class="w-full h-full object-contain"
					/>
				</template>
			</div>
			<input
				type="file"
				accept="image/*"
				@change="handleUpload($event, 'logoInstitusi')"
				class="w-full text-[9px] text-slate-500 file:py-1 file:px-2 file:border-0 file:rounded file:bg-slate-700 file:text-white"
			/>
		</div>

		<!-- Logo Kanan -->
		<div class="bg-slate-800 p-2 rounded text-center">
			<span class="text-[10px] text-slate-400 block mb-2">Logo Kanan</span>
			<div
				class="w-10 h-10 mx-auto mb-2 border border-dashed border-slate-600 flex items-center justify-center overflow-hidden"
			>
				<template x-if="form.instansi.logoInstansi">
					<img
						:src="form.instansi.logoInstansi"
						class="w-full h-full object-contain"
					/>
				</template>
			</div>
			<input
				type="file"
				accept="image/*"
				@change="handleUpload($event, 'logoInstansi')"
				class="w-full text-[9px] text-slate-500 file:py-1 file:px-2 file:border-0 file:rounded file:bg-slate-700 file:text-white"
			/>
		</div>
	</div>

	<!-- Pejabat Penandatangan -->
	<div class="space-y-3 pt-4 border-t border-white/10">
		<h3 class="text-xs font-bold text-blue-400 uppercase pb-1">
			Tanda Tangan & Titimangsa
		</h3>

		<InputGroup
			label="Tempat (Titimangsa)"
			name="titimangsa"
			model="form.instansi.titimangsa"
			placeholder="Pandeglang"
		/>

		<div class="p-3 bg-white/5 rounded-lg border border-white/5">
			<p class="text-xs font-bold text-emerald-400 mb-2">
				Kepala Instansi (Pejabat Penilai)
			</p>
			<InputGroup
				label="Nama Kepala"
				name="k_nama"
				model="form.instansi.kepala.nama"
			/>
			<div class="grid grid-cols-2 gap-2 mt-2">
				<InputGroup label="NIP" name="k_nip" model="form.instansi.kepala.nip" />
				<InputGroup
					label="Pangkat"
					name="k_pgkt"
					model="form.instansi.kepala.pangkat"
				/>
			</div>
		</div>

		<!-- Opsional: Kepala TU jika diperlukan -->
		<!-- <div class="p-3 bg-white/5 rounded-lg border border-white/5">...</div> -->
	</div>
</div>

```

---

## ./src/components/InputGroup.astro

```astro
---
interface Props {
	label: string;
	name: string;
	type?: "text" | "number" | "date" | "email";
	placeholder?: string;
	model: string;
}
const { label, name, type = "text", placeholder, model } = Astro.props;
---

<div class="flex flex-col gap-2 group">
	<label
		for={name}
		class="text-xs font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-blue-400 transition-colors"
	>
		{label}
	</label>
	<input
		type={type}
		id={name}
		name={name}
		x-model={model}
		placeholder={placeholder}
		class="w-full bg-slate-950/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 focus:bg-slate-900/50 transition-all placeholder:text-slate-600"
	/>
</div>

```

---

## ./src/components/TextAreaGroup.astro

```astro
---
interface Props {
	label: string;
	name: string;
	model: string;
	rows?: string;
	placeholder?: string;
}
const { label, name, model, rows = "4", placeholder } = Astro.props;
---

<div class="flex flex-col gap-2 group">
	<label
		for={name}
		class="text-xs font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-blue-400 transition-colors"
	>
		{label}
	</label>
	<textarea
		id={name}
		name={name}
		x-model={model}
		rows={rows}
		placeholder={placeholder}
		class="w-full bg-slate-950/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 focus:bg-slate-900/50 transition-all resize-none custom-scrollbar placeholder:text-slate-600"
	></textarea>
</div>

```

---

## ./src/components/HistoryPanel.astro

```astro
<div class="glass-panel p-4 h-full flex flex-col">
	<h3 class="text-white font-semibold mb-4 flex items-center gap-2">
		<span class="w-1 h-5 bg-orange-500 rounded-full"></span> Riwayat Laporan
	</h3>
	<div class="flex-1 overflow-y-auto space-y-2 pr-2" x-data="historyApp">
		<template x-if="items.length === 0">
			<div class="text-center text-slate-500 text-sm py-4">
				Belum ada riwayat tersimpan.
			</div>
		</template>
		<template x-for="item in items" :key="item.id">
			<div
				class="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 transition group"
			>
				<div class="flex justify-between items-start mb-1">
					<span class="text-xs text-orange-400" x-text="item.date"></span>
					<button
						@click="remove(item.id)"
						class="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
						>✕</button
					>
				</div>
				<div
					class="text-sm font-medium text-slate-200 truncate"
					x-text="item.title"
				>
				</div>
				<button
					@click="load(item.id)"
					class="mt-2 w-full py-1.5 text-xs bg-white/5 hover:bg-blue-500/20 hover:text-blue-300 rounded border border-transparent hover:border-blue-500/30 transition"
				>
					Load Data
				</button>
			</div>
		</template>
	</div>
</div>
<script>
	import Alpine from "alpinejs";
	import {
		historyStore,
		loadFromHistory,
		deleteHistory,
	} from "../stores/reportStore";
	import { addToast } from "../stores/toastStore";
	document.addEventListener("alpine:init", () => {
		Alpine.data("historyApp", () => ({
			items: [],
			init() {
				this.items = historyStore.get().items;
				historyStore.subscribe((val) => {
					this.items = val.items;
				});
			},
			load(id) {
				if (
					confirm(
						"Load data ini? Data yang belum disimpan di form sekarang akan tertimpa.",
					)
				) {
					loadFromHistory(id);
					addToast("Data berhasil dimuat dari riwayat", "success");
				}
			},
			remove(id) {
				if (confirm("Hapus riwayat ini?")) {
					deleteHistory(id);
					addToast("Riwayat dihapus", "info");
				}
			},
		}));
	});
</script>

```

---

## ./src/components/ui/DocumentStats.astro

````astro
---
// src/components/ui/DocumentStats.astro
---

<div
	x-data="documentStats"
	x-show="hasContent"
	class="fixed top-20 right-8 z-20 no-print"
	x-transition:enter="transition ease-out duration-300"
	x-transition:enter-start="opacity-0 translate-x-4"
	x-transition:enter-end="opacity-100 translate-x-0"
	style="display: none;"
>
	<div class="glass-panel px-4 py-3 min-w-[200px]">
		<h4 class="text-xs font-bold text-slate-400 uppercase mb-3">
			Document Stats
		</h4>

		<div class="space-y-2">
			<!-- Words -->
			<div class="flex justify-between items-center">
				<span class="text-xs text-slate-300">Words</span>
				<span
					class="text-sm font-bold"
					:class="{
						'text-emerald-400': wordCount >= 1500 && wordCount <= 2500,
						'text-yellow-400': wordCount > 2500 || wordCount < 1500,
						'text-slate-400': wordCount === 0
					}"
					x-text="wordCount.toLocaleString()"
				></span>
			</div>

			<!-- Characters -->
			<div class="flex justify-between items-center">
				<span class="text-xs text-slate-300">Characters</span>
				<span class="text-sm font-medium text-slate-400" x-text="charCount.toLocaleString()">
				</span>
			</div>

			<!-- Paragraphs -->
			<div class="flex justify-between items-center">
				<span class="text-xs text-slate-300">Paragraphs</span>
				<span class="text-sm font-medium text-slate-400" x-text="paragraphCount">
				</span>
			</div>

			<!-- Tables -->
			<div class="flex justify-between items-center">
				<span class="text-xs text-slate-300">Tables</span>
				<span class="text-sm font-medium text-slate-400" x-text="tableCount">
				</span>
			</div>

			<!-- Reading Time -->
			<div class="flex justify-between items-center pt-2 border-t border-white/10">
				<span class="text-xs text-slate-300">Reading Time</span>
				<span class="text-sm font-medium text-blue-400" x-text="readingTime">
				</span>
			</div>

			<!-- Quality Indicator -->
			<div class="pt-2 border-t border-white/10">
				<div class="flex justify-between items-center mb-1">
					<span class="text-xs text-slate-300">Quality</span>
					<span class="text-xs font-medium" :class="qualityColor" x-text="quality">
					</span>
				</div>
				<div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
					<div
						class="h-full transition-all duration-500"
						:class="qualityBarColor"
						:style="`width: ${qualityScore}%`"
					></div>
				</div>
			</div>
		</div>
	</div>
</div>

<script>
	document.addEventListener("alpine:init", () => {
		Alpine.data("documentStats", () => ({
			wordCount: 0,
			charCount: 0,
			paragraphCount: 0,
			tableCount: 0,
			readingTime: "0 min",
			quality: "N/A",
			qualityScore: 0,
			qualityColor: "text-slate-400",
			qualityBarColor: "bg-slate-600",
			hasContent: false,

			init() {
				// Watch for content changes
				this.$watch("$store.appCore?.form?.output?.content", (content) => {
					if (content) {
						this.calculateStats(content);
						this.hasContent = true;
					} else {
						this.hasContent = false;
					}
				});

				// Initial calculation
				const content =
					window.Alpine?.store("appCore")?.form?.output?.content;
				if (content) {
					this.calculateStats(content);
					this.hasContent = true;
				}
			},

			calculateStats(content) {
				if (!content) return;

				// Remove markdown syntax for accurate counting
				const plainText = content
					.replace(/```[\s\S]*?```/g, "") // Remove code blocks
					.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // Remove links
					.replace(/[#*_`~\[\]]/g, "") // Remove markdown chars
					.replace(/\|/g, " "); // Remove table pipes

				// Word count
				const words = plainText
					.trim()
					.split(/\s+/)
					.filter((w) => w.length > 0);
				this.wordCount = words.length;

				// Character count (without spaces)
				this.charCount = plainText.replace(/\s/g, "").length;

				// Paragraph count
				this.paragraphCount = content
					.split("\n\n")
					.filter((p) => p.trim().length > 0).length;

				// Table count
				this.tableCount = (content.match(/\|.*\|/g) || []).length / 3; // Approx

				// Reading time (200 words per minute average)
				const minutes = Math.ceil(this.wordCount / 200);
				this.readingTime =
					minutes === 0 ? "< 1 min" : `${minutes} min`;

				// Quality assessment
				this.assessQuality();
			},

			assessQuality() {
				let score = 0;
				const reasons = [];

				// Word count criteria (1500-2500 is ideal)
				if (this.wordCount >= 1500 && this.wordCount <= 2500) {
					score += 30;
				} else if (this.wordCount > 2500) {
					score += 20;
					reasons.push("Too long");
				} else if (this.wordCount < 1500) {
					score += 10;
					reasons.push("Too short");
				}

				// Paragraph count (good structure)
				if (this.paragraphCount >= 10 && this.paragraphCount <= 30) {
					score += 20;
				} else {
					score += 10;
				}

				// Has tables (data presentation)
				if (this.tableCount >= 1) {
					score += 25;
				}

				// Character variety
				if (this.charCount > 0 && this.wordCount > 0) {
					const avgWordLength = this.charCount / this.wordCount;
					if (avgWordLength >= 5 && avgWordLength <= 7) {
						score += 25;
					} else {
						score += 15;
					}
				}

				this.qualityScore = Math.min(100, score);

				// Determine quality level
				if (this.qualityScore >= 80) {
					this.quality = "Excellent";
					this.qualityColor = "text-emerald-400";
					this.qualityBarColor = "bg-emerald-500";
				} else if (this.qualityScore >= 60) {
					this.quality = "Good";
					this.qualityColor = "text-blue-400";
					this.qualityBarColor = "bg-blue-500";
				} else if (this.qualityScore >= 40) {
					this.quality = "Fair";
					this.qualityColor = "text-yellow-400";
					this.qualityBarColor = "bg-yellow-500";
				} else {
					this.quality = "Poor";
					this.qualityColor = "text-red-400";
					this.qualityBarColor = "bg-red-500";
				}
			},
		}));
	});
</script>
````

---

## ./src/components/ui/ZoomControl.astro

```astro
---
// src/components/ui/ZoomControl.astro
---

<div
	x-data="zoomControl"
	class="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 no-print"
>
	<div
		class="glass-panel px-4 py-2 flex items-center gap-3 shadow-xl border border-white/10"
	>
		<!-- Zoom Out -->
		<button
			@click="zoomOut"
			:disabled="zoom <= 50"
			class="p-2 hover:bg-white/10 rounded transition disabled:opacity-30 disabled:cursor-not-allowed"
			title="Zoom Out (Ctrl + -)"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M20 12H4"></path>
			</svg>
		</button>

		<!-- Zoom Percentage -->
		<div class="flex items-center gap-2 min-w-[100px] justify-center">
			<input
				type="range"
				x-model="zoom"
				min="50"
				max="150"
				step="10"
				class="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
				style="accent-color: #3b82f6;"
			/>
			<span class="text-xs font-medium text-white w-10 text-right" x-text="zoom + '%'">
			</span>
		</div>

		<!-- Zoom In -->
		<button
			@click="zoomIn"
			:disabled="zoom >= 150"
			class="p-2 hover:bg-white/10 rounded transition disabled:opacity-30 disabled:cursor-not-allowed"
			title="Zoom In (Ctrl + +)"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 4v16m8-8H4"></path>
			</svg>
		</button>

		<div class="w-px h-6 bg-white/20"></div>

		<!-- Reset Zoom -->
		<button
			@click="resetZoom"
			class="px-3 py-1 text-xs font-medium hover:bg-white/10 rounded transition"
			title="Reset Zoom (Ctrl + 0)"
		>
			Reset
		</button>

		<!-- Fit to Width -->
		<button
			@click="fitToWidth"
			class="px-3 py-1 text-xs font-medium hover:bg-white/10 rounded transition"
			title="Fit to Width"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
				></path>
			</svg>
		</button>
	</div>
</div>

<script>
	document.addEventListener("alpine:init", () => {
		Alpine.data("zoomControl", () => ({
			zoom: 100,

			init() {
				// Apply zoom to document preview
				this.$watch("zoom", (value) => {
					const preview = document.getElementById("document-preview");
					if (preview) {
						preview.style.transform = `scale(${value / 100})`;
						preview.style.transformOrigin = "top center";
					}
				});

				// Keyboard shortcuts for zoom
				document.addEventListener("keydown", (e) => {
					if (e.ctrlKey || e.metaKey) {
						if (e.key === "=" || e.key === "+") {
							e.preventDefault();
							this.zoomIn();
						} else if (e.key === "-") {
							e.preventDefault();
							this.zoomOut();
						} else if (e.key === "0") {
							e.preventDefault();
							this.resetZoom();
						}
					}
				});

				// Mouse wheel zoom (with Ctrl)
				document.addEventListener(
					"wheel",
					(e) => {
						if (e.ctrlKey || e.metaKey) {
							e.preventDefault();
							if (e.deltaY < 0) {
								this.zoomIn();
							} else {
								this.zoomOut();
							}
						}
					},
					{ passive: false },
				);
			},

			zoomIn() {
				if (this.zoom < 150) {
					this.zoom = Math.min(150, this.zoom + 10);
				}
			},

			zoomOut() {
				if (this.zoom > 50) {
					this.zoom = Math.max(50, this.zoom - 10);
				}
			},

			resetZoom() {
				this.zoom = 100;
			},

			fitToWidth() {
				const preview = document.getElementById("document-preview");
				const container = preview?.parentElement;
				if (preview && container) {
					const containerWidth = container.clientWidth - 80; // padding
					const previewWidth = 210 * 3.7795275591; // 210mm to px
					const scale = (containerWidth / previewWidth) * 100;
					this.zoom = Math.round(Math.min(150, Math.max(50, scale)));
				}
			},
		}));
	});
</script>

<style>
	/* Custom range slider styling */
	input[type="range"]::-webkit-slider-thumb {
		appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #3b82f6;
		cursor: pointer;
	}

	input[type="range"]::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #3b82f6;
		cursor: pointer;
		border: none;
	}
</style>
```

---

## ./src/components/ui/AutoSaveIndicator.astro

```astro
---
// src/components/ui/AutoSaveIndicator.astro
---

<div
	x-data="autoSaveIndicator"
	x-show="visible"
	x-transition:enter="transition ease-out duration-300"
	x-transition:enter-start="opacity-0 translate-y-2"
	x-transition:enter-end="opacity-100 translate-y-0"
	x-transition:leave="transition ease-in duration-200"
	x-transition:leave-start="opacity-100 translate-y-0"
	x-transition:leave-end="opacity-0 translate-y-2"
	class="fixed bottom-4 right-4 z-50 no-print"
>
	<div
		class="flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg border backdrop-blur-md"
		:class="{
			'bg-emerald-500/10 border-emerald-500/20 text-emerald-400': status === 'saved',
			'bg-blue-500/10 border-blue-500/20 text-blue-400': status === 'saving',
			'bg-red-500/10 border-red-500/20 text-red-400': status === 'error'
		}"
	>
		<!-- Saving Animation -->
		<svg
			x-show="status === 'saving'"
			class="animate-spin h-4 w-4"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle
				class="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				stroke-width="4"></circle>
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			></path>
		</svg>

		<!-- Saved Icon -->
		<svg
			x-show="status === 'saved'"
			class="h-4 w-4"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M5 13l4 4L19 7"></path>
		</svg>

		<!-- Error Icon -->
		<svg
			x-show="status === 'error'"
			class="h-4 w-4"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 18L18 6M6 6l12 12"></path>
		</svg>

		<span class="text-xs font-medium" x-text="message"></span>
	</div>
</div>

<script>
	document.addEventListener("alpine:init", () => {
		Alpine.data("autoSaveIndicator", () => ({
			visible: false,
			status: "saving", // saving, saved, error
			message: "",
			timeout: null,

			init() {
				// Listen to custom events
				window.addEventListener("autosave:start", () => {
					this.show("saving", "Menyimpan...");
				});

				window.addEventListener("autosave:success", () => {
					this.show("saved", "Tersimpan");
					this.hideAfter(2000);
				});

				window.addEventListener("autosave:error", () => {
					this.show("error", "Gagal menyimpan");
					this.hideAfter(3000);
				});
			},

			show(status, message) {
				clearTimeout(this.timeout);
				this.status = status;
				this.message = message;
				this.visible = true;
			},

			hideAfter(delay) {
				this.timeout = setTimeout(() => {
					this.visible = false;
				}, delay);
			},
		}));
	});
</script>
```

---

## ./src/components/ui/Skeleton.astro

```astro
<div class="animate-pulse w-full max-w-3xl mx-auto p-4 space-y-4">
	<div class="flex gap-4 items-center border-b border-gray-200 pb-4">
		<div class="w-16 h-16 bg-slate-200 rounded-lg"></div>
		<div class="flex-1 space-y-2">
			<div class="h-4 bg-slate-200 rounded w-3/4 mx-auto"></div>
			<div class="h-3 bg-slate-200 rounded w-1/2 mx-auto"></div>
		</div>
	</div>
	<div class="h-6 bg-slate-200 rounded w-1/3 mx-auto my-6"></div>
	<div class="space-y-2">
		<div class="h-3 bg-slate-200 rounded w-full"></div>
		<div class="h-3 bg-slate-200 rounded w-full"></div>
		<div class="h-3 bg-slate-200 rounded w-5/6"></div>
	</div>
	<div class="border border-slate-200 rounded mt-6 p-2">
		<div class="h-8 bg-slate-100 mb-2 rounded"></div>
		<div class="h-4 bg-slate-50 mb-1 rounded"></div>
		<div class="h-4 bg-slate-50 mb-1 rounded"></div>
	</div>
</div>

```

---

## ./src/components/ui/ToastContainer.astro

```astro
<div
  x-data="toastContainer"
  class="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
>
  <template x-for="toast in toasts" :key="toast.id">
    <div
      class="pointer-events-auto px-4 py-3 rounded-lg shadow-lg border backdrop-blur-md flex items-center gap-3 animate-slide-in min-w-[300px]"
      :class="{
        'bg-emerald-500/10 border-emerald-500/20 text-emerald-400': toast.type === 'success',
        'bg-red-500/10 border-red-500/20 text-red-400': toast.type === 'error',
        'bg-blue-500/10 border-blue-500/20 text-blue-400': toast.type === 'info'
      }"
    >
      <span
        x-text="toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'"
        class="font-bold"></span>
      <span x-text="toast.message" class="text-sm font-medium"></span>
    </div>
  </template>
</div>

<script>
  import { $toasts } from '../../stores/toastStore';

  document.addEventListener('alpine:init', () => {
    Alpine.data('toastContainer', () => ({
      toasts: [],

      init() {
        // Subscribe ke toast store
        $toasts.subscribe((value) => {
          this.toasts = value;
        });
      }
    }));
  });
</script>

<style>
  .animate-slide-in {
    animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>
```

---

## ./src/components/ui/KeyboardShortcuts.astro

```astro
---
// src/components/ui/KeyboardShortcuts.astro
---

<div x-data="keyboardShortcuts" class="hidden">
	<!-- Shortcuts Help Modal -->
	<div
		x-show="showHelp"
		@click.away="showHelp = false"
		x-transition:enter="transition ease-out duration-200"
		x-transition:enter-start="opacity-0"
		x-transition:enter-end="opacity-100"
		x-transition:leave="transition ease-in duration-150"
		x-transition:leave-start="opacity-100"
		x-transition:leave-end="opacity-0"
		class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center no-print"
		style="display: none;"
	>
		<div
			@click.stop
			class="glass-panel p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto"
		>
			<div class="flex justify-between items-center mb-4">
				<h3 class="text-lg font-bold text-white">Keyboard Shortcuts</h3>
				<button
					@click="showHelp = false"
					class="text-slate-400 hover:text-white transition"
				>
					✕
				</button>
			</div>

			<div class="space-y-3 text-sm">
				<div class="flex justify-between items-center">
					<span class="text-slate-300">Generate Laporan</span>
					<kbd
						class="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-xs"
						>Ctrl + Enter</kbd
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-slate-300">Save Draft</span>
					<kbd
						class="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-xs"
						>Ctrl + S</kbd
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-slate-300">Export PDF</span>
					<kbd
						class="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-xs"
						>Ctrl + P</kbd
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-slate-300">Export DOCX</span>
					<kbd
						class="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-xs"
						>Ctrl + D</kbd
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-slate-300">Toggle History</span>
					<kbd
						class="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-xs"
						>Ctrl + H</kbd
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-slate-300">Switch Tab (Next)</span>
					<kbd
						class="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-xs"
						>Ctrl + →</kbd
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-slate-300">Switch Tab (Prev)</span>
					<kbd
						class="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-xs"
						>Ctrl + ←</kbd
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-slate-300">Show Shortcuts</span>
					<kbd
						class="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-xs"
						>Ctrl + /</kbd
					>
				</div>
			</div>
		</div>
	</div>
</div>

<script>
	document.addEventListener("alpine:init", () => {
		Alpine.data("keyboardShortcuts", () => ({
			showHelp: false,

			init() {
				// Register keyboard shortcuts
				document.addEventListener("keydown", (e) => {
					// Ctrl/Cmd key combinations
					if (e.ctrlKey || e.metaKey) {
						switch (e.key) {
							case "Enter":
								e.preventDefault();
								this.triggerGenerate();
								break;
							case "s":
								e.preventDefault();
								this.triggerSave();
								break;
							case "p":
								e.preventDefault();
								this.triggerExportPDF();
								break;
							case "d":
								e.preventDefault();
								this.triggerExportDOCX();
								break;
							case "h":
								e.preventDefault();
								this.triggerToggleHistory();
								break;
							case "ArrowRight":
								e.preventDefault();
								this.triggerNextTab();
								break;
							case "ArrowLeft":
								e.preventDefault();
								this.triggerPrevTab();
								break;
							case "/":
								e.preventDefault();
								this.showHelp = !this.showHelp;
								break;
						}
					}

					// Escape key
					if (e.key === "Escape") {
						this.showHelp = false;
					}
				});
			},

			triggerGenerate() {
				window.dispatchEvent(new CustomEvent("shortcut:generate"));
			},

			triggerSave() {
				window.dispatchEvent(new CustomEvent("shortcut:save"));
			},

			triggerExportPDF() {
				window.dispatchEvent(new CustomEvent("shortcut:export-pdf"));
			},

			triggerExportDOCX() {
				window.dispatchEvent(new CustomEvent("shortcut:export-docx"));
			},

			triggerToggleHistory() {
				window.dispatchEvent(new CustomEvent("shortcut:toggle-history"));
			},

			triggerNextTab() {
				window.dispatchEvent(new CustomEvent("shortcut:next-tab"));
			},

			triggerPrevTab() {
				window.dispatchEvent(new CustomEvent("shortcut:prev-tab"));
			},
		}));
	});
</script>
```

---

## ./src/components/ui/ProgressBar.astro

```astro
---
// src/components/ui/ProgressBar.astro
---

<div
	x-data="progressBar"
	x-show="isGenerating"
	x-transition:enter="transition ease-out duration-300"
	x-transition:enter-start="opacity-0 scale-95"
	x-transition:enter-end="opacity-100 scale-100"
	x-transition:leave="transition ease-in duration-200"
	x-transition:leave-start="opacity-100 scale-100"
	x-transition:leave-end="opacity-0 scale-95"
	class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center no-print"
	style="display: none;"
>
	<div class="glass-panel p-6 max-w-md w-full mx-4">
		<!-- Header -->
		<div class="flex items-center gap-3 mb-4">
			<div class="relative">
				<svg
					class="animate-spin h-8 w-8 text-blue-400"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			</div>
			<div class="flex-1">
				<h3 class="text-white font-bold">Generating Report</h3>
				<p class="text-xs text-slate-400" x-text="currentStep"></p>
			</div>
		</div>

		<!-- Progress Bar -->
		<div class="mb-4">
			<div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
				<div
					class="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-500 ease-out"
					:style="`width: ${progress}%`"
				></div>
			</div>
			<div class="flex justify-between items-center mt-2 text-xs">
				<span class="text-slate-400" x-text="`${progress}% complete`"></span>
				<span class="text-slate-400" x-text="estimatedTime"></span>
			</div>
		</div>

		<!-- Steps -->
		<div class="space-y-2">
			<template x-for="(step, index) in steps" :key="index">
				<div class="flex items-center gap-2 text-sm">
					<!-- Icon -->
					<div
						class="w-5 h-5 rounded-full flex items-center justify-center"
						:class="{
							'bg-blue-500': step.status === 'current',
							'bg-emerald-500': step.status === 'completed',
							'bg-slate-700': step.status === 'pending'
						}"
					>
						<svg
							x-show="step.status === 'completed'"
							class="w-3 h-3 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="3"
								d="M5 13l4 4L19 7"></path>
						</svg>
						<div
							x-show="step.status === 'current'"
							class="w-2 h-2 bg-white rounded-full animate-pulse"
						></div>
					</div>

					<!-- Label -->
					<span
						:class="{
							'text-white font-medium': step.status === 'current',
							'text-emerald-400': step.status === 'completed',
							'text-slate-500': step.status === 'pending'
						}"
						x-text="step.label"
					></span>
				</div>
			</template>
		</div>

		<!-- Cancel Button -->
		<button
			@click="cancel"
			class="mt-4 w-full py-2 text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg transition"
		>
			Cancel
		</button>
	</div>
</div>

<script>
	document.addEventListener("alpine:init", () => {
		Alpine.data("progressBar", () => ({
			isGenerating: false,
			progress: 0,
			currentStep: "",
			estimatedTime: "",
			steps: [
				{ label: "Validating data...", status: "pending" },
				{ label: "Connecting to AI...", status: "pending" },
				{ label: "Processing content...", status: "pending" },
				{ label: "Formatting document...", status: "pending" },
				{ label: "Finalizing...", status: "pending" },
			],
			startTime: null,
			progressInterval: null,

			init() {
				// Listen to generate events
				window.addEventListener("generate:start", () => {
					this.start();
				});

				window.addEventListener("generate:complete", () => {
					this.complete();
				});

				window.addEventListener("generate:error", () => {
					this.error();
				});
			},

			start() {
				this.isGenerating = true;
				this.progress = 0;
				this.startTime = Date.now();
				this.resetSteps();
				this.animateProgress();
			},

			animateProgress() {
				let currentStepIndex = 0;

				this.progressInterval = setInterval(() => {
					// Update progress
					if (this.progress < 90) {
						this.progress += Math.random() * 10;
						if (this.progress > 90) this.progress = 90;
					}

					// Update steps
					if (this.progress > currentStepIndex * 20) {
						if (currentStepIndex > 0) {
							this.steps[currentStepIndex - 1].status = "completed";
						}
						if (currentStepIndex < this.steps.length) {
							this.steps[currentStepIndex].status = "current";
							this.currentStep = this.steps[currentStepIndex].label;
							currentStepIndex++;
						}
					}

					// Update estimated time
					const elapsed = Date.now() - this.startTime;
					const estimated = (elapsed / this.progress) * (100 - this.progress);
					this.estimatedTime = `~${Math.ceil(estimated / 1000)}s remaining`;
				}, 500);
			},

			complete() {
				clearInterval(this.progressInterval);
				this.progress = 100;
				this.steps.forEach((step) => (step.status = "completed"));
				this.currentStep = "Complete!";
				this.estimatedTime = "Done";

				setTimeout(() => {
					this.isGenerating = false;
				}, 1000);
			},

			error() {
				clearInterval(this.progressInterval);
				this.isGenerating = false;
			},

			cancel() {
				clearInterval(this.progressInterval);
				this.isGenerating = false;
				window.dispatchEvent(new CustomEvent("generate:cancel"));
			},

			resetSteps() {
				this.steps.forEach((step) => (step.status = "pending"));
			},
		}));
	});
</script>
```

---

## ./src/services/exportService.ts

```typescript
// ============================================================================
// GENERATOR LAPORAN KINERJA PEGAWAI - EXPORT SERVICE
// Version: 1.0.0
// Supports: PDF, DOCX, Print
// ============================================================================

import type { ExportResult, AppStore } from "../types/ReportTypes";
import { reportStore, getFormattedTitimangsa } from "../stores/reportStore";

// ============================================================================
// PDF EXPORT with jsPDF and html2canvas
// ============================================================================

/**
 * Export dokumen ke PDF
 */
export const exportToPDF = async (): Promise<ExportResult> => {
	try {
		const element = document.getElementById("document-preview");
		if (!element) {
			throw new Error("Element document-preview tidak ditemukan");
		}

		// Dynamic import untuk mengurangi bundle size
		const html2pdf = (await import("html2pdf.js")).default;

		const opt = {
			margin: [1.5, 2, 1.5, 2], // [top, right, bottom, left] in cm
			filename: generatePDFFilename(),
			image: { type: "jpeg", quality: 0.98 },
			html2canvas: {
				scale: 2,
				useCORS: true,
				letterRendering: true,
			},
			jsPDF: {
				unit: "cm",
				format: "a4",
				orientation: "portrait",
			},
			pagebreak: {
				mode: ["avoid-all", "css", "legacy"],
				before: ".page-break-before",
				after: ".page-break-after",
				avoid: [".no-break", "tr", "table"],
			},
		};

		const pdf = await html2pdf().set(opt).from(element).save();

		return {
			success: true,
		};
	} catch (error: any) {
		console.error("PDF Export Error:", error);
		return {
			success: false,
			error: error.message || "Gagal export PDF",
		};
	}
};

/**
 * Generate PDF Blob (untuk upload atau preview)
 */
export const generatePDFBlob = async (): Promise<ExportResult> => {
	try {
		const element = document.getElementById("document-preview");
		if (!element) {
			throw new Error("Element document-preview tidak ditemukan");
		}

		const html2pdf = (await import("html2pdf.js")).default;

		const opt = {
			margin: [1.5, 2, 1.5, 2],
			image: { type: "jpeg", quality: 0.98 },
			html2canvas: { scale: 2, useCORS: true },
			jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
		};

		const pdfBlob = await html2pdf().set(opt).from(element).outputPdf("blob");

		return {
			success: true,
			file: pdfBlob,
		};
	} catch (error: any) {
		console.error("PDF Blob Generation Error:", error);
		return {
			success: false,
			error: error.message || "Gagal generate PDF blob",
		};
	}
};

// ============================================================================
// DOCX EXPORT with docx library
// ============================================================================

/**
 * Export dokumen ke DOCX
 */
export const exportToDOCX = async (): Promise<ExportResult> => {
	try {
		const store = reportStore.get();

		// Dynamic import
		const {
			Document,
			Packer,
			Paragraph,
			TextRun,
			Table,
			TableRow,
			TableCell,
			AlignmentType,
			HeadingLevel,
			WidthType,
			BorderStyle,
		} = await import("docx");
		const { saveAs } = await import("file-saver");

		// Parse content markdown ke paragraphs
		const doc = await buildDocxDocument(store);

		// Generate blob
		const blob = await Packer.toBlob(doc);

		// Save file
		saveAs(blob, generateDOCXFilename());

		return {
			success: true,
		};
	} catch (error: any) {
		console.error("DOCX Export Error:", error);
		return {
			success: false,
			error: error.message || "Gagal export DOCX",
		};
	}
};

/**
 * Build DOCX Document dari store data
 */
const buildDocxDocument = async (store: AppStore): Promise<any> => {
	const { Document, Paragraph, TextRun, AlignmentType, HeadingLevel } =
		await import("docx");

	const content = store.output.content;
	const lines = content.split("\n");

	const children: any[] = [];

	// Header (Kop Surat) - akan ditambahkan manual di sini
	children.push(
		new Paragraph({
			text: store.instansi.header1,
			alignment: AlignmentType.CENTER,
			heading: HeadingLevel.HEADING_1,
		}),
		new Paragraph({
			text: store.instansi.header2,
			alignment: AlignmentType.CENTER,
			heading: HeadingLevel.HEADING_2,
		}),
		new Paragraph({
			text: store.instansi.header3,
			alignment: AlignmentType.CENTER,
			heading: HeadingLevel.HEADING_2,
		}),
		new Paragraph({
			text: store.instansi.alamat,
			alignment: AlignmentType.CENTER,
		}),
		new Paragraph({
			text: "━".repeat(60),
			alignment: AlignmentType.CENTER,
		}),
		new Paragraph({ text: "" }), // Spacing
	);

	// Judul Laporan
	children.push(
		new Paragraph({
			text: "LAPORAN KINERJA PEGAWAI",
			alignment: AlignmentType.CENTER,
			heading: HeadingLevel.HEADING_1,
		}),
		new Paragraph({
			text: `Periode: ${getBulanName(parseInt(store.config.bulan))} ${store.config.tahun}`,
			alignment: AlignmentType.CENTER,
		}),
		new Paragraph({ text: "" }), // Spacing
	);

	// Parse markdown content (simplified)
	for (const line of lines) {
		if (line.startsWith("## ")) {
			children.push(
				new Paragraph({
					text: line.replace("## ", ""),
					heading: HeadingLevel.HEADING_1,
				}),
			);
		} else if (line.startsWith("### ")) {
			children.push(
				new Paragraph({
					text: line.replace("### ", ""),
					heading: HeadingLevel.HEADING_2,
				}),
			);
		} else if (line.trim() !== "") {
			children.push(new Paragraph({ text: line }));
		} else {
			children.push(new Paragraph({ text: "" }));
		}
	}

	// Footer (Tanda Tangan)
	children.push(
		new Paragraph({ text: "" }),
		new Paragraph({ text: "" }),
		new Paragraph({
			text: getFormattedTitimangsa(),
			alignment: AlignmentType.RIGHT,
		}),
		new Paragraph({
			text: "Pejabat Penilai,",
			alignment: AlignmentType.RIGHT,
		}),
		new Paragraph({ text: "" }),
		new Paragraph({ text: "" }),
		new Paragraph({ text: "" }),
		new Paragraph({
			text: store.instansi.kepala.nama,
			alignment: AlignmentType.RIGHT,
		}),
		new Paragraph({
			text: `NIP. ${store.instansi.kepala.nip}`,
			alignment: AlignmentType.RIGHT,
		}),
	);

	const doc = new Document({
		sections: [
			{
				properties: {
					page: {
						margin: {
							top: 1440, // 1 inch = 1440 twips
							right: 1440,
							bottom: 1440,
							left: 1440,
						},
					},
				},
				children,
			},
		],
	});

	return doc;
};

// ============================================================================
// PRINT FUNCTIONALITY
// ============================================================================

/**
 * Print dokumen
 */
export const printDocument = (): void => {
	window.print();
};

// ============================================================================
// FILENAME GENERATORS
// ============================================================================

/**
 * Generate filename untuk PDF
 */
const generatePDFFilename = (): string => {
	const store = reportStore.get();
	const nama = sanitizeFilename(store.pegawai.nama || "Pegawai");
	const bulan = store.config.bulan.padStart(2, "0");
	const tahun = store.config.tahun;

	return `Laporan_Kinerja_${nama}_${bulan}_${tahun}.pdf`;
};

/**
 * Generate filename untuk DOCX
 */
const generateDOCXFilename = (): string => {
	const store = reportStore.get();
	const nama = sanitizeFilename(store.pegawai.nama || "Pegawai");
	const bulan = store.config.bulan.padStart(2, "0");
	const tahun = store.config.tahun;

	return `Laporan_Kinerja_${nama}_${bulan}_${tahun}.docx`;
};

/**
 * Sanitize filename - remove invalid characters
 */
const sanitizeFilename = (name: string): string => {
	return name
		.replace(/[^a-zA-Z0-9_\-]/g, "_")
		.replace(/_+/g, "_")
		.substring(0, 50);
};

/**
 * Get nama bulan Indonesia
 */
const getBulanName = (bulan: number): string => {
	const namaBulan = [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember",
	];
	return namaBulan[bulan - 1] || "";
};

// ============================================================================
// UPLOAD TO GOOGLE DRIVE (Future Feature)
// ============================================================================

/**
 * Upload PDF ke Google Drive
 * TODO: Implement Google Drive API integration
 */
export const uploadToGoogleDrive = async (
	blob: Blob,
): Promise<ExportResult> => {
	// Placeholder untuk future implementation
	return {
		success: false,
		error: "Fitur ini akan tersedia di versi mendatang",
	};
};

/**
 * Generate shareable link
 * TODO: Implement link generation after upload
 */
export const generateShareableLink = async (): Promise<string> => {
	// Placeholder untuk future implementation
	return "";
};
```

---

## ./src/services/excelService.ts

```typescript
// ============================================================================
// GENERATOR LAPORAN KINERJA PEGAWAI - EXCEL SERVICE (ENHANCED)
// Version: 1.0.0
// ============================================================================

import * as XLSX from "xlsx";
import { reportStore } from "../stores/reportStore";
import type {
	AppStore,
	ImportExcelResult,
	ValidationError,
} from "../types/ReportTypes";

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
const applySheetStyling = (
	worksheet: XLSX.WorkSheet,
	headers: string[],
): void => {
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
export const importFromExcel = async (
	file: File,
): Promise<ImportExcelResult> => {
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
		const pegawaiData = XLSX.utils.sheet_to_json(
			workbook.Sheets["Data Pegawai"],
		);
		if (pegawaiData.length > 0) {
			result.pegawai = parsePegawaiData(pegawaiData[0] as any);
		}
	}

	// Parse Data Akademik
	if (workbook.Sheets["Data Akademik"]) {
		const akademikData = XLSX.utils.sheet_to_json(
			workbook.Sheets["Data Akademik"],
		);
		if (akademikData.length > 0) {
			result.akademik = parseAkademikData(akademikData[0] as any);
		}
	}

	// Parse Data Kinerja
	if (workbook.Sheets["Data Kinerja"]) {
		const kinerjaData = XLSX.utils.sheet_to_json(
			workbook.Sheets["Data Kinerja"],
		);
		if (kinerjaData.length > 0) {
			result.kinerja = parseKinerjaData(kinerjaData[0] as any);
		}
	}

	// Parse Data Instansi
	if (workbook.Sheets["Data Instansi"]) {
		const instansiData = XLSX.utils.sheet_to_json(
			workbook.Sheets["Data Instansi"],
		);
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
		...(imported.instansi && {
			instansi: { ...current.instansi, ...imported.instansi },
		}),
		...(imported.pegawai && {
			pegawai: { ...current.pegawai, ...imported.pegawai },
		}),
		...(imported.akademik && {
			akademik: { ...current.akademik, ...imported.akademik },
		}),
		...(imported.kinerja && {
			kinerja: { ...current.kinerja, ...imported.kinerja },
		}),
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
	const pegawaiSheet = XLSX.utils.json_to_sheet([
		{
			"Nama Lengkap": store.pegawai.nama,
			NIP: store.pegawai.nip,
			NUPTK: store.pegawai.nuptk,
			NIK: store.pegawai.nik,
			"Jenis Pegawai": store.pegawai.jenis,
			Status: store.pegawai.status,
			Golongan: store.pegawai.golongan,
			Jabatan: store.pegawai.jabatan,
			"Unit Kerja": store.pegawai.unitKerja,
			"Tempat Lahir": store.pegawai.tempatLahir,
			"Tanggal Lahir": store.pegawai.tanggalLahir,
			"Jenis Kelamin": store.pegawai.gender,
			Alamat: store.pegawai.alamat,
			"No. HP": store.pegawai.hp,
			Email: store.pegawai.email,
			"Pendidikan Terakhir": store.pegawai.pendidikan,
			"Masa Kerja (Tahun)": store.pegawai.masaKerjaTahun,
			"Masa Kerja (Bulan)": store.pegawai.masaKerjaBulan,
		},
	]);

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
): Promise<{
	success: boolean;
	imported: number;
	errors: ValidationError[];
}> => {
	// Placeholder untuk future implementation
	// This will allow importing multiple pegawai at once
	return {
		success: false,
		imported: 0,
		errors: [
			{
				field: "general",
				message: "Fitur ini akan tersedia di versi mendatang",
			},
		],
	};
};
```

---

## ./src/services/tteService.ts

```typescript
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
export const generateDocumentHash = async (
	store: AppStore,
): Promise<string> => {
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
```

---

## ./src/services/aiService.ts

````typescript
// ============================================================================
// GENERATOR LAPORAN KINERJA PEGAWAI - AI SERVICE (MULTI-MODEL)
// Version: 1.0.0
// Supports: Gemini, Claude, GPT, Groq
// ============================================================================

import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AppStore, AIModel, GenerateAIResult } from "../types/ReportTypes";
import {
	reportStore,
	updateStore,
	generateNomorDokumen,
} from "../stores/reportStore";

// ============================================================================
// API KEYS CONFIGURATION
// ============================================================================
const API_KEYS = {
	gemini: import.meta.env.PUBLIC_GEMINI_API_KEY || "",
	claude: import.meta.env.PUBLIC_CLAUDE_API_KEY || "",
	gpt: import.meta.env.PUBLIC_OPENAI_API_KEY || "",
	groq: import.meta.env.PUBLIC_GROQ_API_KEY || "",
};

// ============================================================================
// MODEL CONFIGURATIONS
// ============================================================================
const MODEL_CONFIGS = {
	gemini: {
		model: "gemini-3-flash-preview",
		maxTokens: 8000,
		temperature: 0.7,
	},
	claude: {
		model: "claude-sonnet-4-20250514",
		maxTokens: 4000,
		temperature: 0.7,
	},
	gpt: {
		model: "gpt-4-turbo-preview",
		maxTokens: 4000,
		temperature: 0.7,
	},
	groq: {
		model: "mixtral-8x7b-32768",
		maxTokens: 4000,
		temperature: 0.7,
	},
};

// ============================================================================
// PROMPT BUILDER
// ============================================================================

/**
 * Build System Prompt - Mendefinisikan role dan perilaku AI
 */
const buildSystemPrompt = (): string => {
	return `ROLE: Anda adalah Asisten Administrasi ASN (Aparatur Sipil Negara) Profesional yang ahli dalam menyusun dokumen laporan kinerja pegawai di lingkungan instansi pemerintah Indonesia.

EXPERTISE:
- Menguasai format dan struktur laporan kinerja pegawai ASN
- Memahami terminologi dan regulasi kepegawaian Indonesia
- Mampu menyusun narasi formal sesuai kaidah bahasa Indonesia yang baik dan benar
- Mengetahui standar dokumentasi administrasi pemerintahan

BEHAVIOR:
- Selalu menggunakan Bahasa Indonesia baku dan formal
- Menyusun kalimat dengan struktur yang jelas dan sistematis
- Menggunakan istilah teknis yang tepat sesuai konteks kepegawaian
- Objektif dan profesional dalam menyampaikan informasi

OUTPUT STANDARDS:
- Format: Markdown yang rapi dan terstruktur
- Tone: Formal birokrasi Indonesia
- Style: Objektif, faktual, dan profesional
- Length: Sesuai kebutuhan, tidak bertele-tele namun lengkap`;
};

/**
 * Build User Prompt - Konteks spesifik untuk generate laporan
 */
const buildUserPrompt = (store: AppStore): string => {
	const { pegawai, akademik, kinerja, config, instansi } = store;

	// Nama bulan dalam Bahasa Indonesia
	const namaBulan = new Date(
		parseInt(config.tahun),
		parseInt(config.bulan) - 1,
	).toLocaleString("id-ID", { month: "long" });

	// Build konteks akademik (jika pegawai adalah guru)
	let konteksAkademik = "";
	if (pegawai.jenis === "Guru" || pegawai.jenis === "GTT") {
		konteksAkademik = `

KONTEKS PEMBELAJARAN:
- Mata Pelajaran: ${akademik.mapel}
- Kelas: ${akademik.kelas}
- Kurikulum: ${akademik.kurikulum}
- Jumlah Siswa: ${akademik.jumlahSiswa} siswa
- Beban Mengajar: ${akademik.jamMengajar} jam pelajaran per minggu
- Ekstrakurikuler: ${akademik.ekskul || "Tidak ada"}
- Tahun Pelajaran: ${akademik.tahunPelajaran}
- Semester: ${akademik.semester}`;
	}

	const prompt = `TASK: Buat ISI LAPORAN KINERJA BULANAN (Tanpa Kop Surat dan Tanda Tangan)

===========================================
DATA PEGAWAI
===========================================
- Nama Lengkap: ${pegawai.nama}
- NIP: ${pegawai.nip}
- Jabatan: ${pegawai.jabatan}
- Golongan/Ruang: ${pegawai.golongan}
- Unit Kerja: ${pegawai.unitKerja}
- Jenis Kepegawaian: ${pegawai.jenis}
- Masa Kerja: ${pegawai.masaKerjaTahun} tahun ${pegawai.masaKerjaBulan} bulan

===========================================
PERIODE LAPORAN
===========================================
- Bulan: ${namaBulan} ${config.tahun}
- Tahun Pelajaran: ${akademik.tahunPelajaran}
- Semester: ${akademik.semester}
${konteksAkademik}

===========================================
DATA KINERJA
===========================================
Tugas Pokok:
${kinerja.tugasPokok}

Tugas Tambahan:
${kinerja.tugasTambahan}

Target Capaian Tahunan (IKU):
${kinerja.targetTahunan}

Target Kuantitatif:
${kinerja.targetKuantitatif || "Belum ditentukan"}

Target Kualitatif:
${kinerja.targetKualitatif || "Belum ditentukan"}

Hambatan/Kendala Bulan Ini:
${kinerja.hambatan || "Tidak ada hambatan yang signifikan"}

Solusi/Tindak Lanjut:
${kinerja.solusi || "Terus meningkatkan kualitas layanan dan kinerja"}

===========================================
INSTRUKSI OUTPUT
===========================================
1. JANGAN buat Kop Surat (sudah ada di sistem)
2. JANGAN buat bagian Tanda Tangan (sudah ada di sistem)
3. Format OUTPUT harus dalam MARKDOWN yang rapi
4. Gunakan Bahasa Indonesia Formal sesuai kaidah penulisan dokumen pemerintah

===========================================
STRUKTUR LAPORAN (WAJIB DIIKUTI)
===========================================

## BAB I: PENDAHULUAN

### 1.1 Latar Belakang
Jelaskan konteks tugas dan tanggung jawab pegawai dalam ${namaBulan} ${config.tahun}. Kaitkan dengan visi misi instansi ${instansi.header3}.

### 1.2 Tujuan Laporan
Tujuan penyusunan laporan kinerja ini adalah:
1. [Tujuan 1]
2. [Tujuan 2]
3. [Tujuan 3]

### 1.3 Ruang Lingkup
Laporan ini mencakup pelaksanaan tugas dan kinerja selama bulan ${namaBulan} ${config.tahun}.

---

## BAB II: PELAKSANAAN TUGAS BULANAN

### 2.1 Uraian Tugas Pokok
[Jelaskan pelaksanaan tugas pokok berdasarkan data kinerja di atas]

### 2.2 Tugas Tambahan
[Jelaskan pelaksanaan tugas tambahan berdasarkan data di atas]

### 2.3 Rincian Kegiatan Harian

Berikut adalah rincian kegiatan yang dilaksanakan selama bulan ${namaBulan} ${config.tahun}:

| No | Tanggal | Uraian Kegiatan | Output/Hasil | Keterangan |
|:--:|:-------:|-----------------|--------------|------------|
| 1 | ${config.tahun}-${config.bulan.padStart(2, "0")}-01 | [Kegiatan hari 1] | [Output 1] | [Ket] |
| 2 | ${config.tahun}-${config.bulan.padStart(2, "0")}-02 | [Kegiatan hari 2] | [Output 2] | [Ket] |

**PENTING:** 
- Buat minimal 15-20 baris kegiatan yang variatif dan realistis
- Tanggal harus tersebar di sepanjang bulan ${namaBulan}
- Kegiatan harus relevan dengan tugas pokok dan jabatan
- Output harus konkret dan terukur
- Hindari kegiatan yang repetitif

---

## BAB III: CAPAIAN KINERJA DAN EVALUASI

### 3.1 Capaian Target
Berdasarkan target IKU "${kinerja.targetTahunan}", berikut adalah capaian kinerja bulan ini:

1. **Aspek Kuantitatif**
   - [Jelaskan capaian kuantitatif]
   
2. **Aspek Kualitatif**
   - [Jelaskan capaian kualitatif]

### 3.2 Analisis Kinerja
[Analisis objektif terhadap kinerja yang telah dilaksanakan]

### 3.3 Hambatan dan Kendala
${kinerja.hambatan ? `Dalam pelaksanaan tugas bulan ${namaBulan} ${config.tahun}, ditemukan beberapa hambatan:\n\n${kinerja.hambatan}` : `Seluruh kegiatan pada bulan ${namaBulan} ${config.tahun} berjalan dengan lancar tanpa hambatan yang berarti.`}

### 3.4 Solusi dan Tindak Lanjut
${kinerja.solusi ? `Untuk mengatasi hambatan tersebut, telah dilakukan upaya:\n\n${kinerja.solusi}` : `Untuk periode selanjutnya, akan terus dilakukan upaya peningkatan kualitas layanan dan optimalisasi kinerja.`}

---

## BAB IV: PENUTUP

### 4.1 Kesimpulan
[Simpulkan secara singkat pelaksanaan kinerja bulan ${namaBulan} ${config.tahun}]

### 4.2 Rekomendasi
[Berikan rekomendasi untuk perbaikan di bulan berikutnya]

---

**CATATAN PENTING:**
- Demikian laporan kinerja ini dibuat dengan sebenar-benarnya
- Laporan ini dapat digunakan sebagai bahan evaluasi dan perencanaan bulan berikutnya

===========================================
INSTRUKSI TAMBAHAN DARI USER
===========================================
${config.customInstruction || "Tidak ada instruksi tambahan"}

===========================================
QUALITY CHECKLIST
===========================================
Pastikan output Anda memenuhi kriteria:
✓ Bahasa Indonesia baku dan formal
✓ Struktur BAB I-IV lengkap
✓ Tabel kegiatan minimal 15 baris dengan tanggal variatif
✓ Konten relevan dengan data pegawai dan tugas
✓ Output terukur dan konkret
✓ Tidak ada placeholder atau [...]
✓ Total panjang dokumen 1500-2500 kata

MULAI GENERATE SEKARANG!`;

	return prompt;
};

// ============================================================================
// AI MODEL GENERATORS
// ============================================================================

/**
 * Generate dengan Google Gemini
 */
const generateWithGemini = async (
	systemPrompt: string,
	userPrompt: string,
): Promise<GenerateAIResult> => {
	const apiKey = API_KEYS.gemini;
	if (!apiKey) {
		return {
			success: false,
			error: "API Key Gemini tidak ditemukan. Silakan cek file .env",
		};
	}

	try {
		const genAI = new GoogleGenerativeAI(apiKey);
		const config = MODEL_CONFIGS.gemini;
		const model = genAI.getGenerativeModel({
			model: config.model,
			systemInstruction: systemPrompt,
		});

		const result = await model.generateContent({
			contents: [{ role: "user", parts: [{ text: userPrompt }] }],
			generationConfig: {
				temperature: config.temperature,
				maxOutputTokens: config.maxTokens,
			},
		});

		const response = result.response;
		let text = response.text();

		// Clean markdown code blocks
		text = text
			.replace(/^```markdown\s*/i, "")
			.replace(/^```\s*/i, "")
			.replace(/```\s*$/i, "")
			.trim();

		return {
			success: true,
			content: text,
			tokensUsed: response.usageMetadata?.totalTokenCount || 0,
		};
	} catch (error: any) {
		console.error("Gemini Error:", error);
		return {
			success: false,
			error: error.message || "Gagal menghubungi Gemini API",
		};
	}
};

/**
 * Generate dengan Anthropic Claude
 */
const generateWithClaude = async (
	systemPrompt: string,
	userPrompt: string,
): Promise<GenerateAIResult> => {
	const apiKey = API_KEYS.claude;
	if (!apiKey) {
		return {
			success: false,
			error: "API Key Claude tidak ditemukan. Silakan cek file .env",
		};
	}

	try {
		const config = MODEL_CONFIGS.claude;
		const response = await fetch("https://api.anthropic.com/v1/messages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": apiKey,
				"anthropic-version": "2023-06-01",
			},
			body: JSON.stringify({
				model: config.model,
				max_tokens: config.maxTokens,
				temperature: config.temperature,
				system: systemPrompt,
				messages: [
					{
						role: "user",
						content: userPrompt,
					},
				],
			}),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error?.message || "Claude API request failed");
		}

		const data = await response.json();
		const text = data.content[0].text;

		return {
			success: true,
			content: text,
			tokensUsed: data.usage.input_tokens + data.usage.output_tokens,
		};
	} catch (error: any) {
		console.error("Claude Error:", error);
		return {
			success: false,
			error: error.message || "Gagal menghubungi Claude API",
		};
	}
};

/**
 * Generate dengan OpenAI GPT
 */
const generateWithGPT = async (
	systemPrompt: string,
	userPrompt: string,
): Promise<GenerateAIResult> => {
	const apiKey = API_KEYS.gpt;
	if (!apiKey) {
		return {
			success: false,
			error: "API Key OpenAI tidak ditemukan. Silakan cek file .env",
		};
	}

	try {
		const config = MODEL_CONFIGS.gpt;
		const response = await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				model: config.model,
				max_tokens: config.maxTokens,
				temperature: config.temperature,
				messages: [
					{ role: "system", content: systemPrompt },
					{ role: "user", content: userPrompt },
				],
			}),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error?.message || "OpenAI API request failed");
		}

		const data = await response.json();
		const text = data.choices[0].message.content;

		return {
			success: true,
			content: text,
			tokensUsed: data.usage.total_tokens,
		};
	} catch (error: any) {
		console.error("GPT Error:", error);
		return {
			success: false,
			error: error.message || "Gagal menghubungi OpenAI API",
		};
	}
};

/**
 * Generate dengan Groq
 */
const generateWithGroq = async (
	systemPrompt: string,
	userPrompt: string,
): Promise<GenerateAIResult> => {
	const apiKey = API_KEYS.groq;
	if (!apiKey) {
		return {
			success: false,
			error: "API Key Groq tidak ditemukan. Silakan cek file .env",
		};
	}

	try {
		const config = MODEL_CONFIGS.groq;
		const response = await fetch(
			"https://api.groq.com/openai/v1/chat/completions",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`,
				},
				body: JSON.stringify({
					model: config.model,
					max_tokens: config.maxTokens,
					temperature: config.temperature,
					messages: [
						{ role: "system", content: systemPrompt },
						{ role: "user", content: userPrompt },
					],
				}),
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error?.message || "Groq API request failed");
		}

		const data = await response.json();
		const text = data.choices[0].message.content;

		return {
			success: true,
			content: text,
			tokensUsed: data.usage.total_tokens,
		};
	} catch (error: any) {
		console.error("Groq Error:", error);
		return {
			success: false,
			error: error.message || "Gagal menghubungi Groq API",
		};
	}
};

// ============================================================================
// MAIN GENERATE FUNCTION
// ============================================================================

/**
 * Generate Laporan - Multi Model Support
 */
export const generateLaporan = async (
	model?: AIModel,
): Promise<GenerateAIResult> => {
	const store = reportStore.get();
	const selectedModel = model || store.config.modelAI;

	// Build prompts
	const systemPrompt = buildSystemPrompt();
	const userPrompt = buildUserPrompt(store);

	// Select generator based on model
	let result: GenerateAIResult;

	switch (selectedModel) {
		case "gemini":
			result = await generateWithGemini(systemPrompt, userPrompt);
			break;
		case "claude":
			result = await generateWithClaude(systemPrompt, userPrompt);
			break;
		case "gpt":
			result = await generateWithGPT(systemPrompt, userPrompt);
			break;
		case "groq":
			result = await generateWithGroq(systemPrompt, userPrompt);
			break;
		default:
			result = {
				success: false,
				error: `Model AI "${selectedModel}" tidak didukung`,
			};
	}

	// Update store jika berhasil
	if (result.success && result.content) {
		const nomorDokumen = generateNomorDokumen();
		const timestamp = new Date().toISOString();

		updateStore("output", {
			...store.output,
			content: result.content,
			lastUpdated: timestamp,
			titimangsa: {
				...store.output.titimangsa,
				tanggal: new Date().toLocaleDateString("id-ID", {
					day: "numeric",
					month: "long",
					year: "numeric",
				}),
			},
			tte: {
				...store.output.tte,
				nomorDokumen,
				timestamp,
			},
		});
	}

	return result;
};

/**
 * Check API Key availability
 */
export const checkAPIKey = (model: AIModel): boolean => {
	return !!API_KEYS[model];
};

/**
 * Get available models
 */
export const getAvailableModels = (): AIModel[] => {
	const available: AIModel[] = [];

	if (API_KEYS.gemini) available.push("gemini");
	if (API_KEYS.claude) available.push("claude");
	if (API_KEYS.gpt) available.push("gpt");
	if (API_KEYS.groq) available.push("groq");

	return available;
};
````

---

## ./src/pages/index.astro

```astro
---
// ============================================================================
// GENERATOR LAPORAN KINERJA PEGAWAI - MAIN PAGE
// Version: 1.0.0
// ============================================================================

import Layout from "../layouts/Layout.astro";
import FormInstansi from "../components/forms/FormInstansi.astro";
import FormPegawai from "../components/forms/FormPegawai.astro";
import FormAkademik from "../components/forms/FormAkademik.astro";
import FormKinerja from "../components/forms/FormKinerja.astro";
import SelectGroup from "../components/forms/SelectGroup.astro";
import InputGroup from "../components/InputGroup.astro";
import ToastContainer from "../components/ui/ToastContainer.astro";
import AutoSaveIndicator from "../components/ui/AutoSaveIndicator.astro";
import KeyboardShortcuts from "../components/ui/KeyboardShortcuts.astro";
import ZoomControl from "../components/ui/ZoomControl.astro";
import ProgressBar from "../components/ui/ProgressBar.astro";
import DocumentStats from "../components/ui/DocumentStats.astro";
import {
	Bot,
	FileSpreadsheet,
	RefreshCw,
	Printer,
	Save,
	AlertCircle,
	Download,
	FileText,
	Settings,
	History,
} from "@lucide/astro";
---

<Layout title="Generator Laporan Kinerja Pegawai AI - v1.0.0">
	<ToastContainer />
	<AutoSaveIndicator />
	<KeyboardShortcuts />
	<ZoomControl />
	<ProgressBar />
	<DocumentStats />
	<main class="w-full min-h-screen flex flex-col bg-[#0f172a]" x-data="appCore">
		<!-- TOPBAR -->
		<header
			class="h-16 border-b border-white/10 bg-slate-900/90 backdrop-blur flex items-center justify-between px-6 fixed top-0 w-full z-40 no-print shadow-md"
		>
			<div class="flex items-center gap-3">
				<div
					class="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg shadow-lg shadow-blue-500/20"
				>
					<Bot class="text-white w-5 h-5" />
				</div>
				<div>
					<h1 class="text-sm font-bold text-white tracking-wide">
						E-KINERJA AI
					</h1>
					<p class="text-[10px] text-slate-400">Ver 1.0.0 Stable</p>
				</div>
			</div>

			<div class="flex items-center gap-2">
				<!-- Download Template -->
				<button
					@click="downloadTemplate"
					class="px-3 py-1.5 bg-slate-800 text-slate-300 border border-slate-700 rounded-md text-xs font-medium hover:bg-slate-700 transition flex items-center gap-2"
					title="Download Template Excel"
				>
					<Download class="w-3.5 h-3.5" /> Template
				</button>

				<!-- Import Excel -->
				<label
					class="px-3 py-1.5 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-md text-xs font-medium cursor-pointer hover:bg-emerald-600/30 transition flex items-center gap-2"
				>
					<FileSpreadsheet class="w-3.5 h-3.5" /> Import
					<input
						type="file"
						class="hidden"
						accept=".xlsx,.xls"
						@change="handleImportExcel"
					/>
				</label>

				<div class="h-6 w-px bg-white/10 mx-2"></div>

				<!-- Export Buttons -->
				<button
					@click="exportPDF"
					class="px-3 py-1.5 bg-red-600/20 text-red-400 border border-red-500/30 rounded-md text-xs font-medium hover:bg-red-600/30 transition flex items-center gap-2"
					title="Export PDF"
				>
					<FileText class="w-3.5 h-3.5" /> PDF
				</button>

				<button
					@click="exportDOCX"
					class="px-3 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-md text-xs font-medium hover:bg-blue-600/30 transition flex items-center gap-2"
					title="Export DOCX"
				>
					<FileText class="w-3.5 h-3.5" /> DOCX
				</button>

				<div class="h-6 w-px bg-white/10 mx-2"></div>

				<!-- Save Draft -->
				<button
					@click="saveDraft"
					class="text-slate-400 hover:text-white transition"
					title="Simpan Draft"
				>
					<Save class="w-5 h-5" />
				</button>

				<!-- History -->
				<button
					@click="toggleHistory"
					class="text-slate-400 hover:text-white transition"
					title="Riwayat"
				>
					<History class="w-5 h-5" />
				</button>
			</div>
		</header>

		<!-- MAIN CONTENT AREA -->
		<div class="flex-1 mt-16 flex overflow-hidden h-[calc(100vh-64px)]">
			<!-- LEFT SIDEBAR - FORM INPUT -->
			<aside
				class="w-[420px] flex flex-col border-r border-white/10 bg-slate-900 overflow-hidden no-print z-30 shadow-[4px_0_24px_rgba(0,0,0,0.4)]"
			>
				<!-- Periode & AI Config -->
				<div class="p-4 bg-slate-800/50 border-b border-white/5 space-y-3">
					<!-- Periode Laporan -->
					<div class="grid grid-cols-2 gap-2">
						<SelectGroup
							label="Bulan"
							name="bln"
							model="form.config.bulan"
							options={Array.from({ length: 12 }, (_, i) => ({
								val: String(i + 1),
								label: new Date(0, i).toLocaleString("id-ID", {
									month: "long",
								}),
							}))}
						/>
						<InputGroup
							label="Tahun"
							name="thn"
							model="form.config.tahun"
							type="number"
						/>
					</div>

					<!-- AI Model Selection -->
					<div>
						<SelectGroup
							label="Model AI"
							name="ai"
							model="form.config.modelAI"
							options={[
								{ val: "gemini", label: "Google Gemini (Recommended)" },
								{ val: "claude", label: "Anthropic Claude" },
								{ val: "gpt", label: "OpenAI GPT-4" },
								{ val: "groq", label: "Groq (Fast)" },
							]}
						/>
						<p
							class="text-[10px] text-slate-500 mt-1"
							x-show="!hasAPIKey(form.config.modelAI)"
						>
							⚠️ API Key belum diatur untuk model ini
						</p>
					</div>

					<!-- Token Limit -->
					<div>
						<InputGroup
							label="Token Limit"
							name="tkn"
							model="form.config.tokenLimit"
							type="number"
						/>
					</div>
				</div>

				<!-- Form Tabs -->
				<div class="flex border-b border-white/5 bg-slate-950/30">
					<template x-for="tab in tabs" :key="tab.id">
						<button
							@click="activeTab = tab.id"
							:class="activeTab === tab.id ? 'text-blue-400 border-b-2 border-blue-400 bg-white/5' : 'text-slate-500 hover:text-slate-300'"
							class="flex-1 py-3 text-xs font-medium transition text-center"
							x-text="tab.label"
						>
						</button>
					</template>
				</div>

				<!-- Form Content Area -->
				<div class="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
					<div x-show="activeTab === 'instansi'" x-transition>
						<FormInstansi />
					</div>

					<div x-show="activeTab === 'pegawai'" x-transition>
						<FormPegawai />
					</div>

					<div x-show="activeTab === 'akademik'" x-transition>
						<div
							x-show="form.pegawai.jenis !== 'Guru' && form.pegawai.jenis !== 'GTT'"
							class="text-center p-6 border border-dashed border-white/10 rounded"
						>
							<AlertCircle class="w-8 h-8 text-slate-600 mx-auto mb-2" />
							<p class="text-xs text-slate-500">
								Data akademik khusus untuk Jabatan Guru/GTT
							</p>
						</div>
						<div
							x-show="form.pegawai.jenis === 'Guru' || form.pegawai.jenis === 'GTT'"
						>
							<FormAkademik />
						</div>
					</div>

					<div x-show="activeTab === 'kinerja'" x-transition>
						<FormKinerja />
					</div>

					<div x-show="activeTab === 'advanced'" x-transition>
						<div class="space-y-4">
							<h3
								class="text-xs font-bold text-blue-400 uppercase tracking-widest"
							>
								Instruksi Tambahan AI
							</h3>
							<textarea
								x-model="form.config.customInstruction"
								placeholder="Tambahkan instruksi khusus untuk AI (opsional)..."
								rows="6"
								class="w-full bg-slate-950/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 resize-none custom-scrollbar"
							></textarea>
							<p class="text-[10px] text-slate-500">
								Contoh: "Fokuskan pada pencapaian target IKU" atau "Tambahkan
								analisis SWOT"
							</p>
						</div>
					</div>
				</div>

				<!-- Generate Button -->
				<div class="p-4 border-t border-white/10 bg-slate-900 z-50">
					<button
						@click="generateLaporan"
						:disabled="loading || !canGenerate()"
						class="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white font-bold text-sm shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 transition-all active:scale-[0.98]"
					>
						<RefreshCw :class="loading && 'animate-spin'" class="w-4 h-4" />
						<span
							x-text="loading ? 'AI Sedang Bekerja...' : 'GENERATE LAPORAN'"
						>
						</span>
					</button>

					<!-- Validation Errors -->
					<div
						x-show="validationErrors.length > 0"
						class="mt-2 p-2 bg-red-500/10 border border-red-500/30 rounded text-xs text-red-400"
					>
						<template x-for="error in validationErrors">
							<div x-text="'• ' + error"></div>
						</template>
					</div>
				</div>
			</aside>

			<!-- RIGHT CONTENT - PREVIEW -->
			<section
				class="flex-1 bg-slate-200 overflow-y-auto relative flex flex-col items-center py-10 print:p-0 print:bg-white custom-scrollbar"
			>
				<!-- Floating Toolbar -->
				<div class="fixed top-24 right-8 z-20 flex flex-col gap-3 no-print">
					<button
						@click="printDoc"
						:disabled="!hasContent()"
						class="p-3 bg-slate-800 text-white rounded-full shadow-xl hover:bg-slate-700 transition hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
						title="Print Dokumen"
					>
						<Printer class="w-6 h-6" />
					</button>
				</div>

				<!-- A4 Paper Preview -->
				<div
					id="document-preview"
					class="w-[210mm] min-h-[297mm] bg-white shadow-2xl print:shadow-none p-[2cm] text-black relative origin-top transition-transform duration-300"
				>
					<!-- Loading Overlay -->
					<div
						x-show="loading"
						class="absolute inset-0 bg-white/90 z-50 flex flex-col items-center justify-center backdrop-blur-[2px]"
					>
						<div
							class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"
						>
						</div>
						<p class="text-sm text-slate-600 font-medium">
							AI sedang menyusun laporan...
						</p>
						<p class="text-xs text-slate-400 mt-1">
							Menganalisis kinerja & membuat narasi profesional
						</p>
					</div>

					<!-- KOP SURAT -->
					<header
						class="border-b-4 border-double border-black mb-6 pb-2 grid grid-cols-[80px_1fr_80px] gap-2 items-center"
					>
						<!-- Logo Kiri -->
						<div class="h-20 flex items-center justify-center">
							<template x-if="form.instansi.logoUtama">
								<img
									:src="form.instansi.logoUtama"
									class="max-w-full max-h-full object-contain"
									alt="Logo Utama"
								/>
							</template>
						</div>

						<!-- Header Text (Tengah) -->
						<div class="text-center uppercase leading-tight">
							<h3 class="font-bold text-lg" x-text="form.instansi.header1"></h3>
							<h2 class="font-bold text-xl" x-text="form.instansi.header2"></h2>
							<h1 class="font-bold text-2xl" x-text="form.instansi.header3">
							</h1>
							<p
								class="text-xs normal-case mt-1 font-serif"
								x-text="form.instansi.alamat"
							>
							</p>
							<p class="text-[10px] mt-0.5">
								<span x-text="form.instansi.telepon"></span> |
								<span x-text="form.instansi.email"></span> |
								<span x-text="form.instansi.website"></span>
							</p>
						</div>

						<!-- Logo Kanan -->
						<div class="h-20 flex items-center justify-center">
							<template x-if="form.instansi.logoInstansi">
								<img
									:src="form.instansi.logoInstansi"
									class="max-w-full max-h-full object-contain"
									alt="Logo Instansi"
								/>
							</template>
						</div>
					</header>

					<!-- JUDUL LAPORAN -->
					<div class="text-center mb-8">
						<h2 class="font-bold underline uppercase text-lg">
							LAPORAN KINERJA PEGAWAI
						</h2>
						<p class="text-sm font-medium mt-1">
							Periode: <span x-text="getBulanName(form.config.bulan)"></span>
							<span x-text="form.config.tahun"></span>
						</p>
					</div>

					<!-- CONTENT AREA -->
					<div
						x-show="!hasContent()"
						class="h-96 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50"
					>
						<Bot class="w-12 h-12 text-slate-300 mb-2" />
						<p class="text-sm text-slate-500 font-medium">
							Preview dokumen kosong
						</p>
						<p class="text-xs text-slate-400 mt-1">
							Isi form dan klik "Generate Laporan" untuk memulai
						</p>
					</div>

					<article
						class="prose-report text-justify leading-relaxed font-serif"
						x-html="renderedHTML"
						x-show="hasContent()"
					>
					</article>

					<!-- TANDA TANGAN -->
					<div
						x-show="hasContent()"
						class="mt-12 flex justify-end break-inside-avoid"
					>
						<div class="text-center w-64">
							<p class="mb-1">
								<span x-text="form.instansi.titimangsa"></span>, <span
									x-text="getCurrentDate()"></span>
							</p>
							<p class="font-bold mb-2">Pejabat Penilai,</p>

							<!-- TTD Digital Area -->
							<div class="h-20 flex items-center justify-center my-1">
								<template x-if="form.instansi.kepala.ttd">
									<img
										:src="form.instansi.kepala.ttd"
										class="max-h-20 object-contain"
										alt="TTD"
									/>
								</template>
								<template x-if="!form.instansi.kepala.ttd">
									<div
										class="border-2 border-slate-200 p-1 bg-slate-50 opacity-60 rounded"
									>
										<div
											class="w-16 h-16 flex flex-col items-center justify-center text-[8px] text-center text-slate-400"
										>
											<div class="w-8 h-8 bg-slate-300 mb-1 rounded-sm"></div>
											DIGITAL SIGN
										</div>
									</div>
								</template>
							</div>

							<p
								class="font-bold underline uppercase text-sm"
								x-text="form.instansi.kepala.nama"
							>
							</p>
							<p class="text-sm">
								NIP. <span x-text="form.instansi.kepala.nip"></span>
							</p>
						</div>
					</div>
				</div>

				<!-- Bottom Spacer -->
				<div class="h-20 w-full no-print"></div>
			</section>
		</div>

		<!-- History Sidebar (Slide from right) -->
		<div
			x-show="showHistory"
			@click.away="showHistory = false"
			x-transition:enter="transition ease-out duration-300"
			x-transition:enter-start="translate-x-full"
			x-transition:enter-end="translate-x-0"
			x-transition:leave="transition ease-in duration-200"
			x-transition:leave-start="translate-x-0"
			x-transition:leave-end="translate-x-full"
			class="fixed right-0 top-16 bottom-0 w-80 bg-slate-900 border-l border-white/10 z-30 overflow-y-auto custom-scrollbar no-print"
		>
			<div class="p-4">
				<div class="flex justify-between items-center mb-4">
					<h3 class="text-white font-bold flex items-center gap-2">
						<History class="w-4 h-4" /> Riwayat
					</h3>
					<button
						@click="showHistory = false"
						class="text-slate-500 hover:text-white"
					>
						✕
					</button>
				</div>

				<!-- History List -->
				<div class="space-y-2">
					<template x-if="historyItems.length === 0">
						<div class="text-center text-slate-500 text-sm py-8">
							Belum ada riwayat tersimpan
						</div>
					</template>

					<template x-for="item in historyItems" :key="item.id">
						<div
							class="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 transition group"
						>
							<div class="flex justify-between items-start mb-1">
								<span
									class="text-xs text-blue-400"
									x-text="formatDate(item.date)"
								>
								</span>
								<button
									@click="deleteHistoryItem(item.id)"
									class="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
								>
									✕
								</button>
							</div>
							<div
								class="text-sm font-medium text-slate-200 mb-2"
								x-text="item.title"
							>
							</div>
							<button
								@click="loadHistoryItem(item.id)"
								class="w-full py-1.5 text-xs bg-white/5 hover:bg-blue-500/20 hover:text-blue-300 rounded border border-transparent hover:border-blue-500/30 transition"
							>
								Muat Data
							</button>
						</div>
					</template>
				</div>
			</div>
		</div>
	</main>
</Layout>
<script>
	import { reportStore, historyStore, saveToHistory, loadFromHistory, deleteHistory, validateBeforeGenerate } from "../stores/reportStore";
	import { generateLaporan, checkAPIKey } from "../services/aiService";
	import { importFromExcel, downloadTemplate } from "../services/excelService";
	import { exportToPDF, exportToDOCX, printDocument } from "../services/exportService";
	import { parseMarkdown } from "../utils/markdown";
	import { addToast } from "../stores/toastStore";

	document.addEventListener("alpine:init", () => {
		Alpine.data("appCore", () => ({
			// State
			tabs: [
				{ id: "instansi", label: "1. Instansi" },
				{ id: "pegawai", label: "2. Pegawai" },
				{ id: "akademik", label: "3. Akademik" },
				{ id: "kinerja", label: "4. Kinerja" },
				{ id: "advanced", label: "5. Advanced" }
			],
			activeTab: "pegawai",
			form: reportStore.get(),
			loading: false,
			renderedHTML: "",
			showHistory: false,
			historyItems: [],
			validationErrors: [],

			// Initialize
			async init() {
				// Load rendered content jika sudah ada
				if (this.form.output.content) {
					this.renderedHTML = await parseMarkdown(this.form.output.content);
				}

				// Load history
				this.historyItems = historyStore.get().items;
				historyStore.subscribe((val) => {
					this.historyItems = val.items;
				});

				// Auto-save dengan debounce
				let timeout;
				this.$watch("form", (val) => {
					clearTimeout(timeout);
					window.dispatchEvent(new CustomEvent("autosave:start"));

					timeout = setTimeout(() => {
						try {
							reportStore.set(JSON.parse(JSON.stringify(val)));
							window.dispatchEvent(new CustomEvent("autosave:success"));
						} catch (error) {
							window.dispatchEvent(new CustomEvent("autosave:error"));
						}
					}, 800);
				});

				// Register keyboard shortcuts
				this.registerShortcuts();
			},

			// Keyboard shortcuts
			registerShortcuts() {
				window.addEventListener("shortcut:generate", () => this.generateLaporan());
				window.addEventListener("shortcut:save", () => this.saveDraft());
				window.addEventListener("shortcut:export-pdf", () => this.exportPDF());
				window.addEventListener("shortcut:export-docx", () => this.exportDOCX());
				window.addEventListener("shortcut:toggle-history", () => this.toggleHistory());

				window.addEventListener("shortcut:next-tab", () => {
					const currentIndex = this.tabs.findIndex(t => t.id === this.activeTab);
					const nextIndex = (currentIndex + 1) % this.tabs.length;
					this.activeTab = this.tabs[nextIndex].id;
				});

				window.addEventListener("shortcut:prev-tab", () => {
					const currentIndex = this.tabs.findIndex(t => t.id === this.activeTab);
					const prevIndex = (currentIndex - 1 + this.tabs.length) % this.tabs.length;
					this.activeTab = this.tabs[prevIndex].id;
				});
			},

			// Generate Laporan
			async generateLaporan() {
				const validation = validateBeforeGenerate(this.form);
				if (!validation.valid) {
					this.validationErrors = validation.errors;
					addToast("Data belum lengkap! Periksa form.", "error");
					return;
				}

				this.validationErrors = [];
				this.loading = true;
				window.dispatchEvent(new CustomEvent("generate:start"));

				try {
					const result = await generateLaporan();

					if (result.success && result.content) {
						this.renderedHTML = await parseMarkdown(result.content);
						this.form = reportStore.get();
						window.dispatchEvent(new CustomEvent("generate:complete"));
						addToast(`Laporan berhasil dibuat (${result.tokensUsed || 0} tokens)`, "success");
						saveToHistory();
					} else {
						throw new Error(result.error || "Gagal generate laporan");
					}
				} catch (error) {
					console.error("Generate Error:", error);
					window.dispatchEvent(new CustomEvent("generate:error"));
					addToast("Error: " + (error.message || "Gagal menghubungi AI"), "error");
				} finally {
					this.loading = false;
				}
			},

			// Import Excel
			async handleImportExcel(event) {
				const input = event.target;
				const file = input.files?.[0];
				if (!file) return;

				try {
					await importFromExcel(file);
					this.form = reportStore.get();
					addToast("Import data berhasil!", "success");
				} catch (error) {
					addToast("Import gagal: " + error.message, "error");
				}

				input.value = "";
			},

			// Download Template
			downloadTemplate() {
				try {
					downloadTemplate();
					addToast("Template Excel berhasil diunduh", "info");
				} catch (error) {
					addToast("Gagal download template", "error");
				}
			},

			// Export PDF
			async exportPDF() {
				if (!this.hasContent()) {
					addToast("Belum ada konten untuk diexport", "error");
					return;
				}

				try {
					const result = await exportToPDF();
					if (result.success) {
						addToast("PDF berhasil diexport", "success");
					} else {
						throw new Error(result.error);
					}
				} catch (error) {
					addToast("Export PDF gagal: " + error.message, "error");
				}
			},

			// Export DOCX
			async exportDOCX() {
				if (!this.hasContent()) {
					addToast("Belum ada konten untuk diexport", "error");
					return;
				}

				try {
					const result = await exportToDOCX();
					if (result.success) {
						addToast("DOCX berhasil diexport", "success");
					} else {
						throw new Error(result.error);
					}
				} catch (error) {
					addToast("Export DOCX gagal: " + error.message, "error");
				}
			},

			// Print
			printDoc() {
				if (!this.hasContent()) {
					addToast("Belum ada konten untuk diprint", "error");
					return;
				}
				printDocument();
			},

			// Save Draft
			saveDraft() {
				saveToHistory();
				addToast("Draft tersimpan ke riwayat", "success");
			},

			// Toggle History
			toggleHistory() {
				this.showHistory = !this.showHistory;
			},

			// Load History Item
			loadHistoryItem(id) {
				if (confirm("Muat data ini? Data saat ini akan ditimpa.")) {
					const success = loadFromHistory(id);
					if (success) {
						this.form = reportStore.get();
						this.showHistory = false;
						addToast("Data berhasil dimuat dari riwayat", "success");
					}
				}
			},

			// Delete History Item
			deleteHistoryItem(id) {
				if (confirm("Hapus riwayat ini?")) {
					deleteHistory(id);
					addToast("Riwayat dihapus", "info");
				}
			},

			// Utilities
			canGenerate() {
				return !!this.form.pegawai.nama && !!this.form.config.bulan && !!this.form.config.tahun;
			},

			hasContent() {
				return !!this.form.output.content;
			},

			hasAPIKey(model) {
				return checkAPIKey(model);
			},

			getBulanName(bulan) {
				const idx = parseInt(bulan);
				if (!idx) return "";
				return new Date(0, idx - 1).toLocaleString("id-ID", { month: "long" });
			},

			getCurrentDate() {
				return new Date().toLocaleDateString("id-ID", {
					day: "numeric",
					month: "long",
					year: "numeric"
				});
			},

			formatDate(isoDate) {
				return new Date(isoDate).toLocaleString("id-ID", {
					day: "2-digit",
					month: "short",
					year: "numeric",
					hour: "2-digit",
					minute: "2-digit"
				});
			},

			handleUpload(event, field) {
				const input = event.target;
				const file = input.files?.[0];
				if (!file) return;

				if (file.size > 500 * 1024) {
					addToast("File terlalu besar (Max 500KB)", "error");
					return;
				}

				const reader = new FileReader();
				reader.onload = (e) => {
					const path = field.split(".");
					let target = this.form;
					for (let i = 0; i < path.length - 1; i++) {
						target = target[path[i]];
					}
					target[path[path.length - 1]] = e.target?.result;
				};
				reader.readAsDataURL(file);
			}
		}));
	});
</script>
```

---

## ./package.json

```json
{
	"name": "generator-laporan-kinerja-pegawai",
	"type": "module",
	"version": "1.0.0",
	"description": "Generator Laporan Kinerja Pegawai berbasis AI dengan Multi-Model Support",
	"author": {
		"name": "Yahya Zulfikri",
		"email": "zulfikriyahya18@gmail.com"
	},
	"license": "MIT",
	"scripts": {
		"dev": "astro dev",
		"build": "astro check && astro build",
		"preview": "astro preview",
		"astro": "astro",
		"clean": "rm -rf dist .astro",
		"lint": "eslint src --ext .ts,.astro",
		"format": "prettier --write \"src/**/*.{ts,astro,css}\""
	},
	"dependencies": {
		"@astrojs/alpinejs": "^0.4.9",
		"@google/generative-ai": "^0.24.1",
		"@lucide/astro": "^0.562.0",
		"@nanostores/persistent": "^1.2.0",
		"@tailwindcss/vite": "^4.1.18",
		"@types/file-saver": "^2.0.7",
		"@vite-pwa/astro": "^1.2.0",
		"alpinejs": "^3.15.4",
		"astro": "^5.16.11",
		"clsx": "^2.1.1",
		"dayjs": "^1.11.19",
		"docx": "^8.5.0",
		"dompurify": "^3.3.1",
		"file-saver": "^2.0.5",
		"gsap": "^3.14.2",
		"html-docx-js-typescript": "^0.1.5",
		"html2pdf.js": "^0.14.0",
		"jspdf": "^4.0.0",
		"marked": "^17.0.1",
		"nanostores": "^1.1.0",
		"qrcode": "^1.5.4",
		"tailwind-merge": "^3.4.0",
		"tailwindcss": "^4.1.18",
		"workbox-window": "^7.4.0",
		"xlsx": "^0.18.5"
	},
	"devDependencies": {
		"@types/dompurify": "^3.2.0",
		"@types/qrcode": "^1.5.6",
		"@typescript-eslint/eslint-plugin": "^8.53.1",
		"@typescript-eslint/parser": "^8.53.1",
		"eslint": "^9.39.2",
		"eslint-plugin-astro": "^1.5.0",
		"prettier": "^3.8.0",
		"prettier-plugin-astro": "^0.14.1",
		"typescript": "^5.9.3"
	}
}
```

---

## ./tsconfig.json

```json
{
	"extends": "astro/tsconfigs/strict",
	"include": [".astro/types.d.ts", "**/*"],
	"exclude": ["dist"]
}
```

---

## ./.env

```env
PUBLIC_GEMINI_API_KEY=
PUBLIC_CLAUDE_API_KEY=sk-ant...
PUBLIC_OPENAI_API_KEY=sk-...
PUBLIC_GROQ_API_KEY=gsk_...
```

---

## ./astro.config.mjs

```javascript
import { defineConfig } from "astro/config";
import alpinejs from "@astrojs/alpinejs";
import tailwindcss from "@tailwindcss/vite";
import AstroPWA from "@vite-pwa/astro";

export default defineConfig({
	integrations: [
		alpinejs(),
		AstroPWA({
			registerType: "autoUpdate",
			manifest: {
				name: "Generator Laporan Kinerja Pegawai",
				short_name: "Laporan Kineja Pegawai",
				description:
					"Aplikasi penyusun laporan kinerja pegawai otomatis berbasis AI",
				theme_color: "#0f172a",
				background_color: "#0f172a",
				display: "standalone",
				orientation: "portrait",
				icons: [
					{
						src: "192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
				navigateFallback: "/index.html",
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
```

---

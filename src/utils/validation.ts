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
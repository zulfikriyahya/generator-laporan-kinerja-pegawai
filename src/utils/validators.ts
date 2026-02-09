// ============================================================================
// VALIDATION UTILITIES
// Version: 1.0.0
// ============================================================================

import { VALIDATION_RULES } from './constants';

/**
 * Validate NIP
 */
export const isValidNIP = (nip: string): boolean => {
  if (!nip) return false;
  const cleaned = nip.replace(/\D/g, '');
  return VALIDATION_RULES.nip.regex.test(cleaned);
};

/**
 * Validate NUPTK
 */
export const isValidNUPTK = (nuptk: string): boolean => {
  if (!nuptk) return false;
  const cleaned = nuptk.replace(/\D/g, '');
  return VALIDATION_RULES.nuptk.regex.test(cleaned);
};

/**
 * Validate NIK
 */
export const isValidNIK = (nik: string): boolean => {
  if (!nik) return false;
  const cleaned = nik.replace(/\D/g, '');
  return VALIDATION_RULES.nik.regex.test(cleaned);
};

/**
 * Validate Email
 */
export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  return VALIDATION_RULES.email.regex.test(email);
};

/**
 * Validate Phone
 */
export const isValidPhone = (phone: string): boolean => {
  if (!phone) return false;
  const cleaned = phone.replace(/\D/g, '');
  return VALIDATION_RULES.phone.regex.test(cleaned);
};

/**
 * Validate date range
 */
export const isValidDateRange = (startDate: Date, endDate: Date): boolean => {
  return startDate <= endDate;
};

/**
 * Validate bulan (1-12)
 */
export const isValidBulan = (bulan: number): boolean => {
  return bulan >= 1 && bulan <= 12;
};

/**
 * Validate tahun
 */
export const isValidTahun = (tahun: number): boolean => {
  const currentYear = new Date().getFullYear();
  return tahun >= 2000 && tahun <= currentYear + 1;
};

/**
 * Validate file type
 */
export const isValidFileType = (mimetype: string, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(mimetype);
};

/**
 * Validate file size
 */
export const isValidFileSize = (size: number, maxSize: number): boolean => {
  return size <= maxSize;
};

/**
 * Sanitize string input
 */
export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, '');
};

/**
 * Validate required fields
 */
export const validateRequiredFields = (
  data: Record<string, any>,
  requiredFields: string[],
): { valid: boolean; missing: string[] } => {
  const missing: string[] = [];

  for (const field of requiredFields) {
    if (!data[field] || data[field] === '') {
      missing.push(field);
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
};

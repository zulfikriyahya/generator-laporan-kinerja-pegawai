// ============================================================================
// HELPER UTILITIES
// Version: 1.0.0
// ============================================================================

import { BULAN_INDONESIA } from './constants';

/**
 * Format tanggal ke Indonesia
 */
export const formatDateIndonesia = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;

  const day = d.getDate();
  const month = BULAN_INDONESIA[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${month} ${year}`;
};

/**
 * Get nama bulan Indonesia
 */
export const getBulanIndonesia = (bulan: number): string => {
  return BULAN_INDONESIA[bulan - 1] || '';
};

/**
 * Generate nomor dokumen
 */
export const generateNomorDokumen = (bulan: number, tahun: number, urutan: number): string => {
  const nomorUrut = String(urutan).padStart(3, '0');
  const bulanStr = String(bulan).padStart(2, '0');
  return `${nomorUrut}/LPKP/${bulanStr}/${tahun}`;
};

/**
 * Sanitize filename
 */
export const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-zA-Z0-9_\-\.]/g, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase();
};

/**
 * Generate hash sederhana
 */
export const generateSimpleHash = (text: string): string => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};

/**
 * Sleep delay
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Capitalize first letter
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Remove HTML tags
 */
export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

/**
 * Truncate text
 */
export const truncate = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Check if string is valid JSON
 */
export const isValidJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Deep clone object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Generate random string
 */
export const generateRandomString = (length: number = 10): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

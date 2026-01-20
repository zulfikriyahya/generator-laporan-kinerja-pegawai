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

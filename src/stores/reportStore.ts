import { persistentMap } from "@nanostores/persistent";
import type { AppStore, HistoryStore } from "../types/ReportTypes";

const defaultState: AppStore = {
  instansi: {
    logoUtama: "",
    logoInstansi: "",
    header1: "KEMENTERIAN AGAMA REPUBLIK INDONESIA",
    header2: "KANTOR KABUPATEN PANDEGLANG",
    header3: "MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG",
    alamat: "Jl. Raya Labuan Km. 5,7 Pandeglang - Banten 42253",
    telepon: "(0253) 201000",
    email: "mtsn1pandeglang@kemenag.go.id",
    website: "mtsn1pandeglang.sch.id",
    kepala: {
      nama: "",
      nip: "",
      pangkat: "Pembina/IV-a",
      ttd: "",
    },
    titimangsa: "Pandeglang",
  },
  pegawai: {
    nama: "",
    nip: "",
    nuptk: "",
    nik: "",
    jenis: "PNS",
    status: "AKTIF",
    golongan: "III/a",
    jabatan: "Guru Ahli Pertama",
    unitKerja: "MTsN 1 Pandeglang",
    tempatLahir: "Pandeglang",
    tanggalLahir: "1990-01-01",
    gender: "L",
    alamat: "",
    hp: "",
    email: "",
    fotoPegawai: "",
    pendidikan: "S1 Pendidikan",
    masaKerjaTahun: "5",
    masaKerjaBulan: "0",
  },
  akademik: {
    kurikulum: "MERDEKA",
    tahunPelajaran: `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`,
    semester: "GANJIL",
    mapel: "",
    kelas: "",
    jamMengajar: "24",
    jumlahSiswa: "32",
    ekskul: "",
  },
  kinerja: {
    tugasPokok: "Merencanakan, melaksanakan, dan mengevaluasi pembelajaran.",
    tugasTambahan: "Wali Kelas, Piket Harian",
    targetTahunan: "Meningkatkan ketuntasan belajar siswa minimal 85%",
    targetKuantitatif: "Laporan Kinerja Bulanan, Perangkat Pembelajaran",
    targetKualitatif: "Tercapainya standar kompetensi lulusan",
    hambatan: "",
    solusi: "",
  },
  config: {
    bulan: (new Date().getMonth() + 1).toString(),
    tahun: new Date().getFullYear().toString(),
    modelAI: "gemini",
    tokenLimit: 2000,
    customInstruction: "",
  },
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

export const reportStore = persistentMap<AppStore>(
  "ekinerja-app-v1:",
  defaultState,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

export const historyStore = persistentMap<HistoryStore>(
  "ekinerja-history:",
  { items: [] },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

export const updateStore = <K extends keyof AppStore>(
  key: K,
  value: AppStore[K],
) => {
  const current = reportStore.get();
  reportStore.set({ ...current, [key]: value });
};

export const validateBeforeGenerate = (
  data: AppStore,
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!data.pegawai.nama) errors.push("Nama pegawai harus diisi");
  if (!data.pegawai.nip) errors.push("NIP harus diisi");
  if (!data.pegawai.jabatan) errors.push("Jabatan harus diisi");
  if (!data.config.bulan) errors.push("Bulan laporan harus dipilih");
  if (!data.config.tahun) errors.push("Tahun laporan harus diisi");

  if (data.pegawai.email && data.pegawai.email.trim() !== "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.pegawai.email)) {
      errors.push("Format email tidak valid");
    }
  }

  const validStatus = ["AKTIF", "CUTI", "TUGAS_BELAJAR", "NON_AKTIF"];
  if (!validStatus.includes(data.pegawai.status)) {
    errors.push(
      "Status pegawai tidak valid (Gunakan: AKTIF, CUTI, TUGAS_BELAJAR, NON_AKTIF)",
    );
  }

  return { valid: errors.length === 0, errors };
};

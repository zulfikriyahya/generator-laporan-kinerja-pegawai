import { persistentMap } from "@nanostores/persistent";
import type { AppStore, HistoryStore } from "../types/ReportTypes";

const defaultState: AppStore = {
  instansi: {
    logoUtama: "",
    logoInstansi: "",
    header1: "KEMENTERIAN AGAMA REPUBLIK INDONESIA",
    header2: "KANTOR KABUPATEN PANDEGLANG",
    header3: "MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG",
    alamat:
      "Jl. Raya Labuan Km. 5,7 Palurahan, Kaduhejo, Pandeglang - Banten 42253",
    telepon: "62895351856267",
    email: "adm@mtsn1pandeglang.sch.id",
    website: "https://mtsn1pandeglang.sch.id",
    kepala: {
      nama: "",
      nip: "",
      pangkat: "Pembina/IV-c",
      ttd: "",
    },
    titimangsa: "Pandeglang",
  },
  pegawai: {
    nama: "Yahya Zulfikri",
    nip: "200001142025211016",
    nuptk: "",
    nik: "3601211801000001",
    jenis: "PPPK",
    status: "AKTIF",
    golongan: "III/a",
    jabatan: "Pengadministrasi Perkantoran",
    unitKerja: "Tata Usaha MTs Negeri 1 Pandeglang",
    tempatLahir: "Pandeglang",
    tanggalLahir: "2000-01-04",
    gender: "L",
    alamat: "Kp. Kebon Cau RT 001 RW 005 Pandeglang",
    hp: "628211558571",
    email: "zulfikriyahya18@gmail.com",
    fotoPegawai: "",
    pendidikan: "S1 Sistem Informasi",
    masaKerjaTahun: "0",
    masaKerjaBulan: "5",
  },
  akademik: {
    kurikulum: "MERDEKA",
    tahunPelajaran: `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`,
    semester: "GENAP",
    mapel: "",
    kelas: "",
    jamMengajar: "0",
    jumlahSiswa: "0",
    ekskul: "",
  },
  kinerja: {
    tugasPokok: "Merencanakan, melaksanakan, dan mengevaluasi pembelajaran.",
    tugasTambahan: "Wali Kelas, Piket Harian",
    targetTahunan: "Meningkatkan ketuntasan belajar siswa minimal 85%",
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
    tte: {
      qrCode: "",
      nomorDokumen: "",
      hashDokumen: "",
      timestamp: "",
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
  if (!data.kinerja.tugasPokok) errors.push("Tugas pokok harus diisi");

  if (data.pegawai.email && data.pegawai.email.trim() !== "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.pegawai.email)) {
      errors.push("Format email tidak valid");
    }
  }

  const validStatus = ["AKTIF", "CUTI", "TUGAS_BELAJAR", "NON_AKTIF"];
  if (!validStatus.includes(data.pegawai.status)) {
    errors.push("Status pegawai tidak valid");
  }

  return { valid: errors.length === 0, errors };
};

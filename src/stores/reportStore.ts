import { persistentMap } from "@nanostores/persistent";
import type { AppStore, HistoryStore, HistoryItem } from "../types/ReportTypes";

const defaultState: AppStore = {
  instansi: {
    logoUtama: "",
    logoInstitusi: "",
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
    kepalaTu: {
      nama: "",
      nip: "",
      pangkat: "Penata/III-c",
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
    status: "Aktif",
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
    kurikulum: "Kurikulum Merdeka",
    tahunPelajaran: `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`,
    semester: "Ganjil",
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

export const saveToHistory = (title?: string) => {
  const current = reportStore.get();
  const history = historyStore.get();
  const id = `history_${Date.now()}`;
  const date = new Date().toISOString();

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

  const autoTitle =
    title ||
    `Laporan ${current.pegawai.nama || "Tanpa Nama"} - ${namaBulan[parseInt(current.config.bulan) - 1] || ""} ${current.config.tahun}`;

  const newItem: HistoryItem = {
    id,
    title: autoTitle,
    date,
    data: JSON.parse(JSON.stringify(current)),
  };

  const updatedHistory = {
    items: [newItem, ...history.items].slice(0, 20),
  };

  historyStore.set(updatedHistory);
  return id;
};

export const loadFromHistory = (id: string) => {
  const history = historyStore.get();
  const item = history.items.find((i) => i.id === id);
  if (item) {
    reportStore.set(JSON.parse(JSON.stringify(item.data)));
    return true;
  }
  return false;
};

export const deleteHistory = (id: string) => {
  const history = historyStore.get();
  const updatedHistory = {
    items: history.items.filter((i) => i.id !== id),
  };
  historyStore.set(updatedHistory);
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
  return { valid: errors.length === 0, errors };
};

export const generateNomorDokumen = (): string => {
  const current = reportStore.get();
  const tahun = current.config.tahun;
  const bulan = current.config.bulan.padStart(2, "0");
  const random = Math.floor(Math.random() * 999) + 1;
  const nomorUrut = random.toString().padStart(3, "0");
  return `${nomorUrut}/LPKP/${bulan}/${tahun}`;
};

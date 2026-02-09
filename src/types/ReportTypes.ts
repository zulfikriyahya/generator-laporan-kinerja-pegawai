export interface ReportDTO {
  modelAI: string;
  bulan: number;
  tahun: number;
  tugasPokok: string;
  tugasTambahan?: string;
  targetTahunan?: string;
  hambatan?: string;
  solusi?: string;
  tokenLimit?: number;
  customInstruction?: string;
}

export interface PegawaiDTO {
  nama: string;
  nip: string;
  nuptk?: string;
  nik?: string;
  jenisPegawai: string;
  statusPegawai: string;
  golongan?: string;
  jabatan: string;
  unitKerja: string;
  tempatLahir?: string;
  tanggalLahir?: string;
  gender: "L" | "P";
  alamat?: string;
  hp?: string;
  email?: string;
  pendidikan?: string;
  masaKerjaTahun?: number;
  masaKerjaBulan?: number;
  fotoPegawai?: string;
}

export interface InstansiDTO {
  header1: string;
  header2: string;
  header3: string;
  alamat: string;
  telepon?: string;
  email?: string;
  website?: string;
  logoUtama?: string;
  logoInstansi?: string;
  namaKepala: string;
  nipKepala: string;
  pangkatKepala: string;
  ttdKepala?: string;
  titimangsa: string;
  isActive?: boolean;
}

export interface AkademikDTO {
  kurikulum: "K13" | "MERDEKA" | "KTSP";
  tahunPelajaran: string;
  semester: "GANJIL" | "GENAP";
  mapel: string;
  kelas: string;
  jamMengajar: number;
  jumlahSiswa: number;
  ekskul?: string;
}

export interface Pejabat {
  nama: string;
  nip: string;
  pangkat: string;
  ttd?: string;
}

export interface InstansiData {
  id?: string;
  logoUtama: string;
  logoInstansi: string;
  header1: string;
  header2: string;
  header3: string;
  alamat: string;
  telepon: string;
  email: string;
  website: string;
  kepala: Pejabat;
  titimangsa: string;
}

export interface PegawaiData {
  id?: string;
  nama: string;
  nip: string;
  nuptk: string;
  nik: string;
  jenis: "PNS" | "PPPK" | "HONORER" | "GTT" | "PTT" | "GURU";
  status: "AKTIF" | "CUTI" | "TUGAS_BELAJAR" | "NON_AKTIF";
  golongan: string;
  jabatan: string;
  unitKerja: string;
  tempatLahir: string;
  tanggalLahir: string;
  gender: "L" | "P";
  alamat: string;
  hp: string;
  email: string;
  fotoPegawai: string;
  pendidikan: string;
  masaKerjaTahun: string;
  masaKerjaBulan: string;
}

export interface AkademikData {
  kurikulum: "K13" | "MERDEKA" | "KTSP";
  tahunPelajaran: string;
  semester: "GANJIL" | "GENAP";
  mapel: string;
  kelas: string;
  jamMengajar: string;
  jumlahSiswa: string;
  ekskul: string;
}

export interface KinerjaData {
  tugasPokok: string;
  tugasTambahan: string;
  targetTahunan: string;
  hambatan: string;
  solusi: string;
}

export interface ConfigData {
  bulan: string;
  tahun: string;
  modelAI: "gemini" | "claude" | "gpt" | "groq" | "together" | "deepseek";
  tokenLimit: number;
  customInstruction: string;
}

export interface TTEData {
  qrCode: string;
  nomorDokumen: string;
  hashDokumen: string;
  timestamp: string;
}

export interface OutputData {
  tte: TTEData;
  content: string;
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

export interface HistoryItem {
  id: string;
  title: string;
  date: string;
  status: string;
}

export interface HistoryStore {
  items: HistoryItem[];
}

export interface GenerateAIResult {
  success: boolean;
  content?: string;
  tokensUsed?: number;
  error?: string;
}

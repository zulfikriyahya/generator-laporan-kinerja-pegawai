export interface ReportDTO {
  id?: string;
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

export interface Pejabat {
  nama: string;
  nip: string;
  pangkat: string;
  ttd: string;
}

export interface InstansiData {
  logoUtama: string;
  logoInstitusi: string;
  logoInstansi: string;
  header1: string;
  header2: string;
  header3: string;
  alamat: string;
  telepon: string;
  email: string;
  website: string;
  kepala: Pejabat;
  kepalaTu: Pejabat;
  titimangsa: string;
}

export interface PegawaiData {
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
  fotoPegawai: string;
  pendidikan: string;
  masaKerjaTahun: string;
  masaKerjaBulan: string;
}

export interface AkademikData {
  kurikulum: "Kurikulum 2013" | "Kurikulum Merdeka" | "KTSP";
  tahunPelajaran: string;
  semester: "Ganjil" | "Genap";
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
  targetKuantitatif: string;
  targetKualitatif: string;
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
  statusValidasi: "Valid" | "Invalid" | "Expired";
}

export interface OutputData {
  titimangsa: {
    tempat: string;
    tanggal: string;
    bahasa: "Indonesia" | "Inggris";
  };
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
  data: AppStore;
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

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export interface ImportExcelResult {
  success: boolean;
  data?: AppStore;
  errors?: ValidationError[];
}

export interface ExportResult {
  success: boolean;
  file?: Blob;
  error?: string;
}
export * from "./ReportTypes";

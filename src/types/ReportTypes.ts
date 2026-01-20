// src/types/ReportTypes.ts

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

export interface Pejabat {
    nama: string;
    nip: string;
    pangkat: string;
    ttd: string; // Base64 signature
}

export interface PegawaiData {
    // 2.2 Identitas Pegawai
    nama: string;
    nip: string;
    nuptk: string;
    nik: string;
    jenis: "PNS" | "PPPK" | "Honorer" | "GTT" | "PTT";
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
    modelAI: "gemini" | "claude" | "gpt" | "groq";
    tokenLimit: number;
    customInstruction: string;
}

export interface OutputData {
    // 2.5 Dokumen Output
    nomorDokumen: string;
    tanggalGenerate: string;
    content: string; // Markdown result
    qrCode: string; // Base64
    hash: string;
}

export interface AppStore {
    instansi: InstansiData;
    pegawai: PegawaiData;
    akademik: AkademikData;
    kinerja: KinerjaData;
    config: ConfigData;
    output: OutputData;
}
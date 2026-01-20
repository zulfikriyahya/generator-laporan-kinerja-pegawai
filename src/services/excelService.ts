import * as XLSX from "xlsx";
import { reportStore } from "../stores/reportStore";

// Struktur Header untuk Template
const TEMPLATE_HEADERS = [
    "Nama Lengkap", "NIP", "NUPTK", "Jabatan", "Unit Kerja", "Pangkat", 
    "Mata Pelajaran", "Kelas", "Jumlah Siswa", 
    "Tugas Pokok", "Target Tahunan"
];

// Data Contoh untuk Template
const SAMPLE_DATA = [
    {
        "Nama Lengkap": "Ahmad Dahlan, S.Pd",
        "NIP": "198501012010011001",
        "NUPTK": "1234567890123456",
        "Jabatan": "Guru Ahli Pertama",
        "Unit Kerja": "MTsN 1 Pandeglang",
        "Pangkat": "Penata Muda Tk.I / III/b",
        "Mata Pelajaran": "Matematika",
        "Kelas": "VII-A, VII-B",
        "Jumlah Siswa": "64",
        "Tugas Pokok": "Merencanakan dan melaksanakan KBM, mengevaluasi hasil belajar.",
        "Target Tahunan": "Meningkatkan nilai rata-rata kelas di atas KKM"
    }
];

export const downloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet(SAMPLE_DATA, { header: TEMPLATE_HEADERS });
    
    // Auto-width columns (estetika file excel)
    const wscols = TEMPLATE_HEADERS.map(h => ({ wch: h.length + 10 }));
    ws['!cols'] = wscols;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data Pegawai");
    XLSX.writeFile(wb, "Template_Import_Ekinerja.xlsx");
};

export const importFromExcel = async (file: File) => {
    return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: "array" });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const json = XLSX.utils.sheet_to_json<any>(worksheet);

                if (json.length === 0) throw new Error("File Excel kosong atau format salah.");
                
                // Ambil baris pertama (User)
                const row = json[0];
                const current = reportStore.get();

                // Mapping Aman (Fallback ke data lama jika excel kosong di kolom tsb)
                reportStore.set({
                    ...current,
                    pegawai: {
                        ...current.pegawai,
                        nama: row['Nama Lengkap'] || current.pegawai.nama,
                        nip: String(row['NIP'] || current.pegawai.nip), // Force String
                        nuptk: String(row['NUPTK'] || current.pegawai.nuptk),
                        jabatan: row['Jabatan'] || current.pegawai.jabatan,
                        unitKerja: row['Unit Kerja'] || current.pegawai.unitKerja,
                        golongan: row['Pangkat'] || current.pegawai.golongan,
                    },
                    akademik: {
                        ...current.akademik,
                        mapel: row['Mata Pelajaran'] || current.akademik.mapel,
                        kelas: row['Kelas'] || current.akademik.kelas,
                        jumlahSiswa: String(row['Jumlah Siswa'] || current.akademik.jumlahSiswa),
                    },
                    kinerja: {
                        ...current.kinerja,
                        tugasPokok: row['Tugas Pokok'] || current.kinerja.tugasPokok,
                        targetTahunan: row['Target Tahunan'] || current.kinerja.targetTahunan
                    }
                });
                resolve();
            } catch (err) { reject(err); }
        };
        reader.readAsArrayBuffer(file);
    });
};
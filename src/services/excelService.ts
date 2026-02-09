import * as XLSX from "xlsx";
import { reportStore } from "../stores/reportStore";
import type { AppStore } from "../types/ReportTypes";

export const downloadTemplate = () => {
  const ws = XLSX.utils.json_to_sheet([
    {
      "Nama Lengkap": "Ahmad Dahlan",
      NIP: "198501012010011001",
      Jabatan: "Guru Ahli Pertama",
      "Status Pegawai": "AKTIF",
      "Jenis Pegawai": "PNS",
      "Tugas Pokok": "Melaksanakan pembelajaran...",
      "Tugas Tambahan": "Wali Kelas",
      "Target Tahunan": "Lulus 100%",
    },
  ]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Template");
  XLSX.writeFile(wb, "Template_Ekinerja.xlsx");
};

export const importFromExcel = async (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (jsonData.length > 0) {
          const row: any = jsonData[0];
          const current = reportStore.get();

          const normalizeStatus = (val: string): any => {
            const v = val?.toString().toUpperCase().replace(" ", "_");
            if (["AKTIF", "CUTI", "TUGAS_BELAJAR", "NON_AKTIF"].includes(v))
              return v;
            return "AKTIF";
          };

          const normalizeJenis = (val: string): any => {
            const v = val?.toString().toUpperCase();
            if (["PNS", "PPPK", "HONORER", "GTT", "PTT", "GURU"].includes(v))
              return v;
            return "PNS";
          };

          const updated: AppStore = {
            ...current,
            pegawai: {
              ...current.pegawai,
              nama: row["Nama Lengkap"] || current.pegawai.nama,
              nip: String(row["NIP"] || current.pegawai.nip),
              jabatan: row["Jabatan"] || current.pegawai.jabatan,
              status: normalizeStatus(row["Status Pegawai"]),
              jenis: normalizeJenis(row["Jenis Pegawai"]),
            },
            kinerja: {
              ...current.kinerja,
              tugasPokok: row["Tugas Pokok"] || current.kinerja.tugasPokok,
              tugasTambahan:
                row["Tugas Tambahan"] || current.kinerja.tugasTambahan,
              targetTahunan:
                row["Target Tahunan"] || current.kinerja.targetTahunan,
            },
          };

          reportStore.set(updated);
        }
        resolve(true);
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsArrayBuffer(file);
  });
};

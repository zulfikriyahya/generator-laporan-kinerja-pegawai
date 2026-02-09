import * as XLSX from "xlsx";
import { reportStore } from "../stores/reportStore";

export const downloadTemplate = () => {
  const ws = XLSX.utils.json_to_sheet([
    {
      "Nama Lengkap": "Ahmad Dahlan",
      NIP: "1985...",
      Jabatan: "Guru",
      "Tugas Pokok": "Mengajar...",
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
          reportStore.set({
            ...current,
            pegawai: {
              ...current.pegawai,
              nama: row["Nama Lengkap"] || current.pegawai.nama,
              nip: String(row["NIP"] || current.pegawai.nip),
              jabatan: row["Jabatan"] || current.pegawai.jabatan,
            },
            kinerja: {
              ...current.kinerja,
              tugasPokok: row["Tugas Pokok"] || current.kinerja.tugasPokok,
            },
          });
        }
        resolve(true);
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsArrayBuffer(file);
  });
};

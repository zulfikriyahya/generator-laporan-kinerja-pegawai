import api from "../utils/api";
import { reportStore, updateStore } from "../stores/reportStore";
import { savePegawaiProfile } from "./pegawaiService";
import type { GenerateAIResult, ReportDTO } from "../types/ReportTypes";

export const generateLaporan = async (): Promise<GenerateAIResult> => {
  const store = reportStore.get();

  // 1. Simpan Data Pegawai Terlebih Dahulu (Wajib agar backend bisa generate)
  const profileSave = await savePegawaiProfile();
  if (!profileSave.success) {
    return {
      success: false,
      error: `Gagal menyimpan profil: ${profileSave.error}`,
    };
  }

  // 2. Siapkan Payload untuk ReportsService
  const payload: ReportDTO = {
    modelAI: store.config.modelAI,
    bulan: parseInt(store.config.bulan),
    tahun: parseInt(store.config.tahun),
    tugasPokok: store.kinerja.tugasPokok,
    tugasTambahan: store.kinerja.tugasTambahan,
    targetTahunan: store.kinerja.targetTahunan,
    hambatan: store.kinerja.hambatan,
    solusi: store.kinerja.solusi,
    tokenLimit: store.config.tokenLimit,
    customInstruction: store.config.customInstruction,
  };

  try {
    // 3. Panggil API Backend
    const response = await api.post("/reports/generate", payload);
    const data = response.data;

    // 4. Update Store dengan Hasil AI
    if (data && data.content) {
      updateStore("output", {
        ...store.output,
        content: data.content,
        lastUpdated: new Date().toISOString(),
        tte: {
          ...store.output.tte,
          nomorDokumen: data.nomorDokumen,
          timestamp: new Date().toISOString(),
        },
      });

      return {
        success: true,
        content: data.content,
        tokensUsed: data.tokensUsed,
      };
    }

    return { success: false, error: "Respon server tidak valid" };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal generate laporan",
    };
  }
};

export const checkAPIKey = (model: string) => true; // API Key dikelola backend

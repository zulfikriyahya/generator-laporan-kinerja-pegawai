import api from "../utils/api";
import {
  reportStore,
  updateStore,
  generateNomorDokumen,
} from "../stores/reportStore";
import type { GenerateAIResult } from "../types/ReportTypes";

export const generateLaporan = async (): Promise<GenerateAIResult> => {
  const store = reportStore.get();

  const payload = {
    modelAI: store.config.modelAI,
    bulan: parseInt(store.config.bulan),
    tahun: parseInt(store.config.tahun),
    tokenLimit: store.config.tokenLimit,
    customInstruction: store.config.customInstruction,
    pegawai: {
      nama: store.pegawai.nama,
      nip: store.pegawai.nip,
      jabatan: store.pegawai.jabatan,
      golongan: store.pegawai.golongan,
      unitKerja: store.pegawai.unitKerja,
      jenisPegawai: store.pegawai.jenis,
      masaKerjaTahun: parseInt(store.pegawai.masaKerjaTahun),
      masaKerjaBulan: parseInt(store.pegawai.masaKerjaBulan),
    },
    kinerja: {
      tugasPokok: store.kinerja.tugasPokok,
      tugasTambahan: store.kinerja.tugasTambahan,
      targetTahunan: store.kinerja.targetTahunan,
      hambatan: store.kinerja.hambatan,
      solusi: store.kinerja.solusi,
    },
    akademik: {
      kurikulum: store.akademik.kurikulum,
      tahunPelajaran: store.akademik.tahunPelajaran,
      semester: store.akademik.semester,
      mapel: store.akademik.mapel,
      kelas: store.akademik.kelas,
      jamMengajar: parseInt(store.akademik.jamMengajar),
      jumlahSiswa: parseInt(store.akademik.jumlahSiswa),
      ekskul: store.akademik.ekskul,
    },
  };

  try {
    const response = await api.post("/reports/generate", payload);
    const data = response.data;

    if (data && data.content) {
      updateStore("output", {
        ...store.output,
        content: data.content,
        lastUpdated: new Date().toISOString(),
        tte: {
          ...store.output.tte,
          nomorDokumen: data.nomorDokumen || generateNomorDokumen(),
          timestamp: new Date().toISOString(),
        },
      });

      return {
        success: true,
        content: data.content,
        tokensUsed: data.tokensUsed,
      };
    }

    return {
      success: false,
      error: "Invalid response from server",
    };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.response?.data?.message || error.message || "Generation failed",
    };
  }
};

export const checkAPIKey = (model: string) => {
  return true;
};

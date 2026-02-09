import api from "../utils/api";
import { historyStore, reportStore } from "../stores/reportStore";

export const fetchHistory = async () => {
  try {
    const response = await api.get("/reports/my-reports?limit=20");
    const reports = response.data.data;

    const items = reports.map((report: any) => ({
      id: report.id,
      title: `Laporan ${report.bulan}/${report.tahun}`,
      date: report.createdAt,
      // Kita simpan referensi minimal, detail diambil saat load
      status: report.status,
    }));

    historyStore.set({ items });
  } catch (error) {
    console.error("Gagal mengambil riwayat:", error);
  }
};

export const loadReportDetail = async (id: string) => {
  try {
    const response = await api.get(`/reports/${id}`);
    const data = response.data;

    // Masukkan data dari DB ke Form Frontend
    const current = reportStore.get();

    reportStore.set({
      ...current,
      config: {
        ...current.config,
        bulan: String(data.bulan),
        tahun: String(data.tahun),
        modelAI: data.modelAI,
      },
      kinerja: {
        ...current.kinerja,
        tugasPokok: data.tugasPokok,
        tugasTambahan: data.tugasTambahan || "",
        targetTahunan: data.targetTahunan || "",
        hambatan: data.hambatan || "",
        solusi: data.solusi || "",
      },
      output: {
        ...current.output,
        content: data.content,
        lastUpdated: data.updatedAt,
        tte: {
          ...current.output.tte,
          nomorDokumen: data.nomorDokumen,
        },
      },
    });

    return true;
  } catch (error) {
    console.error("Gagal memuat laporan:", error);
    return false;
  }
};

export const deleteReport = async (id: string) => {
  try {
    await api.delete(`/reports/${id}`);
    await fetchHistory(); // Refresh list
    return true;
  } catch (error) {
    return false;
  }
};

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

    if (data.pegawai) {
      const p = data.pegawai;
      const mappedPegawai = {
        ...current.pegawai,
        id: p.id,
        nama: p.nama,
        nip: p.nip,
        jenis: p.jenisPegawai,
        status: p.statusPegawai,
        jabatan: p.jabatan,
        unitKerja: p.unitKerja,
        golongan: p.golongan || "",
        masaKerjaTahun: String(p.masaKerjaTahun || 0),
        masaKerjaBulan: String(p.masaKerjaBulan || 0),
      };

      reportStore.set({ ...reportStore.get(), pegawai: mappedPegawai });
    }

    return true;
  } catch (error) {
    console.error("Gagal memuat laporan:", error);
    return false;
  }
};

export const deleteReport = async (id: string) => {
  try {
    await api.delete(`/reports/${id}`);
    await fetchHistory();
    return true;
  } catch (error) {
    return false;
  }
};

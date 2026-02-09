import api from "../utils/api";
import { historyStore, reportStore } from "../stores/reportStore";

export const fetchHistory = async () => {
  try {
    const response = await api.get("/reports/my-reports?limit=50");
    const reports = response.data.data;

    const items = reports.map((report: any) => ({
      id: report.id,
      title: `Laporan ${report.bulan}/${report.tahun} - ${report.pegawai?.nama || "Unknown"}`,
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

    const apiBaseUrl =
      import.meta.env.PUBLIC_API_URL?.replace("/api", "") ||
      "http://localhost:3000";
    const normalizeUrl = (url: string) => {
      if (!url) return "";
      return url.startsWith("http") ? url : `${apiBaseUrl}${url}`;
    };

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
        nuptk: p.nuptk || "",
        nik: p.nik || "",
        jenis: p.jenisPegawai,
        status: p.statusPegawai,
        jabatan: p.jabatan,
        unitKerja: p.unitKerja,
        golongan: p.golongan || "",
        tempatLahir: p.tempatLahir || "",
        tanggalLahir: p.tanggalLahir ? p.tanggalLahir.split("T")[0] : "",
        gender: p.gender,
        alamat: p.alamat || "",
        hp: p.hp || "",
        email: p.email || "",
        fotoPegawai: normalizeUrl(p.fotoPegawai || ""),
        pendidikan: p.pendidikan || "",
        masaKerjaTahun: String(p.masaKerjaTahun || 0),
        masaKerjaBulan: String(p.masaKerjaBulan || 0),
      };

      reportStore.set({ ...reportStore.get(), pegawai: mappedPegawai });
    }

    if (data.pegawai?.akademik) {
      const akademik = data.pegawai.akademik;
      const mappedAkademik = {
        ...current.akademik,
        kurikulum: akademik.kurikulum,
        tahunPelajaran: akademik.tahunPelajaran,
        semester: akademik.semester,
        mapel: akademik.mapel || "",
        kelas: akademik.kelas || "",
        jamMengajar: String(akademik.jamMengajar || 0),
        jumlahSiswa: String(akademik.jumlahSiswa || 0),
        ekskul: akademik.ekskul || "",
      };

      reportStore.set({ ...reportStore.get(), akademik: mappedAkademik });
    }

    if (data.instansi) {
      const inst = data.instansi;
      const mappedInstansi = {
        ...current.instansi,
        id: inst.id,
        header1: inst.header1,
        header2: inst.header2,
        header3: inst.header3,
        alamat: inst.alamat,
        telepon: inst.telepon || "",
        email: inst.email || "",
        website: inst.website || "",
        logoUtama: normalizeUrl(inst.logoUtama || ""),
        logoInstansi: normalizeUrl(inst.logoInstansi || ""),
        titimangsa: inst.titimangsa,
        kepala: {
          nama: inst.namaKepala,
          nip: inst.nipKepala,
          pangkat: inst.pangkatKepala,
          ttd: normalizeUrl(inst.ttdKepala || ""),
        },
      };

      reportStore.set({ ...reportStore.get(), instansi: mappedInstansi });
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

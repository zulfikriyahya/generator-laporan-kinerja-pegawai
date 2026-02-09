import api from "../utils/api";
import { reportStore, updateStore } from "../stores/reportStore";
import type { PegawaiDTO, AkademikDTO } from "../types/ReportTypes";

export const fetchPegawaiProfile = async () => {
  try {
    const response = await api.get("/pegawai/me");
    const data = response.data;

    if (data) {
      const apiBaseUrl =
        import.meta.env.PUBLIC_API_URL?.replace("/api", "") ||
        "http://localhost:3000";
      const normalizeUrl = (url: string) => {
        if (!url) return "";
        return url.startsWith("http") ? url : `${apiBaseUrl}${url}`;
      };

      updateStore("pegawai", {
        id: data.id,
        nama: data.nama,
        nip: data.nip,
        nuptk: data.nuptk || "",
        nik: data.nik || "",
        jenis: data.jenisPegawai,
        status: data.statusPegawai,
        golongan: data.golongan || "",
        jabatan: data.jabatan,
        unitKerja: data.unitKerja,
        tempatLahir: data.tempatLahir || "",
        tanggalLahir: data.tanggalLahir ? data.tanggalLahir.split("T")[0] : "",
        gender: data.gender,
        alamat: data.alamat || "",
        hp: data.hp || "",
        email: data.email || "",
        fotoPegawai: normalizeUrl(data.fotoPegawai || ""),
        pendidikan: data.pendidikan || "",
        masaKerjaTahun: String(data.masaKerjaTahun || 0),
        masaKerjaBulan: String(data.masaKerjaBulan || 0),
      });

      if (data.akademik) {
        updateStore("akademik", {
          kurikulum: data.akademik.kurikulum,
          tahunPelajaran: data.akademik.tahunPelajaran,
          semester: data.akademik.semester,
          mapel: data.akademik.mapel || "",
          kelas: data.akademik.kelas || "",
          jamMengajar: String(data.akademik.jamMengajar || 0),
          jumlahSiswa: String(data.akademik.jumlahSiswa || 0),
          ekskul: data.akademik.ekskul || "",
        });
      }
      return true;
    }
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return false;
    }
    console.warn("Gagal fetch pegawai:", error);
    return false;
  }
};

export const savePegawaiProfile = async () => {
  const store = reportStore.get();

  const formatDateToISO = (
    dateString: string | undefined,
  ): string | undefined => {
    if (!dateString || dateString.trim() === "") return undefined;

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return undefined;
      return date.toISOString();
    } catch {
      return undefined;
    }
  };

  const payload: PegawaiDTO = {
    nama: store.pegawai.nama,
    nip: store.pegawai.nip,
    jenisPegawai: store.pegawai.jenis,
    statusPegawai: store.pegawai.status,
    jabatan: store.pegawai.jabatan,
    unitKerja: store.pegawai.unitKerja,
    gender: store.pegawai.gender,
    golongan: store.pegawai.golongan || undefined,
    nuptk: store.pegawai.nuptk || undefined,
    nik: store.pegawai.nik || undefined,
    tempatLahir: store.pegawai.tempatLahir || undefined,
    tanggalLahir: formatDateToISO(store.pegawai.tanggalLahir),
    alamat: store.pegawai.alamat || undefined,
    hp: store.pegawai.hp || undefined,
    email: store.pegawai.email || undefined,
    pendidikan: store.pegawai.pendidikan || undefined,
    masaKerjaTahun: parseInt(store.pegawai.masaKerjaTahun) || 0,
    masaKerjaBulan: parseInt(store.pegawai.masaKerjaBulan) || 0,
    fotoPegawai: store.pegawai.fotoPegawai || undefined,
  };

  try {
    let response;
    const check = await api.get("/pegawai/me").catch(() => null);

    if (check && check.data && check.data.id) {
      response = await api.patch(`/pegawai/${check.data.id}`, payload);
      if (store.pegawai.id !== check.data.id) {
        updateStore("pegawai", { ...store.pegawai, id: check.data.id });
      }
    } else {
      response = await api.post("/pegawai", payload);
      if (response.data && response.data.id) {
        updateStore("pegawai", { ...store.pegawai, id: response.data.id });
      }
    }

    if (
      store.akademik.mapel &&
      store.akademik.kelas &&
      store.akademik.jamMengajar
    ) {
      const akademikPayload: AkademikDTO = {
        kurikulum: store.akademik.kurikulum,
        tahunPelajaran: store.akademik.tahunPelajaran,
        semester: store.akademik.semester,
        mapel: store.akademik.mapel,
        kelas: store.akademik.kelas,
        jamMengajar: parseInt(store.akademik.jamMengajar) || 0,
        jumlahSiswa: parseInt(store.akademik.jumlahSiswa) || 0,
        ekskul: store.akademik.ekskul || undefined,
      };

      const pegawaiId = response.data.id || check?.data?.id;
      if (pegawaiId) {
        try {
          const checkAkademik = await api
            .get(`/pegawai/${pegawaiId}`)
            .catch(() => null);

          if (checkAkademik?.data?.akademik) {
            await api.patch(
              `/pegawai/${pegawaiId}/akademik/${checkAkademik.data.akademik.id}`,
              akademikPayload,
            );
          } else {
            await api.post(`/pegawai/${pegawaiId}/akademik`, akademikPayload);
          }
        } catch (err) {
          console.warn("Gagal menyimpan akademik:", err);
        }
      }
    }

    return { success: true, data: response.data };
  } catch (error: any) {
    const errorMsg = Array.isArray(error.response?.data?.message)
      ? error.response.data.message.join(", ")
      : error.response?.data?.message || "Gagal menyimpan data pegawai";

    return {
      success: false,
      error: errorMsg,
    };
  }
};

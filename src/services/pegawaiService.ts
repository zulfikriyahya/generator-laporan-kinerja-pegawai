import api from "../utils/api";
import { reportStore, updateStore } from "../stores/reportStore";
import type { PegawaiDTO } from "../types/ReportTypes";

export const fetchPegawaiProfile = async () => {
  try {
    const response = await api.get("/pegawai/me");
    const data = response.data;

    if (data) {
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
        fotoPegawai: data.fotoPegawai || "",
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
    // Jika 404, artinya user baru belum punya data pegawai.
    // Jangan lempar error, return false saja agar UI tetap load form kosong.
    if (error.response && error.response.status === 404) {
      console.log("Profil pegawai belum ada, siap untuk input baru.");
      return false;
    }
    console.warn("Gagal fetch pegawai:", error);
    return false;
  }
};

export const savePegawaiProfile = async () => {
  const store = reportStore.get();

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
    tanggalLahir: store.pegawai.tanggalLahir
      ? new Date(store.pegawai.tanggalLahir).toISOString()
      : undefined,
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

    // Cek dulu apakah data sudah ada di backend
    const check = await api.get("/pegawai/me").catch(() => null);

    if (check && check.data && check.data.id) {
      // Jika ada, lakukan PATCH
      response = await api.patch(`/pegawai/${check.data.id}`, payload);
      if (store.pegawai.id !== check.data.id) {
        updateStore("pegawai", { ...store.pegawai, id: check.data.id });
      }
    } else {
      // Jika tidak ada (404), lakukan POST
      response = await api.post("/pegawai", payload);
      if (response.data && response.data.id) {
        updateStore("pegawai", { ...store.pegawai, id: response.data.id });
      }
    }

    return { success: true, data: response.data };
  } catch (error: any) {
    // Tangkap error validasi backend (misal statusPegawai salah enum)
    const errorMsg = Array.isArray(error.response?.data?.message)
      ? error.response.data.message.join(", ")
      : error.response?.data?.message || "Gagal menyimpan data pegawai";

    return {
      success: false,
      error: errorMsg,
    };
  }
};

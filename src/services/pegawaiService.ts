import api from "../utils/api";
import { reportStore, updateStore } from "../stores/reportStore";
import type { PegawaiDTO } from "../types/ReportTypes";

// Ambil data pegawai saat login
export const fetchPegawaiProfile = async () => {
  try {
    const response = await api.get("/pegawai/me");
    const data = response.data;

    if (data) {
      // Mapping dari Backend DB ke Frontend Store
      updateStore("pegawai", {
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
      return true;
    }
  } catch (error) {
    console.warn("Belum ada data pegawai:", error);
    return false;
  }
};

// Simpan/Update data pegawai
export const savePegawaiProfile = async () => {
  const store = reportStore.get();

  const payload: PegawaiDTO = {
    nama: store.pegawai.nama,
    nip: store.pegawai.nip,
    nuptk: store.pegawai.nuptk,
    nik: store.pegawai.nik,
    jenisPegawai: store.pegawai.jenis,
    statusPegawai: store.pegawai.status as any, // Sesuaikan enum
    golongan: store.pegawai.golongan,
    jabatan: store.pegawai.jabatan,
    unitKerja: store.pegawai.unitKerja,
    tempatLahir: store.pegawai.tempatLahir,
    tanggalLahir: store.pegawai.tanggalLahir
      ? new Date(store.pegawai.tanggalLahir).toISOString()
      : undefined,
    gender: store.pegawai.gender,
    alamat: store.pegawai.alamat,
    hp: store.pegawai.hp,
    email: store.pegawai.email,
    pendidikan: store.pegawai.pendidikan,
    masaKerjaTahun: parseInt(store.pegawai.masaKerjaTahun),
    masaKerjaBulan: parseInt(store.pegawai.masaKerjaBulan),
    fotoPegawai: store.pegawai.fotoPegawai,
  };

  try {
    // Cek dulu apakah create atau update
    // Strategi simpel: Coba Create, jika error 400 (sudah ada), lakukan Update
    // Tapi karena kita tidak simpan ID pegawai di store, kita coba fetch dulu atau try-catch

    // Coba Update via endpoint PATCH (biasanya butuh ID, tapi kita pakai logic user-bound)
    // Di backend PegawaiController, update butuh ID.
    // Kita cek dulu endpoint getMe untuk dapat ID.

    const check = await api.get("/pegawai/me").catch(() => null);

    if (check && check.data) {
      await api.patch(`/pegawai/${check.data.id}`, payload);
    } else {
      await api.post("/pegawai", payload);
    }

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal menyimpan data pegawai",
    };
  }
};

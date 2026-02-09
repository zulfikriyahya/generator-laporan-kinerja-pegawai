import api from "../utils/api";
import { reportStore, updateStore } from "../stores/reportStore";
import { addToast } from "../stores/toastStore";

export const fetchActiveInstansi = async () => {
  try {
    // Suppress console error untuk 404
    const response = await api.get("/instansi/active").catch((err) => {
      if (err.response && err.response.status === 404) return null;
      throw err;
    });

    if (response && response.data) {
      const data = response.data;
      updateStore("instansi", {
        id: data.id,
        header1: data.header1,
        header2: data.header2,
        header3: data.header3,
        alamat: data.alamat,
        telepon: data.telepon || "",
        email: data.email || "",
        website: data.website || "",
        logoUtama: data.logoUtama || "",
        logoInstansi: data.logoInstansi || "",
        logoInstitusi: "",
        titimangsa: data.titimangsa,
        kepala: {
          nama: data.namaKepala,
          nip: data.nipKepala,
          pangkat: data.pangkatKepala,
          ttd: data.ttdKepala || "",
        },
        kepalaTu: {
          nama: "",
          nip: "",
          pangkat: "",
          ttd: "",
        },
      });
      return true;
    }
    return false;
  } catch (error) {
    console.warn("Gagal mengambil data instansi:", error);
    return false;
  }
};

export const createManualInstansi = async () => {
  const store = reportStore.get();

  // Pastikan payload bersih
  const payload = {
    header1: store.instansi.header1 || "HEADER 1",
    header2: store.instansi.header2 || "HEADER 2",
    header3: store.instansi.header3 || "NAMA INSTANSI",
    alamat: store.instansi.alamat || "Alamat Instansi",
    telepon: store.instansi.telepon,
    email: store.instansi.email,
    website: store.instansi.website,
    // Pastikan ini mengirim URL jika sudah diupload, bukan base64 raksasa
    logoUtama: store.instansi.logoUtama,
    logoInstansi: store.instansi.logoInstansi,
    namaKepala: store.instansi.kepala.nama || "Nama Kepala",
    nipKepala: store.instansi.kepala.nip || "NIP Kepala",
    pangkatKepala: store.instansi.kepala.pangkat || "Pangkat",
    titimangsa: store.instansi.titimangsa || "Kota",
    isActive: true,
  };

  try {
    const res = await api.post("/instansi", payload);
    if (res.data) {
      updateStore("instansi", { ...store.instansi, id: res.data.id });
      addToast("Instansi berhasil disimpan ke server", "success");
      return true;
    }
  } catch (e: any) {
    addToast(
      "Gagal menyimpan instansi: " + (e.response?.data?.message || e.message),
      "error",
    );
    return false;
  }
  return false;
};

import api from "../utils/api";
import { reportStore, updateStore } from "../stores/reportStore";
import type { InstansiDTO } from "../types/ReportTypes";
import { addToast } from "../stores/toastStore";

export const fetchActiveInstansi = async () => {
  try {
    const response = await api.get("/instansi/active").catch((err) => {
      if (err.response && err.response.status === 404) return null;
      throw err;
    });

    if (response && response.data) {
      const data = response.data;

      const apiBaseUrl =
        import.meta.env.PUBLIC_API_URL?.replace("/api", "") ||
        "http://localhost:3000";
      const normalizeUrl = (url: string) => {
        if (!url) return "";
        return url.startsWith("http") ? url : `${apiBaseUrl}${url}`;
      };

      updateStore("instansi", {
        id: data.id,
        header1: data.header1,
        header2: data.header2,
        header3: data.header3,
        alamat: data.alamat,
        telepon: data.telepon || "",
        email: data.email || "",
        website: data.website || "",
        logoUtama: normalizeUrl(data.logoUtama || ""),
        logoInstansi: normalizeUrl(data.logoInstansi || ""),
        titimangsa: data.titimangsa,
        kepala: {
          nama: data.namaKepala,
          nip: data.nipKepala,
          pangkat: data.pangkatKepala,
          ttd: normalizeUrl(data.ttdKepala || ""),
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

  const payload: InstansiDTO = {
    header1: store.instansi.header1 || "HEADER 1",
    header2: store.instansi.header2 || "HEADER 2",
    header3: store.instansi.header3 || "NAMA INSTANSI",
    alamat: store.instansi.alamat || "Alamat Instansi",
    telepon: store.instansi.telepon,
    email: store.instansi.email,
    website: store.instansi.website,
    logoUtama: store.instansi.logoUtama,
    logoInstansi: store.instansi.logoInstansi,
    namaKepala: store.instansi.kepala.nama || "Nama Kepala",
    nipKepala: store.instansi.kepala.nip || "NIP Kepala",
    pangkatKepala: store.instansi.kepala.pangkat || "Pangkat",
    ttdKepala: store.instansi.kepala.ttd,
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
    const errorMsg = Array.isArray(e.response?.data?.message)
      ? e.response.data.message.join(", ")
      : e.response?.data?.message || e.message;
    addToast("Gagal menyimpan instansi: " + errorMsg, "error");
    return false;
  }
  return false;
};

export const updateInstansi = async () => {
  const store = reportStore.get();

  if (!store.instansi.id) {
    return createManualInstansi();
  }

  const payload: InstansiDTO = {
    header1: store.instansi.header1,
    header2: store.instansi.header2,
    header3: store.instansi.header3,
    alamat: store.instansi.alamat,
    telepon: store.instansi.telepon,
    email: store.instansi.email,
    website: store.instansi.website,
    logoUtama: store.instansi.logoUtama,
    logoInstansi: store.instansi.logoInstansi,
    namaKepala: store.instansi.kepala.nama,
    nipKepala: store.instansi.kepala.nip,
    pangkatKepala: store.instansi.kepala.pangkat,
    ttdKepala: store.instansi.kepala.ttd,
    titimangsa: store.instansi.titimangsa,
  };

  try {
    await api.patch(`/instansi/${store.instansi.id}`, payload);
    addToast("Instansi berhasil diupdate", "success");
    return true;
  } catch (e: any) {
    const errorMsg = Array.isArray(e.response?.data?.message)
      ? e.response.data.message.join(", ")
      : e.response?.data?.message || "Gagal update instansi";
    addToast("Gagal update instansi: " + errorMsg, "error");
    return false;
  }
};

import api from "../utils/api";

export const fetchMyReports = async (page = 1, limit = 20) => {
  try {
    const response = await api.get(
      `/reports/my-reports?page=${page}&limit=${limit}`,
    );
    return {
      success: true,
      data: response.data.data,
      meta: response.data.meta,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal mengambil laporan",
    };
  }
};

export const fetchReportById = async (id: string) => {
  try {
    const response = await api.get(`/reports/${id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal mengambil detail laporan",
    };
  }
};

export const updateReport = async (id: string, data: any) => {
  try {
    const response = await api.patch(`/reports/${id}`, data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal update laporan",
    };
  }
};

export const submitReport = async (id: string) => {
  try {
    const response = await api.post(`/reports/${id}/submit`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal submit laporan",
    };
  }
};

export const deleteReportById = async (id: string) => {
  try {
    await api.delete(`/reports/${id}`);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal menghapus laporan",
    };
  }
};

export const exportReportToPDF = async (id: string) => {
  try {
    const response = await api.get(`/reports/${id}/export/pdf`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `laporan_${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal export PDF",
    };
  }
};

export const exportReportToDOCX = async (id: string) => {
  try {
    const response = await api.get(`/reports/${id}/export/docx`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `laporan_${id}.docx`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal export DOCX",
    };
  }
};

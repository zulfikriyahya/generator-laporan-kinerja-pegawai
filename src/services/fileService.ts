import api from "../utils/api";

export const uploadFile = async (file: File, category: string = "OTHER") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("category", category);

  try {
    const response = await api.post("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      success: true,
      url: `${import.meta.env.PUBLIC_API_URL}${response.data.url}`,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Upload failed",
    };
  }
};

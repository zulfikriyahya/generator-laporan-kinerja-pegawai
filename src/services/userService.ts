import api from "../utils/api";

export const fetchUserProfile = async () => {
  try {
    const response = await api.get("/users/me");
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal mengambil profil",
    };
  }
};

export const updateUserProfile = async (data: {
  name?: string;
  email?: string;
}) => {
  try {
    const response = await api.patch("/users/me", data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal update profil",
    };
  }
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string,
) => {
  try {
    await api.post("/auth/change-password", { oldPassword, newPassword });
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal mengubah password",
    };
  }
};

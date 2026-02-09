import api from "../utils/api";

export const fetchNotifications = async (page = 1, limit = 20) => {
  try {
    const response = await api.get(
      `/notifications?page=${page}&limit=${limit}`,
    );
    return {
      success: true,
      data: response.data.data,
      meta: response.data.meta,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal mengambil notifikasi",
    };
  }
};

export const getUnreadCount = async () => {
  try {
    const response = await api.get("/notifications/unread-count");
    return {
      success: true,
      count: response.data.count,
    };
  } catch (error: any) {
    return {
      success: false,
      count: 0,
    };
  }
};

export const markAsRead = async (id: string) => {
  try {
    await api.patch(`/notifications/${id}/read`);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal menandai sebagai dibaca",
    };
  }
};

export const markAllAsRead = async () => {
  try {
    await api.patch("/notifications/read-all");
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.response?.data?.message || "Gagal menandai semua sebagai dibaca",
    };
  }
};

export const deleteNotification = async (id: string) => {
  try {
    await api.delete(`/notifications/${id}`);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal menghapus notifikasi",
    };
  }
};

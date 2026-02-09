import api from "../utils/api";
import { authStore } from "../stores/authStore";
import type { LoginDto, RegisterDto } from "../types/AuthTypes";

export const login = async (dto: LoginDto) => {
  try {
    const response = await api.post("/auth/login", dto);
    const { accessToken, refreshToken, user } = response.data;

    authStore.set({
      token: accessToken,
      refreshToken,
      user,
      isAuthenticated: true,
    });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Login failed",
    };
  }
};

export const register = async (dto: RegisterDto) => {
  try {
    const response = await api.post("/auth/register", dto);
    const { accessToken, refreshToken, user } = response.data;

    authStore.set({
      token: accessToken,
      refreshToken,
      user,
      isAuthenticated: true,
    });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: Array.isArray(error.response?.data?.message)
        ? error.response.data.message.join(", ")
        : error.response?.data?.message || "Registration failed",
    };
  }
};

export const logout = () => {
  authStore.set({
    token: "",
    refreshToken: "",
    user: null,
    isAuthenticated: false,
  });
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

export const getToken = () => {
  return authStore.get().token;
};

export const checkAuth = () => {
  return authStore.get().isAuthenticated;
};

export const getCurrentUser = () => {
  return authStore.get().user;
};

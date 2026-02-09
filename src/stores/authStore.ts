import { persistentMap } from "@nanostores/persistent";
import type { AuthState } from "../types/AuthTypes";

export const authStore = persistentMap<AuthState>(
  "ekinerja-auth:",
  {
    token: "",
    refreshToken: "",
    user: null,
    isAuthenticated: false,
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

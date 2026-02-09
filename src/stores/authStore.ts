import { persistentMap } from "@nanostores/persistent";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthState {
  token: string;
  refreshToken: string;
  user: User | null;
  isAuthenticated: boolean;
}

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

import { atom } from "nanostores";

export type ToastType = "success" | "error" | "info";

export type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

export const $toasts = atom<Toast[]>([]);

export const addToast = (message: string, type: ToastType = "info") => {
  const id = Date.now();
  $toasts.set([...$toasts.get(), { id, message, type }]);

  setTimeout(() => {
    $toasts.set($toasts.get().filter((t) => t.id !== id));
  }, 3000);
};

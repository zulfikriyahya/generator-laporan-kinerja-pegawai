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
  const currentToasts = $toasts.get();

  if (currentToasts.some((t) => t.message === message && t.type === type)) {
    return;
  }

  $toasts.set([...currentToasts, { id, message, type }]);

  setTimeout(() => {
    $toasts.set($toasts.get().filter((t) => t.id !== id));
  }, 4000);
};

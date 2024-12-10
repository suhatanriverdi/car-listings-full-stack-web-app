import { create } from "zustand";

type toastType =
  | "success"
  | "error"
  | "sending"
  | "login-error"
  | "logout-success"
  | "info"
  | null;

interface FormState {
  toastMessage: string | null;
  toastType: toastType;
  setToast: (message: string | null, type: toastType) => void;
  resetToast: () => void;
}

const useFormStore = create<FormState>((set) => ({
  toastMessage: null,
  toastType: null,

  // Set toast message and type
  setToast: (message, type) => set({ toastMessage: message, toastType: type }),

  // Reset the form (e.g., after submission)
  resetToast: () => set({ toastMessage: null, toastType: null }),
}));

export default useFormStore;

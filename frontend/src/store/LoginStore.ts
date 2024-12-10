import { create } from "zustand";

interface LoginState {
  isLoggedIn: boolean;
  accessToken: string | null;
  userId: string | null;
  setLogin: (token: string, userId: string) => void;
  logout: () => void;
}

const useLoginStore = create<LoginState>((set) => {
  // Check if token and userId exist in localStorage
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  return {
    isLoggedIn: !!token, // Set to true if token exists
    accessToken: token,
    userId: userId,

    // Set login state, save token and userId
    setLogin: (token, userId) => {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      set({ isLoggedIn: true, accessToken: token, userId: userId });
    },

    // Reset login state and clear token and userId
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      set({ isLoggedIn: false, accessToken: null, userId: null });
    },
  };
});

export default useLoginStore;

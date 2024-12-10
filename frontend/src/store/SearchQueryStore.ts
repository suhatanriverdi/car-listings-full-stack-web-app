import { create } from "zustand";

interface SearchState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resetSearchQuery: () => void;
}

export const useSearchQueryStore = create<SearchState>((set) => {
  return {
    searchQuery: "",

    setSearchQuery: (query) => set({ searchQuery: query }),
    resetSearchQuery: () => set({ searchQuery: "" }),
  };
});

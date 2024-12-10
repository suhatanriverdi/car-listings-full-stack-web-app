import { create } from "zustand";
import { SortFields, SortOrder } from "../utils/sortTypes";

interface SortState {
  sortField: SortFields;
  sortOrder: SortOrder;

  resetSortQuery: () => void;
  setSortQuery: (field: SortFields, order: SortOrder) => void;
}

export const useSortStore = create<SortState>((set) => {
  return {
    sortField: SortFields.YEAR,
    sortOrder: "",

    resetSortQuery: () => {
      set({ sortField: SortFields.YEAR, sortOrder: "" });
    },
    setSortQuery: (field, order) => set({ sortField: field, sortOrder: order }),
  };
});

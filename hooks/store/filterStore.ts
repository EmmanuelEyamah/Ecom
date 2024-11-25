import { create } from "zustand";

export type SortOption = "highRated" | "lowPrice" | "default";
export type FilterOption = "all" | "men" | "women" | "electronics" | "jewelry";

interface FilterStore {
  sortBy: SortOption;
  filterCategory: FilterOption;
  setSortBy: (sort: SortOption) => void;
  setFilterCategory: (category: FilterOption) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  sortBy: "default",
  filterCategory: "all",
  setSortBy: (sort) => set({ sortBy: sort }),
  setFilterCategory: (category) => set({ filterCategory: category }),
  resetFilters: () => set({ sortBy: "default", filterCategory: "all" }),
}));

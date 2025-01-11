import { create } from "zustand";

interface IFilter {
  maxPrice: number;
  minPrice: number;
  categories: string[];
  ratings: number[];
  currentPage: number;
  search: string;
  showReset: boolean;
}

interface FilterState {
  filters: IFilter;
  setFilters: (updates: Partial<IFilter>) => void;
  resetFilters: () => void;
}

// Initial State
const initialState: IFilter = {
  maxPrice: 0,
  minPrice: 0,
  categories: [],
  ratings: [],
  currentPage: 1,
  search: "",
  showReset: false,
};

// Create Filter Store
export const useFilterStore = create<FilterState>((set) => ({
  filters: initialState,

  setFilters: (updates) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...updates,
        showReset: Object.keys(updates).length > 0,
      },
    })),

  resetFilters: () => set({ filters: initialState }),
}));

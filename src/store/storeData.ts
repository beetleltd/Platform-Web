// store/useStoreData.ts
import { create } from "zustand";

type StoreDataState = {
  store: any;
  isStoreLoading: any;
  setStore: (store: any) => void;
  setStoreLoading: (loading: boolean) => void;
  resetStoreData: () => void;
};

export const useStoreData = create<StoreDataState>((set) => ({
  store: null,
  isStoreLoading: false,
  setStore: (store) => set({ store }),
  setStoreLoading: (loading) => set({ isStoreLoading: loading }),
  resetStoreData: () =>
    set({
      store: null,
      isStoreLoading: false,
    }),
}));

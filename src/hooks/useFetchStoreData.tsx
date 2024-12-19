// hooks/useFetchStoreData.ts
import { useGetStore } from "@/api/store";
import { useStoreData } from "@/store/storeData";
import { useEffect } from "react";

export const useFetchStoreData = (storeName: string | undefined) => {
  const { setStore, setStoreLoading, resetStoreData, store } = useStoreData();

  // Memoize API calls to prevent unnecessary fetches
  const storeQuery = useGetStore(storeName);

  // Reset state when the store name changes
  useEffect(() => {
    resetStoreData();
    setStoreLoading(true);
  }, [storeName, resetStoreData, setStoreLoading]);

  // Fetch store data and update Zustand only when data changes
  useEffect(() => {
    if (storeQuery?.data && storeQuery.data !== store) {
      setStore(storeQuery.data);
      setStoreLoading(false);
    }
  }, [storeQuery.data, store, setStore, setStoreLoading]);

  // Return combined loading and error states
  const isLoading = storeQuery.isLoading;
  const error = storeQuery.error;

  return { isLoading, error };
};

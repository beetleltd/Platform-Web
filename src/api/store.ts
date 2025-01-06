import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetStore = (storeName: string | undefined) => {
  const query = useQuery({
    queryKey: ["getStore", storeName],
    queryFn: async () => {
      const response = await api.get(
        `/public/search?k=account.r_username&v=${storeName}`
      );

      return response.data.data;
    },
  });

  const { data, isLoading, refetch, error } = query;

  return { data, isLoading, refetch, error };
};

export const useGetStoreProducts = (storeId: string) => {
  const query = useQuery({
    queryKey: ["getStoreProducts", storeId],
    queryFn: async () => {
      const response = await api.get(`/v1/resales?reseller=${storeId}`);

      return response.data.data;
    },
  });

  const { data, isLoading, refetch, error } = query;

  return { data, isLoading, refetch, error };
};

import api from "@/lib/api";
import { useFilterStore } from "@/store/filters";
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
  const { categories, currentPage, maxPrice, minPrice, ratings, search } =
    useFilterStore((state) => state.filters);

  const query = useQuery({
    queryKey: [
      "getStoreProducts",
      storeId,
      categories,
      currentPage,
      maxPrice,
      minPrice,
      ratings,
      search,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        reseller: storeId,
        page: currentPage.toString(),
        ...(maxPrice && { max_price: maxPrice.toString() }),
        ...(minPrice && { min_price: minPrice.toString() }),
        ...(categories.length > 0 && { categories: categories.join(",") }),
        ...(ratings.length > 0 && { ratings: ratings.join(",") }),
        ...(search && { search: search }),
      });

      const response = await api.get(`/v1/resales?${params.toString()}`);

      return response.data.data;
    },
  });

  const { data, isLoading, refetch, error } = query;

  return { data, isLoading, refetch, error };
};

export const useGetCategories = (storeId: string, option = {}) => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get(`/public/category?reseller=${storeId}`);

      return response.data;
    },
    ...option,
  });

  const { data, isLoading, refetch, error } = query;

  return { data, isLoading, refetch, error };
};

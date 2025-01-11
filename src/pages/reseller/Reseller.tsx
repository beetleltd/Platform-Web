import { useGetStoreProducts } from "@/api/store";
import Filters from "@/components/common/filters/Filters";
import ProductGrid from "@/components/common/products/ProductGrid";
import FullPageLoader from "@/components/loaders/FullPageLoader";
import { useFetchStoreData } from "@/hooks/useFetchStoreData";
import { useStoreData } from "@/store/storeData";
import { useParams } from "react-router-dom";
import StorefrontLayout from "../../components/layout/StoreFrontLayout";
import NotFound from "../NotFound";

const Reseller = () => {
  const { storeName } = useParams();
  const { isLoading: isStoreLoading, error } = useFetchStoreData(storeName);
  const { store } = useStoreData();
  // const { filters } = useFilterStore((state) => state);
  const { data, isLoading: isProductsLoading } = useGetStoreProducts(store?.id);

  // useEffect(() => {
  //   if (store?.id) {
  //     refetch();
  //   }
  // }, [filters, store?.id, refetch]);

  if (error) {
    return <NotFound />;
  }

  if (isStoreLoading) {
    return <FullPageLoader />;
  }

  return (
    <StorefrontLayout>
      <Filters />
      <ProductGrid products={data?.resales} isLoading={isProductsLoading} />
    </StorefrontLayout>
  );
};

export default Reseller;

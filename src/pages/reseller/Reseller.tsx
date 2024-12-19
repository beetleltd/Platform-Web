import { useGetStoreProducts } from "@/api/store";
import FullPageLoader from "@/components/loaders/FullPageLoader";
import { useFetchStoreData } from "@/hooks/useFetchStoreData";
import { useParams } from "react-router-dom";
import ProductGrid from "../../components/common/products/ProductGrid";
import StorefrontLayout from "../../components/layout/StoreFrontLayout";
import { useStoreData } from "@/store/storeData";

const Reseller = () => {
  const { storeName } = useParams();
  const { isLoading: isStoreLoading, error } = useFetchStoreData(storeName);
  const { store } = useStoreData();
  const { data, isLoading: isProductsLoading } = useGetStoreProducts(store?.id);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isStoreLoading) {
    return <FullPageLoader />;
  }

  console.log(data?.resales);

  return (
    <StorefrontLayout>
      {/* TODO: PRODUCT FILTERS */}
      {/* <div>Reseller Page</div> */}

      <ProductGrid products={data?.resales} isLoading={isProductsLoading} />
    </StorefrontLayout>
  );
};

export default Reseller;

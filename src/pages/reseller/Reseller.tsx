import ProductGrid from "../../components/common/products/ProductGrid";
import StorefrontLayout from "../../components/layout/StoreFrontLayout";

const Reseller = () => {
  return (
    <StorefrontLayout type="r">
      <div>Reseller Page</div>
      <ProductGrid />
    </StorefrontLayout>
  );
};

export default Reseller;

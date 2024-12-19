import React from "react";
import ProductSingle from "./ProductSingle";
import SkeletonLoader from "@/components/loaders/SkeletonLoader";

type ProductGridProps = {
  products: any[];
  isLoading: boolean;
};

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-1 md:gap-x-2 md:gap-y-3 px-0 py-10 ">
      {isLoading
        ? Array.from({ length: 12 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        : products?.map((product) => (
            <ProductSingle key={product.id} product={product} />
          ))}
    </div>
  );
};

export default ProductGrid;

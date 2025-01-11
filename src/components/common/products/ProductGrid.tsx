import React from "react";
import ProductSingle from "./ProductSingle";
import SkeletonLoader from "@/components/loaders/SkeletonLoader";
import { IoMdSad } from "react-icons/io";

type ProductGridProps = {
  products: any[];
  isLoading: boolean;
};

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-x-3 md:gap-y-3 px-0 pt-5 pb-10">
      {isLoading ? (
        Array.from({ length: 12 }).map((_, index) => (
          <SkeletonLoader key={index} />
        ))
      ) : products?.length === 0 || !products ? (
        <div className="col-span-full flex flex-col items-center justify-center text-center py-10">
          <IoMdSad className="text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No Products Found
          </h2>
          <p className="text-gray-500">
            Try adjusting your filters or check back later.
          </p>
        </div>
      ) : (
        products?.map((product) => (
          <ProductSingle key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductGrid;

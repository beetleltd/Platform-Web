import React from "react";
import ProductCard from "./ProductCard";
import { products } from "../../../constants/dummy";

const ProductGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 px-0 py-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;

import React, { useState } from "react";
import Button from "../../shared/Button";
import { Product } from "../../../constants/dummy";
import ProductDetailsModal from "./ProductDetailsModal";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isProductDetailsModalOpen, setIsProductDetailsModalOpen] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <div className="hover:shadow-gray-100 hover:shadow-lg p-4 transition-all duration-150 cursor-pointer ease-in-out">
        <div
          onClick={() => {
            setSelectedProduct(product);
            setIsProductDetailsModalOpen(true);
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded"
          />
          <div className="space-y-1">
            <h2 className="text-sm font-semibold mt-2 truncate">
              {product.name}
            </h2>
            <p className="text-primary font-bold text-lg">{product.price}</p>
          </div>
        </div>

        <div className="flex items-center text-yellow-500 text-sm pt-1 pb-2">
          {"★".repeat(Math.floor(product.rating))}
          {"☆".repeat(5 - Math.floor(product.rating))}
          <span className="text-gray-500 font-medium pl-2">
            {product.rating}
          </span>
        </div>
        <Button size="sm" className="w-full py-2">
          Add to cart
        </Button>
      </div>
      {selectedProduct && (
        <ProductDetailsModal
          isOpen={isProductDetailsModalOpen}
          setIsOpen={setIsProductDetailsModalOpen}
          product={selectedProduct}
          quantity={1}
          handleIncrease={() => {}}
          handleDecrease={() => {}}
        />
      )}
    </>
  );
};

export default ProductCard;

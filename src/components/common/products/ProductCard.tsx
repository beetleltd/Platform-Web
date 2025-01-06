import React from "react";
import PriceFormatter from "./PriceFormatter";
import Ratings from "./Ratings";

interface ProductCardProps {
  product: any;
  handleOpen: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, handleOpen }) => {
  const availableQuantity = product.backing_product?.units;
  const isOutOfStock = availableQuantity <= 0;

  return (
    <div
      onClick={handleOpen}
      className="bg-white border border-gray-100 transition-shadow duration-200 overflow-hidden relative cursor-pointer"
    >
      {/* Out of Stock Badge */}
      {isOutOfStock && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded shadow-md">
          Out of Stock
        </div>
      )}

      {/* Product Image */}
      <div className="w-full h-72 overflow-hidden rounded-t">
        <img
          src={
            product.medias[0]?.url || product.backing_product?.medias[0]?.url
          }
          alt={product.backing_product?.name || "Product Image"}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-1 text-gray-800">
        <h2
          className="text-xs uppercase font-bold text-gray-700 truncate"
          title={product.backing_product?.name}
        >
          {product.backing_product?.name}
        </h2>
        <p className="text-xl font-normal text-primary">
          <PriceFormatter
            price={product?.marked_price}
            currency={product?.currency}
          />
        </p>
        {product?.rating > 0 && (
          <div className="flex items-center space-x-2">
            <Ratings rating={product.rating} />
            <span className="text-xs text-gray-700">({product.rating})</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

import React from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Button from "../../shared/Button";
import PriceFormatter from "./PriceFormatter";
import Ratings from "./Ratings";

interface ProductCardProps {
  product: any;
  handleAddToCart: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  handleOpen: () => void;
  isInCart: boolean;
  quantity: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  handleOpen,
  handleAddToCart,
  decreaseQuantity,
  increaseQuantity,
  isInCart,
  quantity,
}) => {
  const availableQuantity = product.products[0]?.units;

  return (
    <>
      <div className="space-y-3 p-2 hover:shadow-gray-100 hover:shadow-md transition-all duration-150 cursor-pointer ease-in-out">
        <div
          onClick={() => {
            handleOpen();
          }}
        >
          <img
            src={product.medias[0]?.url || product.products[0]?.medias[0]?.url}
            alt={product.products[0]?.name}
            className="w-full h-50 object-cover rounded"
          />
          <div className="space-y-1 text-gray-700">
            <h2 className="text-sm font-semibold mt-2 truncate">
              {product.products[0]?.name}
            </h2>
            <p className="text-primary font-medium text-lg md:text-xl">
              <PriceFormatter
                price={product?.marked_price}
                currency={product?.currency}
              />
            </p>
            <Ratings rating={product.rating} />
          </div>
        </div>
        {isInCart ? (
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                decreaseQuantity(product.id);
              }}
              className="px-4 shadow-lg py-2 bg-reseller-primary text-white rounded"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => increaseQuantity(product.id)}
              className={`px-4 shadow-lg py-2 bg-reseller-primary text-white rounded ${
                product?.quantity >= availableQuantity
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={quantity >= availableQuantity}
            >
              +
            </button>
          </div>
        ) : (
          <Button
            onClick={() => handleAddToCart()}
            className="w-full text-white  hover:bg-primary-dark transition"
          >
            <span className="inline-flex items-center justify-center gap-x-2 text-sm md:text-base">
              <MdOutlineAddShoppingCart />
              Add to Cart
            </span>
          </Button>
        )}
      </div>
    </>
  );
};

export default ProductCard;

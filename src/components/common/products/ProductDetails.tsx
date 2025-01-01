import React from "react";
import Button from "@/components/shared/Button";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import PriceFormatter from "./PriceFormatter";
import Ratings from "./Ratings";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type ProductDetailsProps = {
  handleAddToCart: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  isInCart: boolean;
  product: any;
  quantity: number;
};

const ProductDetails = ({
  product,
  handleAddToCart,
  increaseQuantity,
  decreaseQuantity,
  isInCart,
  quantity,
}: ProductDetailsProps) => {
  const availableQuantity = product.backing_product?.units;
  const isOutOfStock = availableQuantity <= 0;
  const navigate = useNavigate();

  return (
    <div className="block md:flex md:gap-x-8 p-4 md:p-6 lg:p-8">
      {/* Product Image Section */}
      <div className="relative w-full md:w-1/2 h-96 md:h-[700px] overflow-hidden rounded-lg">
        {isOutOfStock && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded shadow-md z-10">
            Out of Stock
          </div>
        )}
        <img
          src={
            product.medias[0]?.url || product.backing_product?.medias[0]?.url
          }
          alt={product.backing_product?.name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Product Details Section */}
      <div className="mt-6 md:mt-0 w-full md:w-1/2 space-y-6 text-gray-800">
        <h1 className="text-xl md:text-2xl font-semibold">
          {product.backing_product?.name}
        </h1>

        <div className="space-y-2">
          <p className="text-2xl md:text-3xl font-bold text-primary">
            <PriceFormatter price={product.marked_price} />
          </p>
          {product.rating > 0 && (
            <div className="flex items-center gap-x-2">
              <Ratings rating={product.rating} />
              <span className="text-sm text-gray-500">({product.rating})</span>
            </div>
          )}
        </div>

        <p className="text-gray-600">{product.backing_product?.description}</p>

        {!isOutOfStock && (
          <>
            <p className="text-sm font-medium">Quantity:</p>
            {isInCart ? (
              <div className="flex w-full justify-between items-center space-x-4">
                <button
                  onClick={() => decreaseQuantity(product.id)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => increaseQuantity(product.id)}
                  className={`px-4 py-2 ${
                    quantity >= availableQuantity
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  } rounded`}
                  disabled={quantity >= availableQuantity}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            ) : (
              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary text-white font-medium py-3 rounded hover:bg-primary-dark transition-all"
              >
                <MdOutlineAddShoppingCart className="inline-block mr-2 text-lg" />
                Add to Cart
              </Button>
            )}
          </>
        )}

        {isInCart && !isOutOfStock && (
          <button
            onClick={() => navigate(`${window.location.pathname}/cart`)}
            className="mt-4 w-full border flex items-center justify-center text-primary border-primary py-2 rounded-md hover:bg-gray-100 transition"
          >
            <IoCartOutline className="text-lg mr-2" />
            Go to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

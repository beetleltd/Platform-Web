import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StorefrontLayout from "@/components/layout/StoreFrontLayout";
import Button from "@/components/shared/Button";
import PriceFormatter from "@/components/common/products/PriceFormatter";
import { useCartStore } from "@/hooks/useCartSore";

const ResellerCart = () => {
  const navigate = useNavigate();
  const {
    cart: products,
    calculateSubtotal: subtotal,
    clearCart,
    decrementQuantity: decreaseQuantity,
    incrementQuantity: increaseQuantity,
    removeFromCart: removeProduct,
  } = useCartStore();

  useEffect(() => {
    if (products.length === 0) {
      clearCart();
    }
  }, [clearCart, products.length]);

  const { storeName } = useParams();

  return (
    <StorefrontLayout>
      <div className="container mx-auto p-4 min-h-dvh">
        <h1 className="text-2xl font-bold mb-4">
          Cart ({products.length} {products.length > 1 ? "items" : "item"})
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Product List */}
          <div className="md:col-span-2 max-h-dvh overflow-y-auto">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-3 items-center border-b border-gray-200 py-4 gap-4"
                >
                  <div className="flex items-center">
                    <img
                      src={
                        product.medias[0]?.url ||
                        product.backing_product?.medias[0]?.url
                      }
                      alt={product.backing_product?.name}
                      className="h-16 w-24 object-cover mr-4"
                    />
                    <div>
                      <p className="font-semibold">
                        {product.backing_product?.name}
                      </p>
                      <p className="text-gray-500 !text-sm md:text-base">
                        <PriceFormatter price={product.marked_price} />
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-4 sm:space-x-10">
                    <button
                      onClick={() => {
                        decreaseQuantity(product.id);
                      }}
                      className="px-3 py-1 text-lg font-bold border border-gray-300 rounded"
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(product.id)}
                      className={`px-3 py-1 border border-gray-300 rounded text-lg flex items-center justify-center${
                        product.quantity >= product.backing_product?.units
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                      disabled={
                        product.quantity >= product.backing_product?.units
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>

          {/* Summary */}
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>
                <PriceFormatter price={subtotal()} />
              </span>
            </div>

            <div className="w-full border border-dashed my-5"></div>

            <Button
              className="w-full"
              onClick={() => navigate(`/${storeName}/checkout`)}
              disabled={products?.length === 0}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </StorefrontLayout>
  );
};

export default ResellerCart;

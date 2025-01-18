import PriceFormatter from "@/components/common/products/PriceFormatter";
import StorefrontLayout from "@/components/layout/StoreFrontLayout";
import FullPageLoader from "@/components/loaders/FullPageLoader";
import Button from "@/components/shared/Button";
import { useCartStore } from "@/hooks/useCartSore";
import { useFetchStoreData } from "@/hooks/useFetchStoreData";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../NotFound";
import { FaTrash } from "react-icons/fa";

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
  const { isLoading: isStoreLoading, error } = useFetchStoreData(storeName);

  if (error) {
    return <NotFound />;
  }

  if (isStoreLoading) {
    return <FullPageLoader />;
  }

  return (
    <StorefrontLayout>
      <div className="container mx-auto p-4 min-h-dvh">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">
          Cart ({products.length} {products.length > 1 ? "items" : "item"})
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Product List */}
          <div className="lg:col-span-2 max-h-dvh overflow-y-auto">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-3 border-b border-gray-200 py-4 gap-4"
                >
                  {/* Image */}
                  <div className="flex gap-y-3 gap-x-3 sm:items-center flex-col sm:flex-row ">
                    <img
                      src={
                        product.medias[0]?.url ||
                        product.backing_product?.medias[0]?.url
                      }
                      alt={product.backing_product?.name}
                      className="h-16 w-full sm:w-24 object-cover"
                    />

                    {/* Product Details */}
                    <div className="flex flex-col flex-1 truncate">
                      <p className="font-semibold text-sm sm:text-base">
                        {product.backing_product?.name}
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        <PriceFormatter price={product.marked_price} />
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                    <button
                      onClick={() => decreaseQuantity(product.id)}
                      className="px-2 py-1 text-sm sm:text-lg font-bold border border-gray-300 rounded"
                    >
                      -
                    </button>
                    <span className="text-sm sm:text-base">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(product.id)}
                      className={`px-2 py-1 border border-gray-300 rounded text-sm sm:text-lg flex items-center justify-center ${
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

                  {/* Remove Button */}
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="text-red-500 flex items-center justify-center hover:underline text-base sm:text-sm"
                  >
                    <span className="hidden sm:inline">Remove</span>
                    <FaTrash className="sm:hidden text-xl" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm sm:text-base">Your cart is empty.</p>
            )}
          </div>

          {/* Summary */}
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-sm sm:text-base">Subtotal</span>
              <span className="text-sm sm:text-base">
                <PriceFormatter price={subtotal()} />
              </span>
            </div>

            <div className="w-full border border-dashed my-5"></div>

            <Button
              className="w-full text-sm sm:text-base"
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

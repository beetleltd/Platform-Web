import { useEffect } from "react";
import StorefrontLayout from "../../components/layout/StoreFrontLayout";
import { useCartStore } from "../../store/cart";
import Button from "../../components/shared/Button";
import { useNavigate } from "react-router-dom";

const ResellerCart: React.FC = () => {
  const {
    cart: products,
    calculateSubtotal: subtotal,
    incrementQuantity: increaseQuantity,
    decrementQuantity: decreaseQuantity,
    removeFromCart: removeProduct,
    clearCart,
  } = useCartStore();

  const navigate = useNavigate();
  useEffect(() => {
    const storedCart = localStorage.getItem("cart-storage");
    if (storedCart) {
      const { timestamp } = JSON.parse(storedCart);
      const oneDay = 24 * 60 * 60 * 1000;
      if (Date.now() - timestamp > oneDay) {
        localStorage.removeItem("cart-storage");
        clearCart();
      }
    }
  }, [clearCart]);

  return (
    <StorefrontLayout>
      <div className="container mx-auto p-4 min-h-dvh">
        <h1 className="text-2xl font-bold mb-4">
          Cart ({products.length} items)
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Product List */}
          <div className="md:col-span-2 max-h-dvh overflow-y-auto">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-3 items-center border-b border-gray-200 py-4"
                >
                  <div className="flex items-center">
                    <img
                      src={
                        product.medias[0]?.url ||
                        product.products[0]?.medias[0]?.url
                      }
                      alt={product.products[0]?.name}
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <div>
                      <p className="font-semibold">
                        {product.products[0]?.name}
                      </p>
                      <p className="text-gray-500">
                        ₦{product?.marked_price?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => {
                        decreaseQuantity(product.id);
                      }}
                      className="px-2 py-1 border border-gray-300 rounded"
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(product.id)}
                      className={`px-2 py-1 border border-gray-300 rounded ${
                        product.quantity >= product.products[0]?.units
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                      disabled={product.quantity >= product.products[0]?.units}
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
          <div className="p-4 bg-gray-100 rounded-lg shadow-md ">
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₦{subtotal()}</span>
            </div>

            <div className="w-full border border-dashed my-5"></div>

            <Button
              className="w-full"
              onClick={() => navigate("/r/checkout")}
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

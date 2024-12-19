import { HiOutlineShoppingCart } from "react-icons/hi";

import { useTheme } from "../../contexts/ThemeContext";
import { useCartStore } from "../../store/cart";

const CartIcon = () => {
  const { theme } = useTheme();
  const { cart: products } = useCartStore();
  return (
    <div className="inline-block">
      {/* Cart Icon */}
      <div className="flex items-center gap-x-1">
        <div className="relative">
          <HiOutlineShoppingCart className="text-3xl text-gray-700" />

          {/* Badge */}
          {products.length > 0 && (
            <span
              className={`absolute top-0 right-0 transform translate-x-2 -translate-y-2 ${
                theme === "business"
                  ? "bg-business-primary"
                  : "bg-reseller-primary"
              } text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center `}
            >
              {products.length > 99 ? "99+" : products.length}
            </span>
          )}
        </div>
        <p className="font-semibold hidden md:block text-gray-700">Cart</p>
      </div>
    </div>
  );
};

export default CartIcon;

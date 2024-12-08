import { IoCartOutline } from "react-icons/io5";
import { useTheme } from "../../contexts/ThemeContext";

const CartIcon = ({ cartCount }: { cartCount: number }) => {
  const { theme } = useTheme();
  return (
    <div className="relative inline-block">
      {/* Cart Icon */}
      <IoCartOutline className="w-10 h-10 " />

      {/* Badge */}
      {cartCount > 0 && (
        <span
          className={`absolute top-0 right-0 transform translate-x-2 -translate-y-2 ${
            theme === "business" ? "bg-business-primary" : "bg-reseller-primary"
          } text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center  `}
        >
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;

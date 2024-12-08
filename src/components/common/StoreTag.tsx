import { useTheme } from "../../contexts/ThemeContext";
import { BsPatchCheckFill } from "react-icons/bs";

const StoreTag = () => {
  const { theme } = useTheme();
  return (
    <span
      className={`${
        theme === "business"
          ? "bg-business-light text-business-primary"
          : "bg-reseller-light text-reseller-primary"
      } py-1 px-2 rounded-full text-xs font-medium inline-flex gap-x-2 items-center`}
    >
      <BsPatchCheckFill
        className={`${
          theme === "business"
            ? "text-business-primary"
            : "text-reseller-primary"
        } w-3 h-3  `}
      />
      {theme === "business" ? "Business" : "Reseller"}
    </span>
  );
};

export default StoreTag;

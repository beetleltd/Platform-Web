import { createCartStore } from "@/store/cart";

const getStorefrontKey = () => {
  const pathname = window.location.pathname; // e.g., "/shop1"
  return pathname.split("/")[1]; // Extract "shop1" or similar
};

// Generate the store dynamically based on the storefront key
const storefrontKey = getStorefrontKey();
export const useCartStore = createCartStore(storefrontKey);

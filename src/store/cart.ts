import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartState {
  cart: any[];
  addToCart: (product: any) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  getQuantity: (id: string) => number;
  calculateSubtotal: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => {
          const existingProduct = state.cart.find(
            (item) => item.id === product.id
          );
          if (existingProduct) return state; // Prevent duplicates
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),

      incrementQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id && item.quantity < (item.products[0]?.units || 0)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decrementQuantity: (id) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0), // Remove if quantity is 0
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      getQuantity: (id) => {
        const product = get().cart.find((item) => item.id === id);
        return product ? product.quantity : 0;
      },

      calculateSubtotal: () =>
        get().cart.reduce(
          (total, item) => total + item.marked_price * item.quantity,
          0
        ),

      clearCart: () => set(() => ({ cart: [] })),
    }),
    {
      name: "cart-storage", // Unique name for localStorage
      storage: createJSONStorage(() => localStorage), // Persist with localStorage
    }
  )
);

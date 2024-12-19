import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useResponsive } from "@/hooks/useResponsive";
import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductDetails from "./ProductDetails";
import { Product } from "@/constants/dummy";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCartStore } from "@/store/cart";

type ProductSingleProps = {
  product: Product;
};

const ProductSingle = ({ product }: ProductSingleProps) => {
  const { isMobile } = useResponsive();
  const [isOpen, setIsOpen] = useState(false);

  const { cart, addToCart, getQuantity, incrementQuantity, decrementQuantity } =
    useCartStore();
  const quantity = getQuantity(product.id);

  // Check if the product is already in the cart
  const isInCart = cart.some((cartProduct) => cartProduct.id === product.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product);
    }
  };

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger className="!text-justify">
          <ProductCard
            product={product}
            handleOpen={() => setIsOpen(true)}
            handleAddToCart={handleAddToCart}
            increaseQuantity={incrementQuantity}
            decreaseQuantity={decrementQuantity}
            isInCart={isInCart}
            quantity={quantity}
          />
        </DrawerTrigger>
        <DrawerContent>
          <ProductDetails
            product={product}
            handleAddToCart={handleAddToCart}
            increaseQuantity={incrementQuantity}
            decreaseQuantity={decrementQuantity}
            isInCart={isInCart}
            quantity={quantity}
          />
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <ProductCard
        product={product}
        handleOpen={() => setIsOpen(true)}
        handleAddToCart={handleAddToCart}
        increaseQuantity={incrementQuantity}
        decreaseQuantity={decrementQuantity}
        isInCart={isInCart}
        quantity={quantity}
      />
      <DialogContent>
        <ProductDetails
          product={product}
          handleAddToCart={handleAddToCart}
          increaseQuantity={incrementQuantity}
          decreaseQuantity={decrementQuantity}
          isInCart={isInCart}
          quantity={quantity}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductSingle;

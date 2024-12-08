import React from "react";
import Modal from "../../shared/Modal";
import { Product } from "../../../constants/dummy";
import Button from "../../shared/Button";

type TProductDetailsModal = {
  product: Product;
  quantity: number;
  handleIncrease: () => void;
  handleDecrease: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const ProductDetailsModal = ({
  product,
  quantity,
  handleIncrease,
  handleDecrease,
  isOpen,
  setIsOpen,
}: TProductDetailsModal) => {
  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section: Images */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded"
          />
          <div className="flex mt-4 gap-2">
            {/* Thumbnail Images */}
            {[product.image, product.image, product.image].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Thumbnail ${index + 1}`}
                className="w-16 h-16 object-cover rounded cursor-pointer hover:border hover:border-primary"
              />
            ))}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p className="text-primary font-bold text-xl mt-2">{product.price}</p>
          <div className="flex items-center text-yellow-500 text-sm mt-1">
            {"★".repeat(Math.floor(product.rating))}
            <span className="ml-2 text-gray-500">({product.rating})</span>
          </div>
          <p className="text-gray-600 mt-4">
            Women fashion handbags wallet tote bag shoulder bag top handle
            satchel purse set 4pcs
          </p>

          {/* Quantity Selector */}
          <div className="mt-6">
            <label htmlFor="quantity" className="block font-semibold">
              Quantity
            </label>
            <div className="flex items-center mt-2">
              <button
                onClick={handleDecrease}
                className="px-3 py-2 border rounded-l-md bg-gray-200 hover:bg-gray-300"
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                readOnly
                className="w-12 text-center border-y border-gray-300"
              />
              <button
                onClick={handleIncrease}
                className="px-3 py-2 border rounded-r-md bg-gray-200 hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button>Add to cart</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;

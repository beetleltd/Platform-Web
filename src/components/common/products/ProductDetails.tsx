import Button from "@/components/shared/Button";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import PriceFormatter from "./PriceFormatter";
import Ratings from "./Ratings";

type ProductDetailsProps = {
  handleAddToCart: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  isInCart: boolean;
  product: any;
  quantity: number;
};

const ProductDetails = ({
  product,
  handleAddToCart,
  increaseQuantity,
  decreaseQuantity,
  isInCart,
  quantity,
}: ProductDetailsProps) => {
  const availableQuantity = product.products[0]?.units;

  return (
    <div className="p-2 block md:flex md:gap-x-5 space-y-5 md:space-y-0">
      <div className="w-full md:w-[60%]">
        <img
          src={product.medias[0]?.url || product.products[0]?.medias[0]?.url}
          alt={product.products[0]?.name}
          className="w-full"
        />
      </div>
      <div className="text-gray-700 space-y-3 w-full md:w-[40%]">
        <p className="text-lg ">{product?.products[0]?.name}</p>
        <div>
          <p className="text-3xl">
            <PriceFormatter price={product.marked_price} />
          </p>
          <Ratings rating={product.rating} />
        </div>

        <div>
          <p className="text-sm">Quantity</p>
        </div>

        <p>{product?.products[0]?.description}</p>

        {isInCart ? (
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                decreaseQuantity(product.id);
              }}
              className="px-4 shadow-lg py-2 bg-reseller-primary text-white rounded"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => increaseQuantity(product.id)}
              className={`px-4 shadow-lg py-2 bg-reseller-primary text-white rounded ${
                product.quantity >= availableQuantity
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={product?.quantity >= availableQuantity}
            >
              +
            </button>
          </div>
        ) : (
          <Button
            onClick={() => handleAddToCart()}
            className="w-full text-white  hover:bg-primary-dark transition"
          >
            <span className="inline-flex items-center justify-center gap-x-2 text-sm md:text-base">
              <MdOutlineAddShoppingCart />
              Add to Cart
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

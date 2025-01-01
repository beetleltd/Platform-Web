import Button from "@/components/shared/Button";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import PriceFormatter from "./PriceFormatter";
import Ratings from "./Ratings";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

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
  const availableQuantity = product.backing_product?.units;
  const navigate = useNavigate();

  return (
    <div className=" block md:flex md:gap-x-5 space-y-5 md:space-y-0">
      <div className="w-full md:w-[60%] h-[500px] md:h-[700px]">
        <img
          src={
            product.medias[0]?.url || product.backing_product?.medias[0]?.url
          }
          alt={product.backing_product?.name}
          className="object-cover w-full h-full object-center"
        />
      </div>
      <div className="text-gray-700 space-y-3 w-full md:w-[40%]">
        <p className="text-lg ">{product?.backing_product?.name}</p>
        <div>
          <p className="text-3xl">
            <PriceFormatter price={product.marked_price} />
          </p>
          {product.rating > 0 && <Ratings rating={product.rating} />}
        </div>

        <div>
          <p className="text-sm">Quantity</p>
        </div>

        <p>{product?.backing_product?.description}</p>

        {isInCart ? (
          <div className="flex flex-col gap-y-2">
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

            <button
              className="flex items-center gap-x-2 justify-center border border-gray-500 py-2 rounded-md font-medium shadow-sm hover:bg-gray-100 transition"
              onClick={() => navigate(`${window.location.pathname}/cart`)}
            >
              Go to cart
              <IoCartOutline className="text-xl" />
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

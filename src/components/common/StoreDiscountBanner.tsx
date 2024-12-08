import { BiX } from "react-icons/bi";
import Container from "../layout/Container";
type Props = {
  theme: string;
};

const StoreDiscountBanner = ({ theme }: Props) => {
  return (
    <div
      className={`flex items-center w-full py-3 ${
        theme === "business" ? "bg-business-dark" : "bg-reseller-dark"
      }`}
    >
      <Container>
        <div className="w-full grid grid-cols-3">
          <div></div>
          <div>
            <p className="text-white text-sm text-center">
              Get 10% off on all products
            </p>
          </div>
          <div className="flex justify-end">
            <BiX className="text-2xl text-white cursor-pointer" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StoreDiscountBanner;

import { BiX } from "react-icons/bi";
import Container from "../layout/Container";
import { useState } from "react";
type Props = {
  theme: string;
};

const StoreDiscountBanner = ({ theme }: Props) => {
  const [showBanner, setShowBanner] = useState(false);
  const handleClose = () => {
    setShowBanner(false);
  };
  if (!showBanner) {
    return null;
  }
  return (
    <div
      className={` py-3 ${
        theme === "business" ? "bg-business-dark" : "bg-reseller-dark"
      }`}
    >
      <Container>
        <div className="w-full flex items-center justify-between">
          <div className="flex-1">
            <p className="text-white text-sm text-center">
              Get 10% off on all products
            </p>
          </div>
          <div className="flex text-right">
            <button onClick={() => handleClose()}>
              <BiX className="text-2xl text-white cursor-pointer" />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StoreDiscountBanner;

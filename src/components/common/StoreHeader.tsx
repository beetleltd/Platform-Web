import Container from "../layout/Container";
import { IoSearchOutline } from "react-icons/io5";

import StoreProfileMenu from "./StoreProfileMenu";
import { useState } from "react";
import CartIcon from "../icons/CartIcon";

type TStoreHeader = {
  theme: string;
};

const StoreHeader = ({ theme }: TStoreHeader) => {
  const [cartCount, _] = useState(99);
  return (
    <div
      className={`${
        theme === "business" ? "bg-business-light" : "bg-reseller-light"
      } py-10`}
    >
      <Container>
        <div className="flex items-center gap-x-5">
          <div>
            <StoreProfileMenu />
          </div>
          <div className="flex flex-1 items-center">
            <div className="relative w-[90%] mx-auto">
              <input
                type="text"
                placeholder="Search..."
                className="px-5 py-3 border rounded-full w-full outline-none "
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                <IoSearchOutline className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
          <div>
            <CartIcon cartCount={cartCount} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StoreHeader;

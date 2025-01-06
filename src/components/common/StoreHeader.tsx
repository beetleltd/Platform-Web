import { IoSearchOutline } from "react-icons/io5";
import Container from "../layout/Container";

import { Link } from "react-router-dom";
import CartIcon from "../icons/CartIcon";
import StoreProfileMenu from "./StoreProfileMenu";
import SearchInput from "./SearchInput";
import { useStoreData } from "@/store/storeData";

type TStoreHeader = {
  theme: string;
};

const StoreHeader = ({ theme }: TStoreHeader) => {
  const { store } = useStoreData();
  return (
    <div
      className={`${
        // theme === "business" ? "bg-business-light" : "bg-reseller-light"
        "bg-gray-100"
      } py-5 md:py-10 `}
    >
      <Container>
        <div className="flex items-center gap-x-5 justify-between ">
          <Link to={`/${store?.username}`} className="cursor-pointer">
            <StoreProfileMenu />
          </Link>

          <div className="md:flex-1 flex gap-x-5 items-center">
            <SearchInput />

            <Link to={`/${store?.username}/cart`} className="cursor-pointer">
              <CartIcon />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StoreHeader;

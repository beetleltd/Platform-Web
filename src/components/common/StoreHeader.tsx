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
        theme === "business" ? "bg-business-light" : "bg-reseller-light"
      } py-5 md:py-10`}
    >
      <Container>
        <div className="flex items-center gap-x-5">
          <Link to={`/r/${store?.username}`} className="cursor-pointer">
            <StoreProfileMenu />
          </Link>

          <SearchInput />

          <Link to={"/r/cart"} className="cursor-pointer">
            <CartIcon />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default StoreHeader;

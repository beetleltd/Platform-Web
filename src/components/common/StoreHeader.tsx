import Container from "../layout/Container";

import { useStoreData } from "@/store/storeData";
import { Link } from "react-router-dom";
import CartIcon from "../icons/CartIcon";
import SearchInput from "./SearchInput";
import StoreProfileMenu from "./StoreProfileMenu";

const StoreHeader = () => {
  const { store } = useStoreData();
  return (
    <div className={`${"bg-gray-100"} py-5 md:py-10 `}>
      <Container>
        <div className="flex items-center gap-x-5 justify-between px-3 md:px-0 ">
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

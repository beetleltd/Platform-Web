import { useTheme } from "../../contexts/ThemeContext";
import StoreDiscountBanner from "../common/StoreDiscountBanner";
import StoreFooter from "../common/StoreFooter";
import StoreHeader from "../common/StoreHeader";
import Container from "./Container";

type TStorefrontLayout = {
  children: React.ReactNode;
};

const StorefrontLayout = ({ children }: TStorefrontLayout) => {
  const { theme } = useTheme();
  return (
    <div>
      <StoreDiscountBanner theme={theme} />
      <StoreHeader theme={theme} />
      <Container>{children}</Container>
      <StoreFooter />
    </div>
  );
};

export default StorefrontLayout;

import { useMediaQuery } from "react-responsive";

export const useResponsive = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  return {
    isMobile,
    isTablet,
  };
};

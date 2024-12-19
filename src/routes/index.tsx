import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import FullPageLoader from "@/components/loaders/FullPageLoader";

// const Business = lazy(() => import("../pages/business/Business"));
// const BusinessCart = lazy(() => import("../pages/business/BusinessCart"));
const Reseller = lazy(() => import("../pages/reseller/Reseller"));
const ResellerCart = lazy(() => import("../pages/reseller/ResellerCart"));
const ResellerCheckout = lazy(
  () => import("../pages/reseller/ResellerChekout")
);
const NotFound = lazy(() => import("../pages/NotFound"));

const router = createBrowserRouter([
  // {
  //   path: "/b/:id",
  //   element: <Business />,
  // },
  // {
  //   path: "/b/:id/cart",
  //   element: <BusinessCart />,
  // },
  {
    path: "/r/:storeName",
    element: <Reseller />,
  },
  {
    path: "/r/cart",
    element: <ResellerCart />,
  },
  {
    path: "/r/checkout",
    element: <ResellerCheckout />,
  },
  { path: "*", element: <NotFound /> },
]);

const ThemeSetter = () => {
  const { toggleTheme } = useTheme();

  useEffect(() => {
    if (window.location.pathname.startsWith("/b")) {
      toggleTheme("business");
    } else if (window.location.pathname.startsWith("/r")) {
      toggleTheme("reseller");
    }
  }, [toggleTheme]);

  return null;
};

export default function StoreFrontRouter() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <ThemeSetter />
      <RouterProvider router={router} />
    </Suspense>
  );
}

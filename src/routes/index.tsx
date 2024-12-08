import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Business = lazy(() => import("../pages/business/Business"));
const BusinessCart = lazy(() => import("../pages/business/BusinessCart"));
const Reseller = lazy(() => import("../pages/reseller/Reseller"));
const ResellerCart = lazy(() => import("../pages/reseller/ResellerCart"));
const NotFound = lazy(() => import("../pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/b/:id",
    element: <Business />,
  },
  {
    path: "/b/:id/cart",
    element: <BusinessCart />,
  },
  {
    path: "/r/:id",
    element: <Reseller />,
  },
  {
    path: "/r/:id/cart",
    element: <ResellerCart />,
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
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeSetter />
      <RouterProvider router={router} />
    </Suspense>
  );
}

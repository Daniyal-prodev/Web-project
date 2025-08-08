import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./views/RootLayout";
import HomePage from "./views/HomePage";
import CatalogPage from "./views/CatalogPage";
import ProductPage from "./views/ProductPage";
import CartPage from "./views/CartPage";
import CheckoutPage from "./views/CheckoutPage";
import OrderSuccessPage from "./views/OrderSuccessPage";
import AdminLoginPage from "./views/admin/AdminLoginPage";
import AdminDashboard from "./views/admin/AdminDashboard";
import AdminProducts from "./views/admin/AdminProducts";
import AdminEditProduct from "./views/admin/AdminEditProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "catalog", element: <CatalogPage /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "success/:orderId", element: <OrderSuccessPage /> },
    ],
  },
  {
    path: "/secret-admin",
    element: <AdminDashboard />,
    children: [
      { index: true, element: <AdminProducts /> },
      { path: "login", element: <AdminLoginPage /> },
      { path: "products/:id", element: <AdminEditProduct /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

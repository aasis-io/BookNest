import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../components/About";
import Blog from "../components/Blog";
import SingleBook from "../shop/SingleBook";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadBook from "../dashboard/UploadBook";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import RegisterForm from "../components/RegisterForm"; // Import RegisterForm
import LoginForm from "../components/LoginForm"; // Import LoginForm
import NotFoundPage from "../components/NotFoundPage";
import { singleBookLoader } from "../loaders/SingleBookLoader";
import Profile from "../components/Profile";
import Cart from "../components/CartPage";
import { CartProvider } from "../contexts/CartContext"; // Ensure CartProvider is imported
import AdminLoginPage from "../components/admin/AdminLoginPage";
import AdminRegister from "../components/admin/AdminRegister";
import Search from "../components/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CartProvider>
        {" "}
        {/* Wrap App in CartProvider */}
        <App />
      </CartProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/book/:id",
        element: <SingleBook />,
        loader: singleBookLoader,
      },
      {
        path: "/auth/register", // Add registration route
        element: <RegisterForm />,
      },
      {
        path: "/auth/login", // Add login route
        element: <LoginForm />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/cart",
        element: <Cart />, // No need to wrap Cart in CartProvider again
      },
      {
        path: "/login/admin",
        element: <AdminLoginPage />, // No need to wrap Cart in CartProvider again
      },
      {
        path: "/register/admin",
        element: <AdminRegister />, // No need to wrap Cart in CartProvider again
      },
      {
        path: "/search",
        element: <Search />, // No need to wrap Cart in CartProvider again
      },

      // {
      //   path: "/admin/logout",
      //   element: <AdminRegister />, // No need to wrap Cart in CartProvider again
      // },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/dashboard/upload",
        element: <UploadBook />,
      },
      {
        path: "/admin/dashboard/manage",
        element: <ManageBooks />,
      },
      {
        path: "/admin/dashboard/edit-books/:id",
        element: <EditBooks />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/book/${params.id}`),
      },
    ],
  },
]);

export default router;

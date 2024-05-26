import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import About from "../Pages/About/About";
import CheckOut from "../Pages/CheckOut/CheckOut";
import Contacts from "../Pages/Contact/Contacts";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/Login/LogIn";
import Register from "../Pages/Register/Register";
import Whitelist from "../Pages/Whitelist/Whitelist";
import Product from "../Pages/Product/Product";
import Products from "../Pages/Products/Products";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import SellerDashboard from "../Pages/Dashboard/Seller/SellerDashboard";
import BuyerDashboard from "../Pages/Dashboard/BuyerDashboard/BuyerDashboard";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Cart from "../Pages/Cart/Cart";
import Orders from "../Pages/Dashboard/Orders/Orders";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/login", element: <LogIn></LogIn> },

      { path: "/sign-up", element: <Register></Register> },
      { path: "/contact", element: <Contacts></Contacts> },
      { path: "/about", element: <About></About> },
      { path: "/products", element: <Products></Products> },
      { path: "/cart", element: <Cart></Cart> },
      { path: "/checkout", element: <CheckOut></CheckOut> },
      { path: "/product", element: <Product></Product> },
      {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard></Dashboard>,
          },
          {
            path: "/dashboard/adminDashboard",
            element: <AdminDashboard></AdminDashboard>,
          },
          {
            path: "/dashboard/sellerDashboard",
            element: <SellerDashboard></SellerDashboard>,
          },
          {
            path: "/dashboard/buyerDashboard",
            element: <BuyerDashboard></BuyerDashboard>,
          },
          { path: "/dashboard/my-wishlist", element: <Whitelist></Whitelist> },
          { path: "/dashboard/my-orders", element: <Orders></Orders> },
        ],
      },
      { path: "*", element: <ErrorPage></ErrorPage> },
    ],
  },
]);

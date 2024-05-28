import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout";
import Main from "../Layouts/Main";
import About from "../Pages/About/About";
import Cart from "../Pages/Cart/Cart";
import CheckOut from "../Pages/CheckOut/CheckOut";
import Contacts from "../Pages/Contact/Contacts";
import AdminDashboard from "../Pages/Dashboard/Admin/AdminDashboard";
import AllSeller from "../Pages/Dashboard/Admin/AllSeller/AllSeller";
import AllUser from "../Pages/Dashboard/Admin/AllUser/AllUser";
import ReportedItems from "../Pages/Dashboard/Admin/ReportedItems/ReportedItems";
import BuyerDashboard from "../Pages/Dashboard/Buyer/BuyerDashboard";
import MyOrders from "../Pages/Dashboard/Buyer/MyOrders/MyOrders";
import MyWishlist from "../Pages/Dashboard/Buyer/MyWhitelist/MyWishlist";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct/AddProduct";
import MyBuyers from "../Pages/Dashboard/Seller/MyBuyers/MyBuyers";
import MyProducts from "../Pages/Dashboard/Seller/MyProducts/MyProducts";
import SellerDashboard from "../Pages/Dashboard/Seller/SellerDashboard";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/Login/LogIn";
import Product from "../Pages/Product/Product";
import Products from "../Pages/Products/Products";
import Register from "../Pages/Register/Register";

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
          { path: "/dashboard/all-users", element: <AllUser></AllUser> },
          { path: "/dashboard/all-seller", element: <AllSeller></AllSeller> },
          {
            path: "/dashboard/reported-items",
            element: <ReportedItems></ReportedItems>,
          },
          {
            path: "/dashboard/sellerDashboard",
            element: <SellerDashboard></SellerDashboard>,
          },
          {
            path: "/dashboard/add-product",
            element: <AddProduct></AddProduct>,
          },
          { path: "/dashboard/my-buyers", element: <MyBuyers></MyBuyers> },
          { path: "/dashboard/my-products", element: <MyProducts></MyProducts> },
          {
            path: "/dashboard/buyerDashboard",
            element: <BuyerDashboard></BuyerDashboard>,
          },
          {
            path: "/dashboard/my-wishlist",
            element: <MyWishlist></MyWishlist>,
          },
          { path: "/dashboard/my-orders", element: <MyOrders></MyOrders> },
        ],
      },
      { path: "*", element: <ErrorPage></ErrorPage> },
    ],
  },
]);

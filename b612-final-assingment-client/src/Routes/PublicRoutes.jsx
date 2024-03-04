import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import About from "../Pages/About/About";
import CheckOut from "../Pages/CheckOut/CheckOut";
import Contacts from "../Pages/Contact/Contacts";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/Login/LogIn";
import Orders from "../Pages/Orders/Orders";
import Register from "../Pages/Register/Register";
import Whitelist from "../Pages/Whitelist/Whitelist";
import MyAccount from "../Pages/MyAccount/MyAccount";
import Manage from "../Pages/MyAccount/Manage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/login", element: <LogIn></LogIn> },
      { path: "/orders", element: <Orders></Orders> },
      { path: "/whitelist", element: <Whitelist></Whitelist> },
      { path: "/sign-up", element: <Register></Register> },
      { path: "/contact", element: <Contacts></Contacts> },
      { path: "/about", element: <About></About> },
      { path: "/checkout", element: <CheckOut></CheckOut> },
      {
        path: "/my-account",
        element: <MyAccount></MyAccount>,
        children: [{ path: "/my-account", element: <Manage></Manage> }],
      },
      { path: "*", element: <ErrorPage></ErrorPage> },
    ],
  },
]);

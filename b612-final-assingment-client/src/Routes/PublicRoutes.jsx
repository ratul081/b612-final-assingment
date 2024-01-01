import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import LogIn from "../Pages/Login/LogIn";
import Orders from "../Pages/Orders/Orders";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Contacts from "../Pages/Contact/Contacts";
import About from "../Pages/About/About";
import Whitelist from "../Pages/Whitelist/Whitelist";

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
      { path: "*", element: <ErrorPage></ErrorPage> },
    ],
  },
]);

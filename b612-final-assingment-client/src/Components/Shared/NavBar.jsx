import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();
  console.log("🚀 ~ file: NavBar.jsx:9 ~ NavBar ~ user:", user);
  const handleLogOut = () => {
    logOut();
  };
  const menu = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </>
  );
  const profileMenu = (
    <>
      <li>
        <Link to="/my-account">Manage My Account</Link>
      </li>
      <li>
        <Link to="/orders">My Order</Link>
      </li>
      <li>
        <Link to="/cancellations">My Cancellations</Link>
      </li>
      <li>
        <Link to="/reviews">My Reviews</Link>
      </li>
      <li>
        <button onClick={handleLogOut}>Logout</button>
      </li>
    </>
  );

  return (
    <div className="mb-4">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {menu}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu text-xl font-semibold menu-horizontal px-1">
            {menu}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="relative mt-4 md:mt-0">
            <input
              type="text"
              className="w-full py-2 pl-2 pr-12 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
              placeholder="What are you looking for?"
            />
            <button className="absolute inset-y-0 right-4 flex items-center pl-3">
              <svg
                className="w-6 h-6 text-gray-400"
                viewBox="0 0 24 24"
                fill="none">
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="flex mx-4">
            <Link to="/whitelist">
              <AiOutlineHeart className=" w-6 h-6" />
            </Link>
            <Link to="/orders">
              <BsCart3 className="w-6 h-6 ml-4" />
            </Link>
          </div>
          {user && user?.uid ? (
            <>
              <div className="dropdown  dropdown-end">
                <div tabIndex={0} role="button" className="avatar w-12 h-12">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  {profileMenu}
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn mx-2">
                Log in
              </Link>
              <Link to="/sign-up" className="btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;

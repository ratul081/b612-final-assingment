import React from "react";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useSeller from "../hooks/useSeller";

const DashboardLayout = () => {
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();
  return (
    <div className="">
      {/* <Header></Header> */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content m-12">
          {/* Page content here */}
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full  space-y-4 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link className="text-xl font-semibold" to="/dashboard">
                Dashboard
              </Link>
            </li>
            {isAdmin && (
              <>
                <li>
                  <Link
                    className="text-xl font-semibold"
                    to="/dashboard/all-users">
                    All users
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-xl font-semibold"
                    to="/dashboard/add-doctors">
                    Add doctors
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-xl font-semibold"
                    to="/dashboard/manage-Doctors">
                    Manage Doctors
                  </Link>
                </li>
                <li>
                  <Link className="text-xl font-semibold" to="/">
                    Home
                  </Link>
                </li>
              </>
            )}
            {isSeller && (
              <>
                <li>
                  <Link
                    className="text-xl font-semibold"
                    to="/dashboard/all-users">
                    My products
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-xl font-semibold"
                    to="/dashboard/add-product">
                    Add Product
                  </Link>
                </li>
              </>
            )}
            {!isAdmin && !isSeller && (
              <>
                <li>
                  <Link
                    className="text-xl font-semibold"
                    to="/dashboard/my-wishlist">
                    My wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-xl font-semibold"
                    to="/dashboard/my-orders">
                    My Orders
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default DashboardLayout;

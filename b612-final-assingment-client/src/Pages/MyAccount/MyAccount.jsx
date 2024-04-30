import React from "react";
import Sidebar from "./Sidebar";
import Manage from "./Manage";
import { Outlet } from "react-router-dom";

const MyAccount = () => {
  return (
    <>
      <div className="drawer lg:drawer-open py-14">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button hidden">
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full text-base-content">
            {/* Sidebar content here */}
            <Sidebar></Sidebar>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MyAccount;

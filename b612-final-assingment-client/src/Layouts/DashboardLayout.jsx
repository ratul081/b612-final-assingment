import React from "react";
import { Outlet } from "react-router-dom";

import DashboardSidebar from "../Pages/Dashboard/Dashboard/DashboardSidebar";

const DashboardLayout = () => {
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
            <DashboardSidebar></DashboardSidebar>
          </ul>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default DashboardLayout;

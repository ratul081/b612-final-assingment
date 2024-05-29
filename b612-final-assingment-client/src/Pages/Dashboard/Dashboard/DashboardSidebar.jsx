import React from "react";
import { Link } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useSeller from "../../../hooks/useSeller";
const DashboardSidebar = () => {
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();
  return (
    <>
      <li>
        <Link className="text-xl font-semibold" to="/dashboard">
          Dashboard
        </Link>
      </li>
      {!isAdmin && (
        <>
          <li>
            <Link className="text-xl font-semibold" to="/dashboard/all-users">
              All users
            </Link>
          </li>
          <li>
            <Link className="text-xl font-semibold" to="/dashboard/all-seller">
              All seller
            </Link>
          </li>
          <li>
            <Link
              className="text-xl font-semibold"
              to="/dashboard/reported-items">
              Reported Items
            </Link>
          </li>
        </>
      )}
      {!isSeller && (
        <>
          <li>
            <Link className="text-xl font-semibold" to="/dashboard/my-products">
              My products
            </Link>
          </li>
          <li>
            <Link className="text-xl font-semibold" to="/dashboard/add-product">
              Add Product
            </Link>
          </li>
          <li>
            <Link className="text-xl font-semibold" to="/dashboard/my-buyers">
              My buyers
            </Link>
          </li>
        </>
      )}
      {(!isAdmin && !isSeller) && (
        <>
          <li>
            <Link className="text-xl font-semibold" to="/dashboard/my-wishlist">
              My wishlist
            </Link>
          </li>
          <li>
            <Link className="text-xl font-semibold" to="/dashboard/my-orders">
              My Orders
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default DashboardSidebar;

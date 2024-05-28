import React, { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import useSeller from "../../../hooks/useSeller";
import MyAccount from "./MyAccount/MyAccount";

const Dashboard = () => {
  // useDynamicTitle("Dashboard");
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();
  return (
    <section>
      {isAdmin && <AdminDashBoard />}
      {isSeller && <SellerDashBoard />}
      {!isAdmin && !isSeller && (
        <div className="flex flex-col lg:w-[50vw] items-center">
          <p className="text-2xl mb-12 tracking-wide">
            Welcome to your dashboard{" "}
            <span className="font-bold italic text-red-600 text-xl">
              {user?.displayName}
            </span>
          </p>
          <MyAccount></MyAccount>
        </div>
      )}
    </section>
  );
};

export default Dashboard;

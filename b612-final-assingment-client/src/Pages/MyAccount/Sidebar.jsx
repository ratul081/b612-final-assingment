import React from "react";

const Sidebar = () => {
  return (
    <div>
      <div>
        <p className="font-semibold text-lg mb-4">Manage your account</p>
        <div className="px-6 text-base space-y-2">
          <p>My Profile</p>
          <p>Address Book</p>
          <p>My Payment Options</p>
        </div>
      </div>
      <div>
        <p className="font-semibold text-lg mt-6 mb-4">My Orders</p>
        <div className="px-6 text-base space-y-2">
          <p>My Returns</p>
          <p>My Cancellations</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React from "react";

const Sidebar = () => {
  return (
    <nav className=" fixed w-[250px] h-[100vh] bg-gray-100">
      <h3 className="text-3xl font-bold mb-4 p-4">LMS</h3>
      <div className="px-4 py-4 bg-blue-400 text-white rounded-lg">
        Dashboard
      </div>
      <div className="px-4 py-4 text-lg rounded-lg">Transactions</div>
      <div className="px-4 py-4 text-lg rounded-lg">Members</div>
    </nav>
  );
};

export default Sidebar;

import React from "react";
import { NavLink } from "react-router";

const Sidebar = () => {

  const activeStyle = ({ isActive }) => {
    return isActive ? {
      background: "blue",
      color: "white",
    } : {}
  };

  return <nav className=" fixed w-[250px] h-[100vh] bg-gray-100 p-3">
      <h3 className="text-3xl font-bold mb-4 p-4">LMS</h3>
      <div className="flex flex-col gap-2">
      <NavLink style={activeStyle}
        className="px-4 py-4  rounded-lg hover:bg-blue-400 hover:text-white" to="/">
          Dasboard
        </NavLink>
      <NavLink style={ activeStyle}
        className="px-4 py-4 text-lg rounded-lg hover:bg-blue-400 hover:text-white" to="/transactions">
          Transaction
      </NavLink>
      
      <NavLink
        style={activeStyle}
        className="px-4 py-4 text-lg rounded-lg hover:bg-blue-400 hover:text-white" to="/members">
          Members
        </NavLink>
      </div>
    </nav>;
};

export default Sidebar;

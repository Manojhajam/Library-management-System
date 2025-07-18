import React, { useContext } from "react";
import { NavLink } from "react-router";
import { FiLogOut } from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { user, setUser } = useAuth();

  const activeStyle = ({ isActive }) => {
    return isActive
      ? {
          background: "#49516F",
          color: "white"
        }
      : {};
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  }

  return <nav className=" fixed w-[250px] h-[100vh] bg-gray-100 p-3 flex flex-col justify-between">
      <div>
        <h3 className="text-3xl font-bold mb-4 p-4">LMS</h3>
        <div className="flex flex-col gap-2">
          <NavLink style={activeStyle} className="px-4 py-4  rounded-lg hover:bg-[#8EA4D2] hover:text-white" to="/">
            Dashboard
          </NavLink>
          <NavLink style={activeStyle} className="px-4 py-4 text-lg rounded-lg hover:bg-[#8EA4D2] hover:text-white" to="/transactions">
            Transaction
          </NavLink>

          <NavLink style={activeStyle} className="px-4 py-4 text-lg rounded-lg hover:bg-[#8EA4D2] hover:text-white" to="/members">
            Members
          </NavLink>
        </div>
      </div>

    <button onClick={handleLogout} className="mb-4 border border-red-400 p-2 rounded-lg font-semibold flex justify-center items-center gap-2 cursor-pointer hover:bg-red-200">
        <FiLogOut /> Logout
      </button>
    </nav>;
};

export default Sidebar;

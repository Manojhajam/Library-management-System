import React from "react";
import { Routes, Route } from "react-router";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../components/Sidebar";
import Layout from "./Layout";
import Transaction from "../pages/Transaction";
import Members from "../pages/Members";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<ProtectedRoutes />}>
          <Route index element={<Dashboard />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/members" element={<Members />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default PageRoutes;

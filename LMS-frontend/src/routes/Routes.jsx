import React from "react";
import { Routes, Route } from "react-router";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../components/Sidebar";
import Layout from "./Layout";
import Transaction from "../pages/Transaction";
import Members from "../pages/Members";

const PageRoutes = () => {
    return <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/transactions" element={<Transaction/> } />
            <Route path="/members" element={<Members/> } />
        </Route>
      </Routes>;
};

export default PageRoutes;

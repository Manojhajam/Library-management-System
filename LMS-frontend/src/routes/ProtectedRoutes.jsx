import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import Loader from "../components/common/Loader";
import useAuth from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const { user, loading } = useAuth();
  console.log(loading);

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoutes;

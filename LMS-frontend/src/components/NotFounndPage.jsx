import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="h-screen bg-yellow-50 flex flex-col gap-8 items-center justify-center  text-yellow-600">
      <FiAlertTriangle size={50} />
      <h3 className="text-3xl">Oh shoot! This page doesnot exist</h3>

      <Link to={"/"} className="underline text-emerald-500">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;

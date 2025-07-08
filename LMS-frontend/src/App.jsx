import React from "react";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <>
      <Sidebar />
      <div className="ml-[250px]">
        <Dashboard />
      </div>
    </>
  );
};

export default App;

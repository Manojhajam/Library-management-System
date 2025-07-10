import React from "react";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import {BrowserRouter} from 'react-router'
import PageRoutes from "./routes/Routes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <PageRoutes/>
      </BrowserRouter>
      
    </>
  );
};

export default App;

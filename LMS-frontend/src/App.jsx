import React from "react";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import {BrowserRouter} from 'react-router'
import PageRoutes from "./routes/Routes";
import AuthProvider from "./context/AuthContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <PageRoutes/>
        </BrowserRouter>
      </AuthProvider> 
    </>
  );
};

export default App;

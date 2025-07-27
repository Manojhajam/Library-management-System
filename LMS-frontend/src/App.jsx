import React from "react";
import {BrowserRouter} from 'react-router'
import PageRoutes from "./routes/Routes";
import AuthProvider from "./context/AuthContext";
import MemberProvider from "./context/MemberContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <MemberProvider>
          <BrowserRouter>
            <PageRoutes/>
          </BrowserRouter>
        </MemberProvider>
        
      </AuthProvider> 
    </>
  );
};

export default App;

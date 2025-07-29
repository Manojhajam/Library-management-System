import React, { Children, createContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../components/common/Loader";

export const MemberContext = createContext();

const MemberProvider = ({ children }) => {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/members", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const responseData = await response.json();
      console.log("Members", responseData);

      if (responseData.success) {
        setMembers(responseData.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(
    () => {
      if (user?.role == 'Member') {
        setMembers([])
      }
       else if(user) {
        fetchMembers();
      } else {
        setLoading(false);
      }
    },
    [user]
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <MemberContext.Provider
      value={{ members, setMembers }}>
      {children}
    </MemberContext.Provider>
  );
};

export default MemberProvider;

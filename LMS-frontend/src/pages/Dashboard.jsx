import React, {useEffect} from "react";
import BookCard from "../components/BookCard";

const Dashboard = () => {
  const fetchBooks = async () => {
    const response = await fetch({
      url: "http://localhost:5000/api/books",
      method: "GET"
    });
      const data = await response.json();
      
      console.log(data);
    };
    
    useEffect(() => {
        fetchBooks();
    }, []);

  return (
    <div style={{ padding: "0px 10px" }}>
      <h1 style={{ marginBottom: 60, marginTop: 60 }}>Welcome, User</h1>
      <BookCard />
    </div>
  );
};

export default Dashboard;

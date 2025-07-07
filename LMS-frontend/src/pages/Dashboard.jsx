import React, {useEffect, useState} from "react";
import BookCard from "../components/BookCard";

const Dashboard = () => {

  const [ books, setBooks] = useState([]);

  const fetchBooks = async () => {

 try {
  
  const response = await fetch("http://localhost:5000/api/books",{
    method: "GET",
  });

    const responseData = await response.json();
    
  console.log(responseData);
  
  setBooks(responseData.data)
 } catch (error) {
  console.log(error)
 }
    };
    
    useEffect(() => {
        fetchBooks();
    }, []);

  return <div style={{ padding: "0px 10px" }}>
    <h1 style={{ marginBottom: 60, marginTop: 60 }}>Welcome, User</h1>
    <h2 style={{ marginBottom: 20, marginTop: 60 }}>Books ({books.length})</h2>

      <div style={{display: "flex", gap: 10, flexWrap: "wrap"}}>
        {books.map(book => {
          return <BookCard key={book._id} book={book} />;
        })}
      </div>
    </div>;
};

export default Dashboard;

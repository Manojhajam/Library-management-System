import React, {useEffect, useState} from "react";
import BookCard from "../components/BookCard";
import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {

  const [ books, setBooks] = useState([]);

  const fetchBooks = async () => {

 try {
  
  const response = await fetch("http://localhost:5000/api/books",{
    method: "GET",
  });

    const responseData = await response.json();
    
  // console.log(responseData);
  
  setBooks(responseData.data)
 } catch (error) {
  console.log(error)
 }
    };  
    
    useEffect(() => {
        fetchBooks();
    }, []);

  return <div className="px-4">
      <h1 className="pt-20 pb-4 text-3xl py-20 font-bold ">Welcome, User</h1>
      <div className="flex justify-between mb-4">
        <DashboardCard title="Books" count={30} />
        <DashboardCard title="Members" count={40} />
        <DashboardCard title="Issued Books" count={20} />
        <DashboardCard title="Return Due" count={3} />
      </div>

      <h2 className="mb-10 text-2xl font-semibold">
        Books ({books.length})
      </h2>

      <div className="flex gap-6 flex-wrap">
        {books.map(book => {
          return <BookCard key={book._id} book={book} />;
        })}
      </div>
    </div>;
};

export default Dashboard;

import React, {useEffect, useState} from "react";
import BookCard from "../components/BookCard";
import DashboardCard from "../components/DashboardCard";
import { FiBook } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { FiClock } from "react-icons/fi";

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

  return <div className="px-4 pb-4">
      <h1 className="py-8 text-3xl font-bold ">
        Dashboard
      </h1>
      <div className="flex justify-between mb-4">
        <DashboardCard title="Books" count={30} Icon={<FiBook size={38} color="blue" />} />
        <DashboardCard title="Members" count={40} Icon={<FiUsers size={38} color="green" />} />
        <DashboardCard title="Issued Books" count={20} Icon={<FiTrendingUp size={38} color="orange" />} />
        <DashboardCard title="Return Due" count={25} Icon={<FiClock size={38} color="red" />} />
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

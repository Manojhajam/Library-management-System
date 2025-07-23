import React, {useEffect, useState} from "react";
import BookCard from "../components/BookCard";
import DashboardCard from "../components/DashboardCard";
import { FiBook } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import Modal from "../components/common/Modal";

const Dashboard = () => {

  const [ books, setBooks] = useState([]);
  const [dashboard, setDashboardData] = useState([]);
  const [showBookModal, setShowBookModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)

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
  const getDashboardData = async () => {

 try {
  
  const response = await fetch("http://localhost:5000/api/dashboard",{
    method: "GET",
  });

  const responseData = await response.json();
    
  console.log(responseData);
  
  setDashboardData(responseData.data)
 } catch (error) {
  console.log(error)
 }
    };  
    
    useEffect(() => {
      fetchBooks();
      getDashboardData();
    }, []);

  return <div className="px-4 pb-4">
      <h1 className="py-8 text-3xl font-bold ">
        Dashboard
      </h1>
      <div className="flex justify-between mb-8">
        <DashboardCard title="Books" count={dashboard?.bookCount} Icon={<FiBook size={38} color="blue" />} />
        <DashboardCard title="Members" count={dashboard?.membersCount} Icon={<FiUsers size={38} color="green" />} />
        <DashboardCard title="Issued Books" count={dashboard?.issuedBooksCount} Icon={<FiTrendingUp size={38} color="orange" />} />
        <DashboardCard title="Return Due" count={dashboard?.returnDueCount} Icon={<FiClock size={38} color="red" />} />
      </div>

      <h2 className="mb-4 text-2xl font-semibold">
        Books ({books.length})
      </h2>

      <div className="flex gap-6 flex-wrap">
        {books.map(book => {
          return <BookCard key={book._id} book={book} handleBookClick={() => {
            setShowBookModal(true);
            setSelectedBook(book)
          } } />;
        })}
    </div>
     <Modal
        open={showBookModal}
        onClose={() => {
          setShowBookModal(false);
          setSelectedBook(null);
        }}
        title="Issue Book"
      >
        <div className="p-2 bg-green-100 border border-green-300 rounded-lg">
          <h5 className="font-semibold">{selectedBook?.title}</h5>
        </div>
        <div className="mt-8 space-y-4">
          <h5 className="font-semibold">Fill the issuance details</h5>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Issue To</label>
            <select
              // value={"user-2"}
              className="w-1/2 p-2 rounded-lg border"
            >
              <option value={"user-1"}>User 1</option>
              <option value={"user-2"}>User 2</option>
              <option value={"user-3"}>User 3</option>
            </select>
          </div>
          <div className="flex justify-end mt-8">
            <button className="bg-green-500 p-2 px-4 rounded-lg text-white hover:bg-green-400 cursor-pointer">
              Issue Book
            </button>
          </div>
        </div>
      </Modal>
    </div>;
};

export default Dashboard;

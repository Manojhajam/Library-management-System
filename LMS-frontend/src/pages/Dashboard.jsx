import React, {useContext, useEffect, useState} from "react";
import BookCard from "../components/BookCard";
import DashboardCard from "../components/DashboardCard";
import { FiBook } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import Modal from "../components/common/Modal";
import { MemberContext } from "../context/MemberContext";
import Loader from "../components/common/Loader";
import AddEditBookModal from "../components/AddEditBookModal";
import useAuth from "../hooks/useAuth";
import { makeApiRequest } from "../lib/api";
import {toast} from "react-toastify"

const Dashboard = () => {
  const { user } = useAuth();
  const {members} = useContext(MemberContext)
  const [ books, setBooks] = useState([]);
  const [dashboard, setDashboardData] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [booksLoading, setBooksLoading] = useState(true);
  const [showBookModal, setShowBookModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [issuanceData, setIssuanceData] = useState({
    issuedTo: "",
    estimatedReturnDate: "",
  })
  const [showEditBookModal, setShowEditBookModal] = useState(false);
  const [toBeEditedBook, setToBeEditedBook] = useState(null)

  const [showAddBookModal, setshowAddBookModal] = useState(false);
  const [newBookInfo, setNewBookInfo] = useState(null);


    const fetchBooks = async () => {
    setBooksLoading(true);

    const { response, error } = await makeApiRequest({
      endpoint: "/books",
    });
    if (error) {
      setLoading(false);
      console.log(error);
      return;
    }

    setBooks(response.data);
    response.success && setBooksLoading(false);
  };



  const getDashboardData = async () => {
    setLoading(true);
    const { response, error } = await makeApiRequest({
      endpoint: "/dashboard",
    })

    if (error) {
      setLoading(false);
      console.log(error);
      return;
    }

    if (response.success) {
      setDashboardData(response.data);
    }
    setLoading(false);
};  
    
    useEffect(() => {
      fetchBooks();
      getDashboardData();
    }, []);
  
  useEffect(() => {
    if(books.length>0)
    toast('Dashboard loaded successfully!!!')
  },[books])

  const handleIssueBook = async () => {
   
  const { response, error } = await makeApiRequest({
      endpoint: "/transactions",
      method: "POST",
      body: {
        bookId: selectedBook?._id,
        issuedTo: issuanceData.issuedTo,
      },
    });
    if (error) {
      console.log(error);
      return;
    }

    if (response.success) {
      const updatedBooks = books.map((book) => {
        if (selectedBook?._id === book._id) {
          return { ...book, availability: false };
        }

        return book;
      });

      setBooks(updatedBooks);
      setSelectedBook(null);
      setShowBookModal(false);
    }
  };
  
  const handleEditBookClick = (book) => {
    setToBeEditedBook(book)
    setShowEditBookModal(true)
  }

  const handleEditBookSubmit = async (bookInfo) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/books/${bookInfo?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookInfo),
        }
      );
       const responseData = await response.json();

      console.log("response", responseData);

      if (responseData.success) {
        setShowEditBookModal(false);
        setToBeEditedBook(null);
        const updatedBooks = books.map((book) => {
          if (book?._id === responseData?.data?._id) {
            return responseData?.data;
          }

          return book;
        });

        setBooks(updatedBooks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddBookSubmit = async (bookInfo) => {
    const { response, error } = await makeApiRequest({
      endpoint: "/books",
      method: "POST",
      body: bookInfo||{},
    })
     if (error) {
      console.log(error);
      return;
    }

    console.log(response);

    if (response.success) {
      const newBook = response.data;

      setBooks([newBook, ...books]);

      setshowAddBookModal(false);
      setNewBookInfo(null);
    }
    
  }

  return <div className="px-4 pb-4">
      <h1 className="py-8 text-3xl font-bold ">
        Welcome {user?.name?.split(" ")[0]}
    </h1>
    
    {user?.role !== "Member" && (
      <>
       <div className="flex justify-between mb-8">
        <DashboardCard title="Books" count={dashboard?.bookCount} Icon={<FiBook size={38} color="blue" />} />
        <DashboardCard title="Members" count={dashboard?.membersCount} Icon={<FiUsers size={38} color="green" />} />
        <DashboardCard title="Issued Books" count={dashboard?.issuedBooksCount} Icon={<FiTrendingUp size={38} color="orange" />} />
        <DashboardCard title="Return Due" count={dashboard?.returnDueCount} Icon={<FiClock size={38} color="red" />} />
      </div> 
      </>
    )}
      
    
    <div className="flex justify-between items-center mb-4">
      <h2 className="mb-4 text-2xl font-semibold">
        Books ({books.length})
      </h2>
      <button
        onClick={() => 
          setshowAddBookModal(true)
        }
        className="bg-green-500 hover:bg-green-500/90 p-2 rounded-lg cursor-pointer text-white"
      >Add Book</button>
      </div>

      

    {booksLoading ? (
      <div className="py-6">
        <Loader fullscreen={false} />
      </div>
    ) : (
      <div className="flex gap-6 flex-wrap">
        {books.map(book => {
          return (

            <MemberContext>
              <BookCard key={book._id} book={book} handleBookClick={() => {
                setShowBookModal(true);
                setSelectedBook(book)
              }}
                handleEditBookClick={handleEditBookClick} />
            </MemberContext>
          )
        })}
      </div>
)}
     
        
      
     <Modal
        open={showBookModal}
        onClose={() => {
          setShowBookModal(false);
          setSelectedBook(null);
          setIssuanceData({})
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
            value={issuanceData.issuedTo}
            onChange={(e) => {
              setIssuanceData({
                ...issuanceData,
                issuedTo: e.target.value,
              })
            }}
              className="w-1/2 p-2 rounded-lg border"
          >
            <option value="">Select Member</option>
            {members?.map((member) => {
              return <option key={member?._id} value={member?._id}> { member?.name}</option>
            })}
              
            
            </select>
          </div>
          <div className="flex justify-end mt-8">
             <button
              onClick={handleIssueBook}
              disabled={!issuanceData.issuedTo}
              className={`${
                issuanceData.issuedTo
                  ? "bg-green-500 text-white hover:bg-green-400"
                  : "bg-gray-200 text-gray-400"
              } p-2 px-4 rounded-lg cursor-pointer`}
            >
              Issue Book
            </button>
          </div>
        </div>
    </Modal>

    <AddEditBookModal
      toBeEditedBook={toBeEditedBook}
      open={showEditBookModal}
      onClose={() => {
          setShowEditBookModal(false);
          setToBeEditedBook(null);
      }}
    onSubmit={handleEditBookSubmit}
    />
    <AddEditBookModal
        toBeEditedBook={newBookInfo}
        open={showAddBookModal}
        onClose={() => {
          setNewBookInfo(null);
          setshowAddBookModal(false);
        }}
        onSubmit={handleAddBookSubmit}
        modalTitle={"Add Book"}
      />
  </div>;
};

export default Dashboard;

//last ma add book garyaum
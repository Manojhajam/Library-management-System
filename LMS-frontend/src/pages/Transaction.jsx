import React, { useEffect, useState } from "react";
import Table from "../components/common/Table";
import Card from "../components/common/Card";

const getTransactionColumn = [
  {
    label: "Book",
    key: "book",
    renderDetail: (row) => {
      return row?.book?.title;
    }
  },
    {
    label: "Issued To",
    key: "issuedTo",
    renderDetail: (row) => {
      return row?.issuedTo?.name;
    },
  },
  {
    label: "Issued By",
    key: "issuedBy",
    renderDetail: (row) => {
      return row?.issuedBy?.name;
    },
  },
  {
    label: "Returned To",
    key: "returnedTo",
    renderDetail: (row) => {
      return row?.issuedBy?.name;
    },
  },
  {
    label: "Returned",
    key: "returned",
   renderDetail: (row) => {
      const returnBook = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `http://localhost:5003/api/transactions/${row._id}/return`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          const responseData = await response.json();

          if (responseData.success) {
            console.log(responseData);
          }
        } catch (error) {
          console.log(error);
        }
      };

      return Boolean(row.returned) ? (
        "Yes"
      ) : (
        <button
          className="px-3 py-2 bg-green-300 hover:bg-green-300/90 rounded-lg cursor-pointer"
          onClick={returnBook}
        >
          Return
        </button>
      );
    },
  },
  {
    label: "Issue Date",
    key: "issueDate",
    renderDetail: (row) => {
      const date = row.issueDate;
      return new Date(date).toDateString();
    },
  },
  {
    label: "Return Date",
    key: "returnDate",
    renderDetail: (row) => {
      const date = row.issueDate;
      return new Date(date).toDateString();
    },
  },

  
];

const Transactions = () => {

  const [transactions, setTransactions] = useState([])
  const fetchTransactions = async () => {
    try {

      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/api/transaction", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const responseData = await response.json();
      console.log(responseData);


      if (responseData.success) {
        setTransactions(responseData.data)
       }

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  },[]);

  return (
    <div className="px-2">
      <h1 className="text-5xl mb-8">Transactions</h1>

      <Card customClass="bg-white border border-gray-300">
        <h4 className="text-2xl mb-4 font-bold">Transaction History</h4>
        <Table data={transactions} columns={getTransactionColumn}/>
      </Card >
    </div>
  );
};

export default Transactions;

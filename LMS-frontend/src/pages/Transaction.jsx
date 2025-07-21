import React, { useEffect, useState } from "react";
import Table from "../components/common/Table";
import Card from "../components/common/Card";

const columns = [
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
    label: "Returned",
    key: "returned",
    renderDetail: (row) => {
      return row.returned ? "Yes" : "No";
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
        <Table data={transactions} columns={columns}/>
      </Card >
    </div>
  );
};

export default Transactions;

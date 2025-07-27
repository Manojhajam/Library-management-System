
import React, { useEffect, useState } from "react";
import Table from "../components/common/Table";
import Card from "../components/common/Card";

const getTransactionsColumn = ({ returnBook }) => {
  return [
    {
      label: "Book",
      key: "book",
      renderDetail: (row) => {
        return row?.book?.title;
      },
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
        return row?.returnedTo?.name || "-";
      },
    },
    {
      label: "Returned",
      key: "returned",

      renderDetail: (row) => {
        return Boolean(row.returned) ? (
          "Yes"
        ) : (
          <button
            className="px-3 py-2 bg-green-300 hover:bg-green-300/90 rounded-lg cursor-pointer"
            onClick={() => returnBook(row?._id)}
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
        const date = row.issueDdate;
        return date ? new Date(date).toDateString() : "-";
      },
    },
  ];
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/transaction", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      console.log(responseData);

      if (responseData.success) {
        setTransactions(responseData.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const returnBook = async (transactionId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/transaction/${transactionId}/return`,
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

        const updatedTransactions = transactions.map((transaction) => {
          if (transaction?._id === responseData?.data?._id) {
            return responseData.data;
          }

          return transaction;
        });

        setTransactions(updatedTransactions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = getTransactionsColumn({ returnBook });

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <div className="p-4 px-8  mb-8 shadow">
        <h4 className="text-3xl font-semibold">Transactions</h4>
      </div>
      <div className="px-8">
        <Card customClass="bg-white border border-gray-300">
          <h5 className="text-2xl mb-4 font-bold">Transaction History</h5>
          <Table columns={columns} data={transactions} />
        </Card>
      </div>
    </>
  );
};

export default Transactions;
import React, { useEffect, useState } from 'react'
import Table from '../components/common/Table';
import Card from '../components/common/Card';


const columns = [
  {
    label: "Member",
    key: "name",
    renderDetail: (row) => {
      return row?.name;
    }
  },
    {
    label: "Contact",
    key: "email",
       renderDetail: (row) => (
      <div>
        <p>{row?.email}</p>
        <p>{row?.phoneNumber}</p>
      </div>
    ),
  },
  {
    label: "Address",
    key: "address",
    renderDetail: (row) => {
      return row?.address;
    }
  },
];

const Members = () => {
const [members, setMembers] = useState([])

  const fetchMembers = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/members', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    });

    const responseData = await response.json();
    console.log("Members", responseData)

if (responseData.success) {
  setMembers(responseData.data);
}


  } catch (error) {
    console.log(error)
  }
  }
  
  useEffect(() => {
    fetchMembers();
  })

  return <div className="px-2">
      <h1 className="text-5xl mb-8">Members</h1>
      <Card customClass="bg-white border border-gray-300">
        <h4 className="text-2xl mb-4 font-bold">Library Members</h4>
        <Table data={members} columns={columns} />
      </Card>
    </div>;
}

export default Members

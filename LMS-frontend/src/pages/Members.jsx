import React, { useContext, useState } from 'react'
import Table from '../components/common/Table';
import Card from '../components/common/Card';
import { MemberContext } from '../context/MemberContext';


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
    label: "Role",
    key: "role",
    renderDetail: (row) => {
      return row?.role;
    }
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
// const [members, setMembers] = useState([])
const { members } = useContext(MemberContext)
  
  
  

  return <div className="px-2">
      <h1 className="text-5xl mb-8">Members</h1>
      <Card customClass="bg-white border border-gray-300">
        <h4 className="text-2xl mb-4 font-bold">Library Members</h4>
        <Table data={members} columns={columns} />
      </Card>
    </div>;
}

export default Members

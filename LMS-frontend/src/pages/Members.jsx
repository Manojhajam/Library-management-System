import React, { useContext, useState } from 'react'
import Table from '../components/common/Table';
import Card from '../components/common/Card';
import { MemberContext } from '../context/MemberContext';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import { useMemo } from 'react';


const getMemberColumns = ({updateRole, user}) => {
  return [
  {
    label: "Member",
    key: "name",
    // renderDetail: (row) => {
    //   return row?.name;
    // }
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
      return (
         <>
            {user.role === "Admin" ? (
              <div className="px-4">
                {row?.role === "Member" ? (
                  <button
                    onClick={() => updateRole(row?._id)}
                    className="w-full p-2 px-4 rounded-lg cursor-pointer bg-green-500 text-white hover:bg-green-400"
                  >
                    Make Staff
                  </button>
                ) : row.role === "Admin" ? (
                  row.role
                ) : (
                     <button
                    onClick={() => updateRole(row?._id)}
                    className="w-full p-2 px-4 rounded-lg cursor-pointer bg-red-500 text-white hover:bg-red-400"
                  >
                    Make Member
                    </button>
                )}
              </div>
            ) : (
              row.role
            )}
          </>
        )
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
}

const Members = () => {

  const { members,setMembers } = useContext(MemberContext)
  const { user } = useAuth()
  
  const handleUpdateMemberRole = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response =await fetch(`http://localhost:5000/api/members/${userId}/change-role`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const responseData = await response.json();

      if (responseData.success) {
        console.log(responseData);

        const updatedMembers = members.map((member) => {
          if (member?._id === userId) {
            return responseData?.data;
          }
          return member
        });
        setMembers(updatedMembers);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const columns = useMemo(
    () => 
      getMemberColumns({
      updateRole: handleUpdateMemberRole,
        user
      })
    
    [user]
  )
  // useEffect(() => {
  //   const columns = 
  //   
  //   setColumns(columns)
  // },[user])
  

  return <div className="px-2">
      <h1 className="text-5xl mb-8">Members</h1>
      <Card customClass="bg-white border border-gray-300">
        <h4 className="text-2xl mb-4 font-bold">Library Members</h4>
        <Table data={members} columns={columns} />
      </Card>
    </div>;
}

export default Members

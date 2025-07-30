import React, { useState } from "react";
import Card from "../components/common/Card";
import useAuth from "../hooks/useAuth";
import { FiCheck, FiEdit, FiX } from "react-icons/fi";
import Input from "../components/common/Input";
import { makeApiRequest } from "../lib/api";

const Profile = () => {
  const { user, setUser } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState(null);

  const handleUpdateUser = async () => {
    const { response, error } = await makeApiRequest({
      endpoint: `/auth/${editedUserInfo?._id}`,
      method: "PUT",
      body: editedUserInfo,
    });

    if (error) {
      console.log(error);
      return;
    }

    if (response.success) {
      setUser(response.data);
      setEditMode(false);
      setEditedUserInfo(null);
    }
  };

  return (
    <div>
      <div className="p-4 px-8  mb-8 shadow">
        <h4 className="text-3xl font-semibold">Profile</h4>
      </div>
      <div className="px-4 grid grid-cols-2 gap-8">
        <Card customClass="space-y-4 bg-white shadow">
          <div className="flex justify-between items-center border-b pb-1">
            <h6 className="text-lg font-semibold">User Details</h6>
            <button
              onClick={() => {
                setEditMode(!editMode);
                setEditedUserInfo(user);
              }}
              className="hover:bg-green-100 rounded-lg p-2 text-green-600 cursor-pointer"
            >
              <FiEdit size={20} />
            </button>
          </div>

          <div className="space-y-1">
            <p className="font-bold">Name</p>
            <p>{user?.name || "-"}</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Phone Number</p>
            <p>{user?.phoneNumber || "-"}</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Email</p>
            <p>{user?.email || "-"}</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Address</p>
            <p>{user?.address || "-"}</p>
          </div>
        </Card>
        {editMode && (
          <Card customClass="space-y-4 bg-white shadow border-none">
            <div className="flex justify-between items-center border-b pb-1">
              <h6 className="text-lg font-semibold">Edit Your Details</h6>
              <div className="flex gap-8">
                <button
                  onClick={handleUpdateUser}
                  className="hover:bg-green-100 rounded-lg p-2 text-green-600 cursor-pointer"
                >
                  <FiCheck size={20} />
                </button>
                <button
                  onClick={() => {
                    setEditMode(!editMode);
                    setEditedUserInfo(null);
                  }}
                  className="hover:bg-red-100 rounded-lg p-2 text-red-600 cursor-pointer"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            <Input
              label={"Name"}
              value={editedUserInfo.name}
              onChange={(value) => {
                setEditedUserInfo({
                  ...editedUserInfo,
                  name: value,
                });
              }}
            />
            <Input
              label={"Phone Number"}
              value={editedUserInfo.phoneNumber}
              onChange={(value) => {
                setEditedUserInfo({
                  ...editedUserInfo,
                  phoneNumber: value,
                });
              }}
            />
            <Input
              label={"Email"}
              value={editedUserInfo.email}
              onChange={(value) => {
                setEditedUserInfo({
                  ...editedUserInfo,
                  email: value,
                });
              }}
            />
            <Input
              label={"Address"}
              value={editedUserInfo.address}
              onChange={(value) => {
                setEditedUserInfo({
                  ...editedUserInfo,
                  address: value,
                });
              }}
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;
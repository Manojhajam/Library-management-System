import React, { useState } from "react";
import Card from "../components/common/Card";
import useAuth from "../hooks/useAuth";
import { FiEdit } from "react-icons/fi";

const Profile = () => {
  const { user } = useAuth();

  const [editMode, setEditMode] = useState(false);

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
        </Card>
        {editMode && (
          <Card customClass="space-y-4">
            <h6 className="text-lg font-semibold">Edit Your Details</h6>

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
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;
import React, { useState } from "react";
import Card from "./common/Card";
import { FiEdit2, FiTrash } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import Modal from "./common/Modal";
import { makeApiRequest } from "../lib/api";


const BookCard = ({ book, handleBookClick, handleEditBookClick }) => {
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [toBeDeletedBook, setToBeDeletedBook] = useState(null)
  const { user } = useAuth();
  const { title, author, publications, genre, availability, isbn } = book;

  const handleDeleteBook = async () => {
    const { response, error } = await makeApiRequest({
      endpoint: `/books/${toBeDeletedBook?._id}`,
      method: "DELETE",
    })
    if (error) {
      console.log(error)
      return;
    }
    setToBeDeletedBook(null);
    setshowDeleteModal(false)
  }

  return (
    <>
    <Card
      onclick={handleBookClick}
      customClass="
  basis-1/3"
    >
      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-2xl font-bold mb-4 ">{title}</h4>

          <div>
            {availability ? (
              <p className="text-white text-capitalize px-2 w-fit text-sm font-semibold bg-black rounded-2xl">
                Available
              </p>
            ) : (
              <p className="text-white text-capitalize px-2 w-fit text-sm font-semibold bg-red-600 rounded-2xl">
                Borrowed
              </p>
            )}
          </div>
        </div>
        <p className="mb-2 text-lg">{author}</p>
        <p className="text-xs">ISBN: {isbn}</p>
        <div className="mt-5 flex justify-between items-center">
          <p className="border border-gray-500 w-fit px-2  rounded-2xl text-sm font-semibold">
            {genre}
          </p>
          <p>{new Date(publications).getFullYear()}</p>

          {user?.role !== "Member" && (
            <div className="flex">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditBookClick(book);
                }}
                className="hover:bg-green-100 p-1 rounded-lg text-green-500"
              >
                <FiEdit2 size={14} />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                    setshowDeleteModal(true)
                    setToBeDeletedBook(book)
                }}
                className="hover:bg-green-100 p-1 rounded-lg text-green-500"
              >
                <FiTrash size={14} />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
      <Modal open={showDeleteModal}
        onClose={() => {
        setshowDeleteModal(false)
        }}
        title="Delete Book">
        <h4>Are you sure you want to delete?</h4>
        <p>This will delete {toBeDeletedBook?.title}This action is irreversible!</p>
        <button
          onclick={handleDeleteBook}
          className="bg-red-300 p-2">
          yes
        </button>
      </Modal>
    </>
  );
};

export default BookCard;

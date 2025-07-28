import React, { useState, useEffect } from "react";
import Modal from "./common/Modal";

const EditBookModal = ({ open, toBeEditedBook, onClose, onSubmit }) => {
  const [bookInfo, setBookInfo] = useState(toBeEditedBook);

  useEffect(() => {
    setBookInfo(toBeEditedBook);
  }, [toBeEditedBook]);

  return (
    <Modal open={open} onClose={onClose} title="Edit Book">
      <div className="p-2 bg-green-100 border border-green-300 rounded-lg">
        <h5 className="font-semibold">{toBeEditedBook?.title}</h5>
      </div>

      <form className="mt-4 space-y-4">
        <h5 className="font-semibold">Enter Information of Book</h5>
        <div className="flex flex-col gap-2">
          <label htmlFor="bookTitle">Book Title</label>
          <input
            value={bookInfo?.title}
            id="bookTitle"
            placeholder="Enter your book Title."
            className="border w-full p-2 rounded-lg"
            onChange={(event) => {
              setBookInfo({
                ...bookInfo,
                title: event.target.value,
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bookAuthor">Book Author</label>
          <input
            value={bookInfo?.author}
            id="bookAuthor"
            placeholder="Enter author name of book."
            className="border w-full p-2 rounded-lg"
            onChange={(event) => {
              setBookInfo({
                ...bookInfo,
                author: event.target.value,
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bookGenre">Book Genre</label>
          <input
            value={bookInfo?.genre}
            id="bookGenre"
            placeholder="Enter genre of book."
            className="border w-full p-2 rounded-lg"
            onChange={(event) => {
              setBookInfo({
                ...bookInfo,
                genre: event.target.value,
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bookISBN">Book ISBN</label>
          <input
            value={bookInfo?.isbn}
            id="bookISBN"
            placeholder="Enter ISBN of book."
            className="border w-full p-2 rounded-lg"
            onChange={(event) => {
              setBookInfo({
                ...bookInfo,
                isbn: event.target.value,
              });
            }}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={(e) => {
              e.preventDefault();
              onSubmit(bookInfo);
            }}
            className="px-3 py-2 bg-green-300 hover:bg-green-300/90 rounded-lg cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditBookModal;
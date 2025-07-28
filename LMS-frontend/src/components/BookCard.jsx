import React, { useState } from "react";
import Card from "./common/Card";
import { FiEdit2 } from "react-icons/fi";

const BookCard = ({ book, handleBookClick, handleEditBookClick }) => {
  const { title, author, publications, genre, availability, isbn } = book;

  return <Card onclick={handleBookClick} customClass="
  w-[400px]">
      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-2xl font-bold mb-4 ">
            {title}
          </h4>

          <div>
            {availability ? <p className="text-white text-capitalize px-2 w-fit text-sm font-semibold bg-black rounded-2xl">
                  Available
                </p> : <p className="text-white text-capitalize px-2 w-fit text-sm font-semibold bg-red-600 rounded-2xl">
                  Borrowed
                </p>}
          </div>
        </div>
        <p className="mb-2 text-lg">
          {author}
        </p>
        <p className="text-xs">
          ISBN: {isbn}
        </p>
        <div className="mt-5 flex justify-between items-center">
          <p className="border border-gray-500 w-fit px-2  rounded-2xl text-sm font-semibold">
            {genre}
          </p>
          <p>
            {new Date(publications).getFullYear()}
          </p>

          <div onClick={e => {
              e.stopPropagation();
              handleEditBookClick(book);
            }} className="hover:bg-green-100 p-1 rounded-lg text-green-500">
            <FiEdit2 size={14} />
          </div>
        </div>
      </div>
    </Card>;
};

export default BookCard;

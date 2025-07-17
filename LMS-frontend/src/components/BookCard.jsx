import React, { useState } from "react";
import Card from "./common/Card";

const BookCard = ({ book }) => {
  const { title, author, publications, genre, availability, isbn} = book;

  return <Card customClass="
  w-[396px]
   flex justify-between">
      <div>
        <h4 className="text-2xl font-bold mb-4 ">
          {title}
        </h4>
        <p className="mb-2 text-lg">
          {author}
        </p>
        <p className="text-xs">
          ISBN: {isbn}
        </p>
        <p className="border border-gray-500 w-fit px-2 mt-4 rounded-2xl text-sm font-semibold">
          {genre}
        </p>
      </div>
      <div className="flex flex-col justify-between items-end">
        {availability ? <p className="text-white text-capitalize px-2 w-fit text-sm font-semibold bg-black rounded-2xl">
              Available
            </p> : <p className="text-white text-capitalize px-2 w-fit text-sm font-semibold bg-red-600 rounded-2xl">
              Borrowed
            </p>}
        <div>
          <p className="">
          {new Date(publications).getFullYear()}
        </p>
        </div>
      </div>
    </Card>;
};

export default BookCard;

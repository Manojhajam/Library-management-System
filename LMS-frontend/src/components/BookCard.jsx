import React, { useState } from "react";
import Card from "./common/Card";

const BookCard = ({ book }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { title, author, publications } = book;

  return (
    <Card customClass="w-[350px]">
      <h4 className="text-2xl font-bold mb-4 ">
        {title}
      </h4>
      <p className="mb-2 text-lg">
        {author}
      </p>
      <p className="text-xs">
        {publications}
      </p>
    </Card>
  );
};

export default BookCard;

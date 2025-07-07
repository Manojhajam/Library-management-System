import React, { useState } from "react";
import Card from './common/Card'

const BookCard = ({ book }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { title, author, publications } = book;

  const baseStyle = {
    padding: "20px 18px",
    width: 250,
    backgroundColor: "rgb(233, 199, 99)",
    borderRadius: 10,
    boxShadow: isHovered
      ? "5px 10px 16px rgba(0,0,0,0.3)"
      : "0 0 8px rgba(0,0,0,0.1)",
    transition: "box-shadow 0.3s ease"
  }; // fixed invalid RGB

  return <Card>
     
        <h4 style={{ fontSize: 24, marginBottom: 10 }}>
          {title}
        </h4>
        <p style={{ fontSize: 16 }}>
          {author}
        </p>
        <p style={{ fontSize: 16 }}>
          {publications}
        </p>
    </Card>;
};

export default BookCard;

import React, { useState } from "react";
// import Card from './common/Card'

const Card = ({children}) => {
  const [isHovered, setIsHovered] = useState(false);
 

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

  return (


    <div
      style={baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    {children}
    </div>
  );
};

export default Card;


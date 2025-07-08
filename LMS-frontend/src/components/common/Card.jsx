import React, { useState } from "react";
// import Card from './common/Card'

const Card = ({children, customClass}) => {
  return (


    <div className={"px-10 py-10 bg-gray-200 rounded-lg"+ " " + customClass}
     
      >
    {children}
    </div>
  );
};

export default Card;


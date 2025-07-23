import React, { useState } from "react";
// import Card from './common/Card'

const Card = ({children, customClass, onclick}) => {
  return <div onClick={onclick} className={`px-8 py-5 shadow-lg border border-gray-400  rounded-lg + ${customClass} ${onclick? "cursor-pointer": ""}`}>
      {children}
    </div>;
};

export default Card;


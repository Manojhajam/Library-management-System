import React, { useState } from "react";
// import Card from './common/Card'

const Card = ({children, customClass}) => {
  return <div className={"px-8 py-5 shadow-lg border border-gray-400  rounded-lg" + " " + customClass}>
      {children}
    </div>;
};

export default Card;


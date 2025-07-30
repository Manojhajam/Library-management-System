import React from "react";

const Input = ({ id, value, onChange, label, type = "text" }) => {
  const internalId = id || String(Date.now() + Math.random());
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={internalId}>
        {label}
      </label>
      <input
        value={value}
        type={type}
        id={internalId}
        placeholder={`Enter your ${label.toLowerCase()}.`}
        className="border w-full p-2 rounded-lg"
        onChange={event => {
          onChange(event.target.value);
        }}
      />
    </div>
  );
};

export default Input;

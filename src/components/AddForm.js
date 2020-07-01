import React, { useState } from "react";

const AddForm = ({ addItem }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (inputValue !== "") {
      addItem(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <input
        className="input"
        placeholder="Enter your task"
        onChange={e => setInputValue(e.target.value)}
        value={inputValue}
      />
      <button className="button" type="submit">
        Add Item
      </button>
    </form>
  );
};
export default AddForm;

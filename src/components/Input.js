import React, { useState } from "react";

const Input = ({ refs, value }) => {
  const [inputValue, setInputValue] = useState(value);

  return (
    <input
      className="input"
      ref={refs}
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
    />
  );
};
export default Input;

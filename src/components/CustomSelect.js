import React, { useEffect, useState } from "react";
import Select from "react-select";

const CustomSelect = ({ handleSelectChange }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const newOption = [];
    for (let i = 0; i < 10; i++) {
      newOption.push({ value: i + 1, label: i + 1 });
    }
    setOptions(newOption);
  }, []);

  return (
    <Select
      placeholder="Select Passengers"
      onChange={handleSelectChange}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: () => null
      }}
      options={options}
    />
  );
};

export default CustomSelect;

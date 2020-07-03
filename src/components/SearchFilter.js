import React from "react";
import Select from "react-select";

const cityNames = [
  { value: "Mumbai (BOM)", label: "Mumbai (BOM)" },
  { value: "Delhi (DEL)", label: "Delhi (DEL)" },
  { value: "Bengaluru (BLR)", label: "Bengaluru (BLR)" },
  { value: "Pune (PNQ)", label: "Pune (PNQ)" }
];

const SearchFilter = ({ flightType, handleSelectChange }) => {
  return (
    <Select
      placeholder={`Enter ${
        flightType === "oneWay" ? "Origin" : "Destination"
      } City`}
      isClearable={true}
      onChange={selectedOption =>
        handleSelectChange(selectedOption, flightType)
      }
      components={{
        IndicatorSeparator: () => null,
        // eslint-disable-next-line react/display-name
        DropdownIndicator: () => null
      }}
      options={cityNames}
    />
  );
};

export default SearchFilter;

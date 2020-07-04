import React, { useEffect } from "react";
import Select from "react-select";

const SearchFilter = ({
  cityData,
  flightType,
  handleSelectChange,
  excludedCity
}) => {
  return (
    <Select
      className="customSelect"
      placeholder={`Enter ${
        flightType === "oneWay" ? "Origin" : "Destination"
      } City`}
      isClearable={true}
      onChange={selectedOption =>
        handleSelectChange(selectedOption, flightType)
      }
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: () => null
      }}
      options={cityData.filter(city => city.value !== excludedCity)}
    />
  );
};

export default SearchFilter;

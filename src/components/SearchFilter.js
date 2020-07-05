import React, { useEffect } from "react";
import Select from "react-select";

const SearchFilter = ({
  cityData,
  excludedCity,
  selectedCity,
  flightType,
  handleSelectChange
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
      value={cityData.filter(({ value }) => value === selectedCity)}
      options={cityData.filter(city => city.value !== excludedCity)}
    />
  );
};

export default SearchFilter;

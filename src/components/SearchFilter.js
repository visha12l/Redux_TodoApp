import React, { useEffect } from "react";
import Select from "react-select";
import { CITY_NAMES } from "../constants/default";

const SearchFilter = ({
  cityData,
  flightType,
  handleSelectChange,
  excludedCity
}) => {
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
        DropdownIndicator: () => null
      }}
      options={cityData.filter(city => city.value !== excludedCity)}
    />
  );
};

export default SearchFilter;

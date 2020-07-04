import React, { useEffect, useState } from "react";
import Select from "react-select";

const CustomSelect = ({
  passengerData,
  numOfPassenger,
  handleSelectChange
}) => {
  return (
    <Select
      className="customSelect"
      placeholder="Select Passengers"
      onChange={handleSelectChange}
      isSearchable={false}
      components={{
        IndicatorSeparator: () => null
      }}
      value={passengerData.filter(({ value }) => value === numOfPassenger)}
      options={passengerData}
    />
  );
};

export default CustomSelect;

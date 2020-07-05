import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const DatePickerInput = ({
  flightType,
  startDate,
  handleDateChange,
  minDate
}) => {
  const datepicker = useRef();
  return (
    <div className="datePickerWrapper">
      <DatePicker
        selected={startDate}
        onChange={date => handleDateChange(date, flightType)}
        ref={datepicker}
        minDate={minDate ? minDate : new Date()}
        strictParsing
        placeholderText={`${
          flightType === "oneWay" ? "Departure" : "Return"
        } Date`}
        dateFormat="yyyy/MM/dd"
        className="datePicker form-control"
        showDisabledMonthNavigation
      />
      <FontAwesomeIcon
        onClick={() => datepicker.current.setOpen(true)}
        icon={faCalendar}
      />
    </div>
  );
};
export default DatePickerInput;

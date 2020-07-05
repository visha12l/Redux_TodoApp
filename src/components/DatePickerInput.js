import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import calendarIcon from "../Images/calendar.png";

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
      <img
        src={calendarIcon}
        alt="calendarIcon"
        onClick={() => datepicker.current.setOpen(true)}
      />
    </div>
  );
};
export default DatePickerInput;

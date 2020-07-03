import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const DatePickerInput = ({ flightType, startDate, handleDateChange }) => {
  const datepicker = useRef();

  const parsedDate = startDate => {
    if (startDate) {
      const dateString = startDate.split("/");
      const year = dateString[0];
      const month = dateString[1];
      const day = dateString[2];
      const date = new Date(year, month - 1, day);
      return date;
    }
    return null;
  };

  return (
    <div className="datePickerWrapper">
      <DatePicker
        utcOffset={0}
        selected={parsedDate(startDate)}
        onChange={date => handleDateChange(date, flightType)}
        ref={datepicker}
        minDate={new Date()}
        placeholderText={`${
          flightType === "oneWay" ? "Departure" : "Return"
        } Date`}
        dateFormat="yyyy/MM/dd"
        className="datePicker form-control"
        showDisabledMonthNavigation
        popperPlacement="auto"
      />
      <img
        src="/images/icons/calendar.png"
        className="calender btn"
        alt="calendar"
        onClick={() => datepicker.current.setOpen(true)}
      />
    </div>
  );
};
export default DatePickerInput;

import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { convertDate } from "../utils/utils";

const DatePickerInput = ({ flightType, startDate, handleDateChange }) => {
  const datepicker = useRef();

  return (
    <div className="datePickerWrapper">
      <DatePicker
        utcOffset={0}
        selected={convertDate(startDate)}
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

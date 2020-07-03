import React, { useState, useEffect } from "react";
import "../stylesheet/flight.css";
import { Data, defaultUserChoice } from "../constants/default";
import MainFlightData from "./MainFlightData";
import { getFlightData } from "../utils/utils";
import Tab from "./Tab";
import SearchFilter from "./SearchFilter";
import CustomSelect from "./CustomSelect";
import DatePickerInput from "./DatePickerInput";
// create left form with validation
// TODO Calculate time difference
// dont consider multiple airlines if time is less than 30 minutes
// Flight Header Count and date info
// Add price FIlter
// price should be multiplied by number of passengers defaults to 1
// test for all possible routes
// make app responsive

// need one state to preserve initial data
const FlightApp = () => {
  const [apiData, setApiData] = useState(Data);
  const [flightData, setFlightData] = useState(Data);
  const [returnFlightData, setReturnFlightData] = useState([]);
  const [userInput, setUserInput] = useState(defaultUserChoice);
  const [showFlightList, setFlightList] = useState(false);

  const {
    originCity,
    destinationCity,
    journeyDate,
    returnDate,
    numOfPassenger,
    isOneWayFlight
  } = userInput;

  const toggleSubFlight = (flightKey, data, isReturnFlight) => {
    const newFlighData = data.map((item, key) => {
      if (flightKey === key) {
        item.showSubFlights = !item.showSubFlights;
      }
      return item;
    });
    isReturnFlight
      ? setReturnFlightData(newFlighData)
      : setFlightData(newFlighData);
  };

  const searchFlights = () => {
    setFlightData(
      getFlightData(apiData, originCity, destinationCity, journeyDate)
    );
    if (!isOneWayFlight) {
      setReturnFlightData(
        getFlightData(apiData, destinationCity, originCity, returnDate)
      );
    }
    setFlightList(true);
  };

  const handleChangeTab = isOneWayFlight => {
    setUserInput({ ...userInput, isOneWayFlight: isOneWayFlight });
  };

  const handleCityChange = (selectedOption, flightType) => {
    const keyName = flightType === "oneWay" ? "originCity" : "destinationCity";
    setUserInput({ ...userInput, [keyName]: selectedOption.value });
  };

  const handleDateChange = (date, flightType) => {
    let formattedDate = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/0${date.getDate()}`;
    const keyName = flightType === "oneWay" ? "journeyDate" : "returnDate";
    setUserInput({ ...userInput, [keyName]: formattedDate });
  };

  const handlePassengerChange = selectedOption => {
    setUserInput({ ...userInput, numOfPassenger: selectedOption.value });
  };

  return (
    <div className="itemList">
      <Tab isOneWayFlight={isOneWayFlight} changeTab={handleChangeTab} />
      <SearchFilter handleSelectChange={handleCityChange} flightType="oneWay" />
      <SearchFilter handleSelectChange={handleCityChange} />
      <DatePickerInput
        flightType="oneWay"
        startDate={journeyDate}
        handleDateChange={handleDateChange}
      />
      {!isOneWayFlight && (
        <DatePickerInput
          startDate={returnDate}
          handleDateChange={handleDateChange}
        />
      )}
      <CustomSelect handleSelectChange={handlePassengerChange} />
      <button onClick={searchFlights}>Search</button>
      {showFlightList && (
        <div>
          <MainFlightData
            numOfPassenger={numOfPassenger}
            flightData={flightData}
            toggleSubFlight={toggleSubFlight}
          />
          <p>Return Flight Data</p>
          <MainFlightData
            numOfPassenger={numOfPassenger}
            isReturnFlight={!isOneWayFlight}
            flightData={returnFlightData}
            toggleSubFlight={toggleSubFlight}
          />
        </div>
      )}
    </div>
  );
};
export default FlightApp;

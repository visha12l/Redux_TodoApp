import React, { useState, useEffect } from "react";
import "../stylesheet/flight.css";
import { Data, DEFAULT_USER_STATE } from "../constants/default";
import MainFlightData from "./MainFlightData";
import { getFlightData, parseDate } from "../utils/utils";
import Tab from "./Tab";
import SearchFilter from "./SearchFilter";
import CustomSelect from "./CustomSelect";
import DatePickerInput from "./DatePickerInput";
import { fetchFlightData } from "../services/flightService";
// create left form with validation
// TODO Calculate time difference
// dont consider multiple airlines if time is less than 30 minutes
// Flight Header date Conversion info
// Add price FIlter
// make app responsive
//
// need one state to preserve initial data write useEffect to fetch data from API

const FlightApp = () => {
  const [apiData, setApiData] = useState([]);
  const [flightData, setFlightData] = useState([]);
  const [returnFlightData, setReturnFlightData] = useState([]);
  const [userInput, setUserInput] = useState(DEFAULT_USER_STATE);
  const [showFlightList, setFlightList] = useState(false);
  const [cityData, setCityData] = useState([]);

  const {
    originCity,
    destinationCity,
    journeyDate,
    returnDate,
    numOfPassenger,
    isOneWayFlight,
    journeyDateObj,
    returnDateObj
  } = userInput;

  useEffect(() => {
    (async () => {
      const flightResponse = await fetchFlightData();
      if (flightResponse) {
        setApiData(flightResponse.flight);
        setCityData(flightResponse.uniqueCity);
      }
    })();
  }, []);

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
    const keyName = flightType === "oneWay" ? "journeyDate" : "returnDate";
    setUserInput({
      ...userInput,
      [keyName]: parseDate(date),
      [`${keyName}Obj`]: date
    });
  };

  const handlePassengerChange = selectedOption => {
    setUserInput({ ...userInput, numOfPassenger: selectedOption.value });
  };

  return (
    <div className="userForm">
      <h1>Flight Search App</h1>
      <Tab isOneWayFlight={isOneWayFlight} changeTab={handleChangeTab} />
      <SearchFilter
        cityData={cityData}
        excludedCity={destinationCity}
        handleSelectChange={handleCityChange}
        flightType="oneWay"
      />
      <SearchFilter
        cityData={cityData}
        excludedCity={originCity}
        handleSelectChange={handleCityChange}
      />
      <DatePickerInput
        flightType="oneWay"
        startDate={journeyDateObj}
        handleDateChange={handleDateChange}
      />
      {!isOneWayFlight && (
        <DatePickerInput
          minDate={journeyDateObj}
          startDate={returnDateObj}
          handleDateChange={handleDateChange}
        />
      )}
      <CustomSelect handleSelectChange={handlePassengerChange} />
      <button className="button blueBtn" onClick={searchFlights}>
        Search
      </button>
      {showFlightList && (
        <div>
          {!!flightData.length && (
            <MainFlightData
              numOfPassenger={numOfPassenger}
              flightData={flightData}
              toggleSubFlight={toggleSubFlight}
              origin={originCity}
              destination={destinationCity}
              journeyDate={journeyDateObj}
            />
          )}
          {!!returnFlightData.length && (
            <MainFlightData
              origin={destinationCity}
              destination={originCity}
              numOfPassenger={numOfPassenger}
              isReturnFlight={!isOneWayFlight}
              flightData={returnFlightData}
              toggleSubFlight={toggleSubFlight}
              journeyDate={returnDateObj}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default FlightApp;

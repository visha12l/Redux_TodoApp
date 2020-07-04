import React, { useState, useEffect } from "react";
import "../stylesheet/flight.css";
import {
  Data,
  DEFAULT_USER_STATE,
  DEFAULT_DUMMY_USER_STATE,
  PASSENGER_DATA
} from "../constants/default";
import MainFlightData from "./MainFlightData";
import { getFlightData, parseDate } from "../utils/utils";
import Tab from "./Tab";
import SearchFilter from "./SearchFilter";
import CustomSelect from "./CustomSelect";
import DatePickerInput from "./DatePickerInput";
import PriceFilter from "./PriceFilter";
import { fetchFlightData } from "../services/flightService";
import LoadingOverlay from "react-loading-overlay";
import GridLoader from "react-spinners/GridLoader";
// CSS PART
// use scss
// make app responsive
// check all colors and icons

// create common Folder For common components
// solve Eslint Warnings

// create left form with validation
// user Should not be able to select return date previous to current jouneny date
// search button should be enabled after all validation are passed

// add initial loader for application

// show empty response messages

// const CITY_NAMES = [
//   { value: "Mumbai (BOM)", label: "Mumbai (BOM)" },
//   { value: "Delhi (DEL)", label: "Delhi (DEL)" },
//   { value: "Bengaluru (BLR)", label: "Bengaluru (BLR)" },
//   { value: "Pune (PNQ)", label: "Pune (PNQ)" }
// ];

const FlightApp = () => {
  const [apiData, setApiData] = useState([]);
  const [flightData, setFlightData] = useState([]);
  const [returnFlightData, setReturnFlightData] = useState([]);
  const [userInput, setUserInput] = useState(DEFAULT_USER_STATE);
  const [showFlightList, setFlightList] = useState({
    oneWay: false,
    return: false
  });
  const [cityData, setCityData] = useState([]);
  const [showLoader, setLoader] = useState(false);

  const {
    originCity,
    destinationCity,
    journeyDate,
    returnDate,
    numOfPassenger,
    isOneWayFlight,
    journeyDateObj,
    returnDateObj,
    priceRange
  } = userInput;

  useEffect(() => {
    (async () => {
      setLoader(true);
      const flightResponse = await fetchFlightData();
      if (flightResponse) {
        setApiData(flightResponse.flight);
        setCityData(flightResponse.uniqueCity);
        setLoader(false);
      }
    })();
  }, []);

  const toggleSubFlight = (flightKey, data, isReturnFlight) => {
    const newFlighData = data.map((item, key) => {
      return {
        ...item,
        showSubFlights:
          flightKey === key ? !item.showFlightList : item.showFlightList
      };
    });
    isReturnFlight
      ? setReturnFlightData(newFlighData)
      : setFlightData(newFlighData);
  };

  const searchFlights = () => {
    setFlightData(getFlightData(apiData, userInput, false));
    if (!isOneWayFlight) {
      setReturnFlightData(getFlightData(apiData, userInput, true));
    }
    setFlightList({
      oneWay: true,
      return: !isOneWayFlight && returnDate !== ""
    });
  };

  const handlePriceChange = priceRange => {
    setUserInput({ ...userInput, priceRange: priceRange });
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
      <LoadingOverlay
        styles={{
          overlay: base => ({
            ...base,
            background: "rgb(7, 176, 227)"
          })
        }}
        active={showLoader}
        spinner={<GridLoader />}
      >
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
        <CustomSelect
          passengerData={PASSENGER_DATA}
          numOfPassenger={numOfPassenger}
          handleSelectChange={handlePassengerChange}
        />
        <PriceFilter
          priceRange={priceRange}
          handlePriceChange={handlePriceChange}
        />
        <button className="button blueBtn" onClick={searchFlights}>
          Search
        </button>
        {showFlightList.oneWay && (
          <MainFlightData
            flightData={flightData}
            origin={originCity}
            destination={destinationCity}
            toggleSubFlight={toggleSubFlight}
            journeyDate={journeyDateObj}
          />
        )}
        {showFlightList.return && (
          <MainFlightData
            flightData={returnFlightData}
            origin={destinationCity}
            destination={originCity}
            toggleSubFlight={toggleSubFlight}
            journeyDate={returnDateObj}
            isReturnFlight={true}
          />
        )}
      </LoadingOverlay>
    </div>
  );
};
export default FlightApp;

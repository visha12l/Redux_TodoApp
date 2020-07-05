import React, { useState, useEffect } from "react";
import "../stylesheet/common.css";
import "../stylesheet/customSelect.css";
import "../stylesheet/priceFilter.css";
import "../stylesheet/datePicker.css";
import "../stylesheet/flightList.css";

import { DEFAULT_USER_STATE, PASSENGER_DATA } from "../constants/default";
import MainFlightData from "./MainFlightData";
import { getFlightData, parseDate } from "../utils/utils";
import Header from "./Common/Header.js";
import Tab from "./Common/Tab";
import SearchFilter from "./Common/SearchFilter";
import CustomSelect from "./Common/CustomSelect";
import DatePickerInput from "./Common/DatePickerInput";
import PriceFilter from "./Common/PriceFilter";
import { fetchFlightData } from "../services/flightService";
import LoadingOverlay from "react-loading-overlay";
import GridLoader from "react-spinners/GridLoader";

// use scss
// make app responsive

// create common Folder For common components
// solve Eslint Warnings

// user Should not be able to select return date previous to current jouneny date
// search button should be enabled after all validation are passed

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
          flightKey === key ? !item.showSubFlights : item.showSubFlights
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
    setUserInput({
      ...userInput,
      [keyName]: selectedOption === null ? "" : selectedOption.value
    });
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
    setUserInput({
      ...userInput,
      numOfPassenger: selectedOption === null ? "" : selectedOption.value
    });
  };

  const isValidSearch = () => {
    let isValidReturnDate = !isOneWayFlight && returnDate === "" ? false : true;

    return (
      originCity !== "" &&
      destinationCity !== "" &&
      numOfPassenger !== "" &&
      journeyDate !== "" &&
      isValidReturnDate
    );
  };

  return (
    <div>
      <Header />
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
          <h1 className="mainHeading">Flight Search App</h1>
          <div className="mainAppWrapper">
            <div
              className={`flightFilterWrapper ${
                flightData.length > 0 && "displayFlex"
              }`}
            >
              <Tab
                isOneWayFlight={isOneWayFlight}
                changeTab={handleChangeTab}
              />
              <div className="flightFilterWrap">
                <SearchFilter
                  cityData={cityData}
                  selectedCity={originCity}
                  excludedCity={destinationCity}
                  handleSelectChange={handleCityChange}
                  flightType="oneWay"
                />
                <SearchFilter
                  cityData={cityData}
                  selectedCity={destinationCity}
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
                <button
                  disabled={!isValidSearch()}
                  className="button blueBtn"
                  onClick={searchFlights}
                >
                  Search
                </button>
              </div>
            </div>
            {showFlightList.oneWay && (
              <MainFlightData
                flightData={flightData}
                origin={originCity}
                destination={destinationCity}
                toggleSubFlight={toggleSubFlight}
                journeyDate={journeyDateObj}
              />
            )}
          </div>
          {showFlightList.return && (
            <MainFlightData
              flightData={returnFlightData}
              origin={destinationCity}
              destination={originCity}
              toggleSubFlight={toggleSubFlight}
              journeyDate={returnDateObj}
              isReturnFlight={showFlightList.return}
            />
          )}
        </LoadingOverlay>
      </div>
    </div>
  );
};
export default FlightApp;

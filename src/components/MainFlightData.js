import React from "react";
import SubFlight from "./SubFlight";

const MainFlightData = ({
  flightData,
  toggleSubFlight,
  isReturnFlight,
  numOfPassenger
}) => {
  debugger;
  return (
    <ul>
      {flightData.map((flight, key) => {
        const {
          isMultiLine,
          name,
          showSubFlights,
          flightNo,
          departureTime,
          arrivalTime,
          destination,
          origin,
          price,
          subFlightData
        } = flight;
        return (
          <li key={key}>
            <div className="imgWrapper">
              <i className="fa fa-plane planeIcon" aria-hidden="true">
                XX
              </i>
            </div>
            <div className="listInner">
              <h2>{isMultiLine ? "Multiple" : name}</h2>
              {isMultiLine ? (
                <a
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    toggleSubFlight(key, flightData, isReturnFlight);
                  }}
                >
                  {showSubFlights ? "Hide" : "Show"} Details
                </a>
              ) : (
                <a>{flightNo}</a>
              )}
            </div>
            <div className="listInner">
              <h2>{departureTime}</h2>
              <span>{origin}</span>
            </div>
            <div className="listInner">
              <h2>{arrivalTime}</h2>
              <span>{destination}</span>
            </div>
            <div className="listInner">
              <h2>02h 00m</h2>
              <span>{isMultiLine ? "Total Duration" : "Non Stop"}</span>
            </div>
            <div className="listInner">
              <h2>RS:: {price * numOfPassenger}</h2>
            </div>
            <div className="listInner">
              <button>Book</button>
            </div>
            {isMultiLine && showSubFlights && (
              <div>
                <ul>
                  {subFlightData.map((subFlight, key) => {
                    return <SubFlight key={key} subFlight={subFlight} />;
                  })}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default MainFlightData;

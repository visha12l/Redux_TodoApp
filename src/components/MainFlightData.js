import React from "react";
import SubFlight from "./SubFlight";
import { getFlightDuration, convertTime } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faSms,
  faPlaneDeparture
} from "@fortawesome/free-solid-svg-icons";

//TOOD convertDate

const MainFlightData = ({
  flightData,
  toggleSubFlight,
  isReturnFlight,
  numOfPassenger,
  origin,
  destination
}) => {
  return (
    <div>
      <div className="flightStats">
        <FontAwesomeIcon icon={faPlaneDeparture} />
        <div>
          <h3>
            {origin} to {destination}
          </h3>
          <p>
            <span>
              {flightData.length} flight{flightData.length > 1 ? "s" : ""} found
            </span>
            <span> convertDate</span>
          </p>
        </div>
      </div>
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
            subFlightData,
            layOverTime
          } = flight;
          return (
            <li key={key}>
              <div className="imgWrapper">
                <FontAwesomeIcon icon={isMultiLine ? faPlane : faSms} />
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
                <h2 className={isMultiLine && "green"}>
                  {getFlightDuration(departureTime, arrivalTime)}
                </h2>
                <span>{isMultiLine ? "Total Duration" : "Non Stop"}</span>
              </div>
              <div className="listInner">
                <h2>RS:: {price * numOfPassenger}</h2>
              </div>
              <div className="listInner">
                <button className="button">Book</button>
              </div>
              {isMultiLine && showSubFlights && (
                <div>
                  <p>LayOVer Time :: {convertTime(layOverTime)}</p>
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
    </div>
  );
};

export default MainFlightData;

import React from "react";
import SubFlight from "./SubFlight";
import {
  getFlightDuration,
  convertTime,
  formatDateString
} from "../utils/utils";

import directFlightIcon from "../Images/directFlight.png";
import mulipleFlightIcon from "../Images/mulipleFlight.png";
import planeIcon from "../Images/returnPlane.png";

const MainFlightData = ({
  flightData,
  toggleSubFlight,
  isReturnFlight,
  origin,
  destination,
  journeyDate
}) => {
  return (
    <div className="mainFlightList">
      {!!flightData.length ? (
        <div>
          <div className="flightStats">
            <div className="imgWrapper">
              <img
                className={isReturnFlight ? "returnIcon" : "planeIcon"}
                src={planeIcon}
                alt="placeIcon"
              />
            </div>
            <div>
              <h3>
                {origin} to {destination}
              </h3>
              <p className="subInfo">
                <span>
                  {flightData.length} flight{flightData.length > 1 ? "s" : ""}{" "}
                  found
                </span>
                <span> {formatDateString(journeyDate)}</span>
              </p>
            </div>
          </div>
          <ul className="mainFlightListing">
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
                    <img
                      src={isMultiLine ? mulipleFlightIcon : directFlightIcon}
                      alt="placeIcon"
                    />
                  </div>
                  <div className="listInner">
                    <h2>{isMultiLine ? "Multiple" : name}</h2>
                    {isMultiLine ? (
                      <a
                        href="#"
                        className="detailsAnchor"
                        onClick={e => {
                          e.preventDefault();
                          toggleSubFlight(key, flightData, isReturnFlight);
                        }}
                      >
                        {showSubFlights ? "Hide" : "Show"} Details
                      </a>
                    ) : (
                      <span>{flightNo}</span>
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
                    <h2 className="price">&#8377; {price}</h2>
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
      ) : (
        <p>
          No {isReturnFlight && "Return"} Flights found for route {origin} to{" "}
          {destination}.
        </p>
      )}
    </div>
  );
};

export default MainFlightData;

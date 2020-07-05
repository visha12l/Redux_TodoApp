import React from "react";
import { getFlightDuration } from "../utils/utils";
import directFlightIcon from "../Images/directFlight.png";

const SubFlight = ({ subFlight }) => {
  const {
    name,
    flightNo,
    departureTime,
    origin,
    destination,
    arrivalTime
  } = subFlight;
  return (
    <li>
      <div className="imgWrapper">
        <img src={directFlightIcon} alt="placeIcon" />
      </div>
      <div className="listInner">
        <h2>{name}</h2>
        <span>{flightNo}</span>
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
        <h2>{getFlightDuration(departureTime, arrivalTime)}</h2>
      </div>
    </li>
  );
};
export default SubFlight;

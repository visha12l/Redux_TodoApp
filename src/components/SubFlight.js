import React from "react";
import { getFlightDuration } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faSms } from "@fortawesome/free-solid-svg-icons";

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
        <FontAwesomeIcon icon={faSms} />
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

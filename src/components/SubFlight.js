import React from "react";
import { getFlightDuration, convertTime } from "../utils/utils";
import directFlightIcon from "../Images/subFlightIcon.png";

const SubFlight = ({ index, subFlight, layOverTime }) => {
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
      <div className="imgWrapper flexOne">
        <img className="planeImg" src={directFlightIcon} alt="planeIcon" />
      </div>
      <div className="flightInfo flexOne">
        <h2>{name}</h2>
        <span>{flightNo}</span>
      </div>
      <div className="flightInfo flexOne">
        <h2>{departureTime}</h2>
        <span>{origin}</span>
      </div>
      <div className="flightInfo flexOne">
        <h2>{arrivalTime}</h2>
        <span>{destination}</span>
      </div>
      <div className="flightInfo flexThree">
        <h2>{getFlightDuration(departureTime, arrivalTime)}</h2>
      </div>
      {index === 0 && (
        <p className="layOverTime">Layover time {convertTime(layOverTime)}</p>
      )}
    </li>
  );
};
export default SubFlight;

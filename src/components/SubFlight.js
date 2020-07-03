import React from "react";

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
        <i className="fa fa-plane planeIcon" aria-hidden="true">
          XX
        </i>
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
        <h2>02h 00m</h2>
      </div>
    </li>
  );
};
export default SubFlight;

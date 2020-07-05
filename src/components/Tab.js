import React from "react";

const Tab = ({ isOneWayFlight, changeTab }) => {
  return (
    <div className="tab">
      <button
        className={`button ${isOneWayFlight && "active"}`}
        onClick={() => changeTab(true)}
      >
        One Way
      </button>
      <button
        className={`button ${!isOneWayFlight && "active"}`}
        onClick={() => changeTab(false)}
      >
        Return
      </button>
    </div>
  );
};

export default Tab;

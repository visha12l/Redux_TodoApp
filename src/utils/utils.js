import { DAYS, MONTHS } from "../constants/default";

export const getTotalMinutes = timeString => {
  return (
    Number(timeString.split(":")[0] * 60) + Number(timeString.split(":")[1])
  );
};

export const getFlightData = (flightData, userIput, isReturnFlight) => {
  const {
    journeyDate,
    numOfPassenger,
    originCity,
    destinationCity,
    priceRange
  } = userIput;
  // TODO make this function generic for return flight booking
  let originCityName = isReturnFlight ? destinationCity : originCity;
  let destinationCityName = isReturnFlight ? originCity : destinationCity;
  let directFlight = [];
  let originCityFlight = [];
  let destinationCityFlight = [];

  flightData.forEach(item => {
    if (journeyDate === item.date) {
      if (
        item.origin === originCityName &&
        item.destination === destinationCityName
      ) {
        directFlight.push({ ...item, price: item.price * numOfPassenger });
      } else if (item.origin === originCityName) {
        originCityFlight.push(item);
      } else if (item.destination === destinationCityName) {
        destinationCityFlight.push(item);
      }
    }
  });

  let multiplaFlight = [];
  for (let i = 0; i < originCityFlight.length; i++) {
    for (let j = 0; j < destinationCityFlight.length; j++) {
      if (originCityFlight[i].destination === destinationCityFlight[j].origin) {
        const layOverTime =
          getTotalMinutes(destinationCityFlight[j].departureTime) -
          getTotalMinutes(originCityFlight[i].arrivalTime);

        if (layOverTime > 30) {
          multiplaFlight.push({
            arrivalTime: destinationCityFlight[j].arrivalTime,
            date: originCityFlight[i].date,
            departureTime: originCityFlight[i].departureTime,
            destination: destinationCityName,
            origin: originCityName,
            price:
              (originCityFlight[i].price + destinationCityFlight[j].price) *
              numOfPassenger,
            isMultiLine: true,
            subFlightData: [originCityFlight[i], destinationCityFlight[j]],
            layOverTime
          });
        }
      }
    }
  }
  return [...directFlight, ...multiplaFlight]
    .filter(
      item => priceRange.min <= item.price && item.price <= priceRange.max
    )
    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
};

/** utitlity function to convert date object into yyyy/mm/dd format */

export const parseDate = date => {
  let month = date.getMonth() + 1;
  month = month > 9 ? month : `0${month}`;
  let newDate = date.getDate();
  newDate = newDate > 9 ? newDate : `0${newDate}`;
  return `${date.getFullYear()}/${month}/${newDate}`;
};

export const convertTime = userMinutes => {
  const hours = userMinutes / 60;
  let rhours = Math.floor(hours);
  let rminutes = Math.round((hours - rhours) * 60);
  if (rminutes <= 9) {
    rminutes = `0${rminutes}`;
  }
  if (rhours <= 9) {
    rhours = `0${rhours}`;
  }
  return `${rhours}h ${rminutes}m`;
};

export const getFlightDuration = (departureTime, arrivalTime) => {
  const timeDifference =
    getTotalMinutes(arrivalTime) - getTotalMinutes(departureTime);
  return convertTime(timeDifference);
};

export const formatDateString = date => {
  const day = DAYS[date.getDay()];
  const month = MONTHS[date.getMonth()];
  return `${day.slice(0, 3)}, ${date.getDate()} ${month} `;
};

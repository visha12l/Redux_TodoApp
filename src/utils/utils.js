export const getTotalMinutes = timeString => {
  return (
    Number(timeString.split(":")[0] * 60) + Number(timeString.split(":")[1])
  );
};

export const getFlightData = (
  flightData,
  originCity,
  destinationCity,
  userDate
) => {
  // TODO make this function generic for return flight booking
  let directFlight = [];
  let originCityFlight = [];
  let destinationCityFlight = [];

  flightData.forEach(item => {
    if (userDate === item.date) {
      if (item.origin === originCity && item.destination === destinationCity) {
        directFlight.push(item);
      } else if (item.origin === originCity) {
        originCityFlight.push(item);
      } else if (item.destination === destinationCity) {
        destinationCityFlight.push(item);
      }
    }
  });

  let newFlights = [];
  for (let i = 0; i < originCityFlight.length; i++) {
    for (let j = 0; j < destinationCityFlight.length; j++) {
      if (originCityFlight[i].destination === destinationCityFlight[j].origin) {
        const layOverTime =
          getTotalMinutes(destinationCityFlight[j].departureTime) -
          getTotalMinutes(originCityFlight[i].arrivalTime);

        // first flight reaching time
        // second time start time
        if (layOverTime > 30) {
          newFlights.push({
            arrivalTime: destinationCityFlight[j].arrivalTime,
            date: originCityFlight[i].date,
            departureTime: originCityFlight[i].departureTime,
            destination: destinationCity,
            origin: originCity,
            price: originCityFlight[i].price + destinationCityFlight[j].price,
            isMultiLine: true,
            subFlightData: [originCityFlight[i], destinationCityFlight[j]],
            layOverTime
          });
        }
      }
    }
  }
  return [...directFlight, ...newFlights];
};

/** utitlity function to convert date object into yyyy/mm/dd format */

export const parseDate = date => {
  let month = date.getMonth() + 1;
  month = month > 9 ? month : `0${month}`;
  let newDate = date.getDate();
  newDate = newDate > 9 ? newDate : `0${newDate}`;
  return `${date.getFullYear()}/${month}/${newDate}`;
};

/** utitlity function to convert date string to date object format */

export const convertDate = startDate => {
  if (startDate) {
    const dateString = startDate.split("/");
    return new Date(dateString[0], dateString[1] - 1, dateString[2]);
  }
  return null;
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

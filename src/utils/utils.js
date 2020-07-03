const getFlightData = (flightData, originCity, destinationCity, userDate) => {
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
        newFlights.push({
          arrivalTime: destinationCityFlight[j].arrivalTime,
          date: originCityFlight[i].date,
          departureTime: originCityFlight[i].departureTime,
          destination: destinationCity,
          origin: originCity,
          price: originCityFlight[i].price + destinationCityFlight[j].price,
          isMultiLine: true,
          subFlightData: [originCityFlight[i], destinationCityFlight[j]]
        });
      }
    }
  }
  return [...directFlight, ...newFlights];
};

export { getFlightData };

import axios from "axios";

const flightAxios = axios.create({
  baseURL: "https://tw-frontenders.firebaseio.com"
});

const errorHandler = err => {
  console.log(err);
};

export const fetchFlightData = async () => {
  try {
    const flightResponse = await flightAxios.get("/advFlightSearch.json");
    if (flightResponse && flightResponse.data) {
      // filter unique city from response
      const uniqueCity = [
        ...new Set(flightResponse.data.map(item => item.origin))
      ].map(item => {
        return { value: item, label: item };
      });
      return { flight: flightResponse.data, uniqueCity };
    }
  } catch (err) {
    errorHandler(err);
    return err;
  }
};

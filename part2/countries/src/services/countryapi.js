import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries";
const KEY = import.meta.env.VITE_KEY;

const getCountries = () => {
  return axios.get(`${BASE_URL}/api/all`).then((response) => response.data);
};
const getCountry = (name) => {
  return axios
    .get(`${BASE_URL}/api/name/${name}`)
    .then((response) => response.data);
};

const getWeather = (name) => {
  return axios
    .get(
      `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${name}&aqi=yes`
    )
    .then((response) => {
      return response.data;
    });
};
export { getCountries, getCountry, getWeather };

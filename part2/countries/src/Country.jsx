import { useEffect, useState } from "react";
import { getWeather } from "./services/countryapi";

function Country({ country }) {
  const languages = Object.values(country.languages);
  const countryName = country.name.common;
  const [weather, setWeather] = useState({});
  useEffect(() => {
    getWeather(countryName).then((Response) => {
      setWeather(Response.current);
    });
  }, []);
  return (
    <div>
      <h1>{countryName}</h1>
      <p>{country.capital}</p>
      <p>{country.area}</p>
      <h2>languages</h2>
      <ul>
        {languages?.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />

      <h2>Weather in {countryName}</h2>
      <p>temperature {weather?.temp_c}</p>
      <img src={weather.condition?.icon} alt={weather.condition?.text} />
      <p>wind {(weather?.wind_mph / 0.44704).toFixed(2)}m/s</p>
    </div>
  );
}

export default Country;

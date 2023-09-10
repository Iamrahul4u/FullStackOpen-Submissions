import { useState } from "react";
import Country from "./Country";
import { getCountry } from "./services/countryapi";

function CountryList({ countries }) {
  const [showCountry, setShowCountry] = useState(false);
  const [country, setCountry] = useState(null);

  function handleShowCountry(name) {
    getCountry(name).then((response) => {
      setCountry(response);
    });
    setShowCountry((showCountry) => !showCountry);
  }
  if (showCountry) {
    return country ? <Country country={country} /> : "";
  } else {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>
            {country.name.common}
            <button onClick={() => handleShowCountry(country.name.common)}>
              Show
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default CountryList;

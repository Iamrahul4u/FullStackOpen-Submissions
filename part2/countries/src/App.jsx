import { useState, useEffect } from "react";
import axios from "axios";
import { getCountries, getCountry } from "./services/countryapi";
import Country from "./Country";
import CountryList from "./CountryList";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [result, setResult] = useState([]);
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    getCountries().then((response) => {
      setCountries(response);
    });
  }, []);

  useEffect(() => {
    if (!query.length) {
      setResult([]);
      return;
    }

    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    if (filteredCountries.length === 1) {
      getCountry(query).then((response) => {
        setResult([response]);
        console.log(result);
      });
      // console.log(filteredCountries);
      const result1 = result;
      console.log(result1);
    } else {
      setResult(filteredCountries);
    }
  }, [query]);

  return (
    <div>
      <form>
        find countries: <input value={query} onChange={handleChange} />
      </form>
      <ul>
        {result?.length === 1 ? (
          <Country country={result[0]} />
        ) : result?.length > 10 ? (
          <p>Too many matches,specify another field</p>
        ) : (
          <CountryList countries={result} />
          // result?.map((country) => <li>{country.name.common}</li>)
        )}
      </ul>
    </div>
  );
};
export default App;

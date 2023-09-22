import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCountry, fetchCountry } from "./hooks/useCountry";

const useField = (type) => {
  const [value, setValue] = useState("");
  const { setQuery } = useCountry();
  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flags["png"] || ""}
        height='100'
        alt={`flag of ${country.data.name.common}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const { query, setQuery, country, fetchCountry } = useCountry();
  const fetch = async (e) => {
    e.preventDefault();
    setQuery(nameInput.value);
  };
  useEffect(() => {
    setQuery(nameInput.value);
  }, [nameInput.value]);

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;

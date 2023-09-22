import axios from "axios";
import { useEffect, useState } from "react";

const fetchCountry = async (query) => {
  if (query.length < 2) return;
  try {
    const res = await axios.get(
      `https://studies.cs.helsinki.fi/restcountries/api/name/${query}`
    );
    return res.data; // Return the data instead of setting state
  } catch (error) {
    console.error("Error fetching country:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};

export const useCountry = () => {
  const [country, setCountry] = useState({});
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length < 2) return;
    async function fetch() {
      try {
        const countryData = await fetchCountry(query);
        if (countryData) {
          setCountry({ data: countryData, found: true });
        } else {
          setCountry({ found: false });
        }
      } catch (error) {
        console.error("Error in useCountry:", error);
      }
    }
    fetch();
    return () => {
      setCountry({});
    };
  }, [query]);

  return {
    query,
    country,
    setQuery,
    fetchCountry, // Export fetchCountry function
  };
};

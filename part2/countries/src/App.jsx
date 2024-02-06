import React from "react";
import { useEffect, useState } from "react";
import CountryInfo from "./components/CountryInfo";
import axios from "axios";

const App = () => {
  const [country, setCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
        console.log(response);
      });
  }, []);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0]);
    } else {
      setSelectedCountry("");
    }
  }, [filteredCountries]);

  const searchCountry = (e) => {
    setCountry(e.target.value);
    setFilteredCountries(
      countries.filter(
        (country) =>
          country.name.common
            .toLowerCase()
            .search(e.target.value.toLowerCase()) != -1
      )
    );
  };

  return (
    <div>
      <p>
        Find Countries
        <input value={country} name="country" onChange={searchCountry} />
      </p>
      {selectedCountry ? (
        <CountryInfo country={selectedCountry} />
      ) : filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        filteredCountries.map((country) => (
          <div key={country.cca3}>
            <p>{country.name.common}</p>
            <button onClick={() => setSelectedCountry(country)}>Show</button>
          </div>
        ))
      )}
    </div>
  );
};

export default App;

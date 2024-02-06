import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const [allWeather, setAllWeather] = useState(null);

  useEffect(() => {
    const api_key = "API_KEY";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}`
      )
      .then((response) => {
        console.log(response.data);
        setAllWeather(response.data);
      });
  }, [country]);

  if (allWeather === null) return null;

  return (
    <div>
      <h2>{`weather in ${country.capital[0]}`}</h2>
      <p>{`temperature ${(allWeather.main.temp - 273.15).toFixed(
        2
      )} Celsius`}</p>
      <img
        alt="weather icon"
        src={`http://openweathermap.org/img/wn/${allWeather.weather[0].icon}@2x.png`}
      />
      <p>{`wind ${allWeather.wind.speed} m/s`}</p>
    </div>
  );
};

export default Weather;

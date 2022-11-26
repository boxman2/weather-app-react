import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({
  setName,
  setTemp,
  setDescription,
  cities,
  getGeolocation,
}) => {
  const getWeatherByLocation = async (location) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=bd63b0df1e739e61ce1cbc327828e580&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setName(data.name);
    setTemp(data.main.temp);
    setDescription(data.weather[0].description.toUpperCase());
  };

  return (
    <div className="button-box">
      <Button
        variant="success"
        onClick={() => {
          getGeolocation();
        }}
      >
        현재날씨
      </Button>
      {cities.map((city) => {
        return (
          <Button
            variant="success"
            onClick={() => {
              getWeatherByLocation(city.id);
            }}
            key={city.id}
          >
            {city.name}
          </Button>
        );
      })}
    </div>
  );
};

export default WeatherButton;

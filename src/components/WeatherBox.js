import React from "react";

const WeatherBox = ({ name, description, temp }) => {
  return (
    <div className="weather-box">
      <div>{name}</div>
      <h2>{temp} °C</h2>
      <h2>{description}</h2>
    </div>
  );
};

export default WeatherBox;

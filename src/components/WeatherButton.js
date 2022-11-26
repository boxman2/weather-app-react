import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ setCity, cities }) => {
  return (
    <div className="button-box">
      <Button
        variant="success"
        onClick={() => {
          setCity("");
        }}
      >
        현재날씨
      </Button>
      {cities.map((city) => {
        return (
          <Button
            variant="success"
            onClick={() => {
              setCity(city.id);
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

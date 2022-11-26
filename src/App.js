import { useEffect, useState } from "react";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [temp, setTemp] = useState("");
  const [description, setDescription] = useState("");
  const cities = [
    { name: "파리", id: "paris" },
    { name: "뉴욕", id: "new york" },
    { name: "도쿄", id: "tokyo" },
    { name: "런던", id: "london" },
  ];
  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByGeo(lat, lon);
    });
  };
  const getWeatherByLocation = async (location) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=bd63b0df1e739e61ce1cbc327828e580&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setName(data.name);
    setTemp(data.main.temp);
    setDescription(data.weather[0].description.toUpperCase());
  };
  const getWeatherByGeo = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bd63b0df1e739e61ce1cbc327828e580&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setName(data.name);
    setTemp(data.main.temp);
    setDescription(data.weather[0].description.toUpperCase());
  };
  const [city, setCity] = useState("");
  useEffect(() => {
    if (city === "") {
      getGeolocation();
    } else {
      getWeatherByLocation(city);
    }
  }, [city]);

  return (
    <div>
      <div className="container">
        <WeatherBox name={name} temp={temp} description={description} />
        <WeatherButton setCity={setCity} cities={cities} />
      </div>
    </div>
  );
}

export default App;

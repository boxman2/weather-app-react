import { useEffect } from "react";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByGeo(lat, lon);
    });
  };
  const getWeatherByGeo = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bd63b0df1e739e61ce1cbc327828e580`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data.name, data.main.temp, data.weather[0].description);
  };
  useEffect(() => {
    getGeolocation();
  }, []);
  return (
    <div>
      <div className="container">
        <WeatherBox />
        <WeatherButton />
      </div>
    </div>
  );
}

export default App;

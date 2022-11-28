import { useEffect, useState } from "react";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [temp, setTemp] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const cities = [
    { name: "파리", id: "paris" },
    { name: "뉴욕", id: "new york" },
    { name: "도쿄", id: "tokyo" },
    { name: "런던", id: "london" },
  ];

  const getGeolocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByGeo(lat, lon);
    });
  };

  const getWeatherByLocation = async (location) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=bd63b0df1e739e61ce1cbc327828e580&units=metric`;
      let response = await fetch(url);
      let data = await response.json();
      setLoading(false);
      setName(data.name);
      setTemp(data.main.temp);
      setDescription(data.weather[0].description.toUpperCase());
    } catch (err) {
      console.log(err);
    }
  };
  const getWeatherByGeo = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bd63b0df1e739e61ce1cbc327828e580&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setLoading(false);
      setName(data.name);
      setTemp(data.main.temp);
      setDescription(data.weather[0].description.toUpperCase());
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (city === "") {
      getGeolocation();
    } else {
      getWeatherByLocation(city);
    }
  }, [city]);
  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader
            color="white"
            loading={loading}
            size={120}
            aria-label="Loading Spinner"
            data-testid="loader"
          />{" "}
        </div>
      ) : (
        <div className="container">
          <WeatherBox name={name} temp={temp} description={description} />
          <WeatherButton
            setCity={setCity}
            cities={cities}
            selectedCity={city}
          />{" "}
        </div>
      )}
    </div>
  );
}

export default App;

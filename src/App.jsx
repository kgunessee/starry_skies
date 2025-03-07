import LocationInput from "./components/LocationInput.jsx";
import "./App.css";
import Header from "./components/Header.jsx";
import MainWeatherGridSection from "./components/MainWeatherGridSection.jsx";
import { useState, useEffect, useRef } from "react";
import MobileMenu from "./components/MobileMenu.jsx";
import axios from "axios";

function App() {
  const [lat, setLat] = useState(51.5072);
  const [lon, setLon] = useState(-0.1275);
  const [isKPH, setKPH] = useState(false);
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(500);
  const [weatherData, setWeatherData] = useState(null);
  const [moonData, setMoonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const headerRef = useRef(null);

  const handleLocationSelected = (latitude, longitude) => {
    setLat(latitude);
    setLon(longitude);
  };

  const fetchWeatherData = async () => {
    if (lat && lon) {
      const openWeatherAPIKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
      const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,precipitation_probability,precipitation,rain,showers,weather_code,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=sunrise,sunset,daylight_duration&wind_speed_unit=mph&timezone=auto`;
      const openWeatherMapUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${openWeatherAPIKey}`;
      setError(null);

      try {
        setLoading(true);
        const openMeteoResponse = await axios.get(openMeteoUrl);
        const openWeatherMapResponse = await axios.get(openWeatherMapUrl);
        setWeatherData(openMeteoResponse.data);
        setMoonData(openWeatherMapResponse.data);
      } catch (err) {
        setError(err);
        setWeatherData(null);
        setMoonData(null);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  console.log(moonData);

  const handleToggleSpeedUnit = () => {
    setKPH(!isKPH);
  };

  const handleToggleTempUnit = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  const handleUserInputLat = (inputValue) => {
    setLat(inputValue);
  };

  const handleUserInputLon = (inputValue) => {
    setLon(inputValue);
  };

  // Calculate the height of the header & location section and subtract this from the window height. Use this to set the max height of the main div to enable scroll behaviour on smaller screens.
  const calcMainElHeight = () => {
    const headerHeight = headerRef.current.getBoundingClientRect().height;
    const windowHeight = window.innerHeight;
    setHeaderHeight(windowHeight - headerHeight);
  };

  useEffect(() => {
    calcMainElHeight();

    const handleResize = () => {
      calcMainElHeight();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`bg-slate-800 text-gray-50`}>
      <div ref={headerRef}>
        <Header />
        <LocationInput
          onLocationSelected={handleLocationSelected}
          userLonInput={handleUserInputLon}
          userLatInput={handleUserInputLat}
          fetchWeatherData={fetchWeatherData}
          loading={loading}
        />
      </div>
      <main className={`relative`}>
        <MainWeatherGridSection
          isKPH={isKPH}
          isFarenheit={isFahrenheit}
          mainSectionHeight={headerHeight}
          loading={loading}
          error={error}
          weatherData={weatherData}
          moonData={moonData}
        />
      </main>
      {/*<MobileMenu*/}
      {/*  toggleSpeedUnit={handleToggleSpeedUnit}*/}
      {/*  toggleTempUnit={handleToggleTempUnit}*/}
      {/*/>*/}
    </div>
  );
}

export default App;

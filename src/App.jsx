import { useState, useEffect, useRef } from "react";

// Components //
import LocationInput from "./components/LocationInput.jsx";
import Header from "./components/Header.jsx";
import MainWeatherGridSection from "./components/MainWeatherGridSection.jsx";
import MobileMenu from "./components/MobileMenu.jsx";
import "./App.css";

// Libraries //
import { AnimatePresence } from "motion/react";
import axios from "axios";

function App() {
  const [lat, setLat] = useState(52.506);
  const [lon, setLon] = useState(-1.451);
  const [isKPH, setKPH] = useState(false);
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [moonData, setMoonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const headerRef = useRef(null);

  const handleLocationSelected = (latitude, longitude) => {
    setLat(latitude);
    setLon(longitude);
  };

  const handleToggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const fetchWeatherData = async () => {
    if (lat && lon) {
      const openWeatherAPIKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
      const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,precipitation_probability,precipitation,rain,showers,weather_code,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=sunrise,sunset,daylight_duration&wind_speed_unit=mph&timezone=auto&models=best_match`;
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

  return (
    <div className={`text-primaryText mx-auto lg:w-[80vw]`}>
      <div className={`font-nunito`} ref={headerRef}>
        <Header
          handleToggleMenu={handleToggleMenu}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileMenu
              isMobileMenuOpen={isMobileMenuOpen}
              toggleSpeedUnit={handleToggleSpeedUnit}
              toggleTempUnit={handleToggleTempUnit}
              isKPH={isKPH}
              isFahrenheit={isFahrenheit}
            />
          )}
        </AnimatePresence>
        <LocationInput
          onLocationSelected={handleLocationSelected}
          userLonInput={handleUserInputLon}
          userLatInput={handleUserInputLat}
          fetchWeatherData={fetchWeatherData}
          loading={loading}
        />
      </div>
      <main className={`font-nunito relative`}>
        <MainWeatherGridSection
          isKPH={isKPH}
          isFahrenheit={isFahrenheit}
          loading={loading}
          error={error}
          weatherData={weatherData}
          moonData={moonData}
        />
      </main>
    </div>
  );
}

export default App;

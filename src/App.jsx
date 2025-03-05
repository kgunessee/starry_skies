import LocationInput from "./components/LocationInput.jsx";
import "./App.css";
import Header from "./components/Header.jsx";
import MainWeatherGridSection from "./components/MainWeatherGridSection.jsx";
import { useState, useEffect } from "react";
import MobileMenu from "./components/MobileMenu.jsx";

function App() {
  const [lat, setLat] = useState(51.5072);
  const [lon, setLon] = useState(-0.1275);
  const [isKPH, setKPH] = useState(false);
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  const handleLocationSelected = (latitude, longitude) => {
    setLat(latitude);
    setLon(longitude);
  };

  const handleToggleSpeedUnit = () => {
    setKPH(!isKPH);
  };

  const handleToggleTempUnit = () => {
    setIsFahrenheit(!isFahrenheit);
  }

  const handleUserInputLat = (inputValue) => {
    setLat(inputValue);
  };

  const handleUserInputLon = (inputValue) => {
    setLon(inputValue);
  };


  return (
    <div className={`bg-slate-800 text-gray-50`}>
      <Header />
      <main className={`relative`}>
        <LocationInput
          onLocationSelected={handleLocationSelected}
          userLonInput={handleUserInputLon}
          userLatInput={handleUserInputLat}
        />
        <MainWeatherGridSection lat={lat} lon={lon} isKPH={isKPH} isFarenheit={isFahrenheit} />
      </main>
      {/*<MobileMenu toggleSpeedUnit={handleToggleSpeedUnit} toggleTempUnit={handleToggleTempUnit} />*/}
    </div>
  );
}

export default App;

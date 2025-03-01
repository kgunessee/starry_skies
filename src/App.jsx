import LocationInput from "./components/LocationInput.jsx";
import "./App.css";
import Header from "./components/Header.jsx";
import MainWeatherGridSection from "./components/MainWeatherGridSection.jsx";
import { useState, useEffect } from "react";
import MobileMenu from "./components/MobileMenu.jsx";

function App() {
  const [lat, setLat] = useState(null);
  const [lng, setLon] = useState(null);
  const [isKPH, setKPH] = useState(false);

  const handleLocationSelected = (latitude, longitude) => {
    setLat(latitude);
    setLon(longitude);
  };

  const handleToggleSpeedUnit = () => {
    setKPH(!isKPH);
  };

  return (
    <div className={`mx-1 bg-slate-800 text-gray-50`}>
      <Header />
      <main className={`relative`}>
        <LocationInput onLocationSelected={handleLocationSelected} />
        <MainWeatherGridSection lat={lat} lon={lng} isKPH={isKPH} />
      </main>
      <MobileMenu toggleSpeedUnit={handleToggleSpeedUnit} />
    </div>
  );
}

export default App;

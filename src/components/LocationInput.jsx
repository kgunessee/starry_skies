import React, { useState, useRef, useEffect } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
const libraries = ["places"];
import {
  searchIcon,
  getUserLocationIcon,
  loadingSpinner,
} from "./SVGIcons.jsx";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

const LocationInput = ({
  onLocationSelected,
  userLonInput,
  userLatInput,
  fetchWeatherData,
  loading,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Replace with your API key
    libraries,
  });
  const [inputValue, setInputValue] = useState("");
  const [latValue, setLatValue] = useState("51.5072");
  const [lonValue, setLonValue] = useState("-1.45");
  const [geoLoading, setGeoLoading] = useState(false);

  const autocompleteRef = useRef(null);

  const handleLatChange = (e) => {
    const value = e.target.value;
    setLatValue(value);
    userLatInput(value);
  };

  const handleLonChange = (e) => {
    const value = e.target.value;
    setLonValue(value);
    userLonInput(value);
  };

  const handleInputChange = (value) => {
    // Only update the input value for typing, not hover
  };

  const handlePlaceChanged = (value) => {
    if (
      value &&
      value.properties &&
      value.properties.lat &&
      value.properties.lon
    ) {
      const lat = value.properties.lat;
      const lon = value.properties.lon;
      onLocationSelected(lat, lon);
      setLatValue(lat.toFixed(3));
      setLonValue(lon.toFixed(3));
      setInputValue(value.properties.formatted_address || "");
      handleLatChange({ target: { value: lat.toFixed(3) } });
      handleLonChange({ target: { value: lon.toFixed(3) } });
    }
  };

  const handleGetUserLocation = (e) => {
    e.preventDefault();
    setGeoLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          onLocationSelected(lat, lng);
          setLatValue(lat.toFixed(3));
          setLonValue(lng.toFixed(3));
          setGeoLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location.");
          setGeoLoading(false);
        },
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  if (loadError) return <div>Error loading maps!</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <section
      className={`m-2 rounded-md bg-white/10 p-2`}
      aria-label="Location Input"
    >
      <div className={`flex flex-col gap-2`}>
        <div className={`flex w-full gap-2`}>
          <div className="flex-grow">
            <GeoapifyContext apiKey={import.meta.env.VITE_GEOAPIFY_API_KEY}>
              <GeoapifyGeocoderAutocomplete
                placeholder="Enter address here"
                value={inputValue}
                placeSelect={handlePlaceChanged}
                suggestionsChange={handleInputChange}
              />
            </GeoapifyContext>
          </div>
          <button
            title={`Get User Location`}
            className={`bg-buttonBlue grid aspect-square w-10 cursor-pointer place-items-center items-center rounded`}
            type={"button"}
            onClick={handleGetUserLocation}
          >
            {geoLoading ? loadingSpinner : getUserLocationIcon}
          </button>
          <button
            title={`Display Weather Data`}
            className={`bg-buttonBlue grid aspect-square w-10 cursor-pointer place-items-center rounded`}
            type={"button"}
            onClick={fetchWeatherData}
          >
            {loading ? loadingSpinner : searchIcon}
          </button>
        </div>
        <div className={`flex gap-2`}>
          <div>
            <label htmlFor={"lat"}>Latitude</label>

            <input
              id={"lat"}
              className={`w-full rounded bg-white/10 p-2`}
              type="number"
              onChange={handleLatChange}
              value={latValue}
            />
          </div>
          <div>
            <label htmlFor={"lon"}>Longitude</label>
            <input
              id={"lon"}
              className={`w-full rounded bg-white/10 p-2`}
              type="number"
              onChange={handleLonChange}
              value={lonValue}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationInput;

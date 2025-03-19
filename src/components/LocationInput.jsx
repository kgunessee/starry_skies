import React, { useState, useRef, useEffect } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
const libraries = ["places"];
import {
  searchIcon,
  getUserLocationIcon,
  loadingSpinner,
} from "./SVGIcons.jsx";

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
  const [lonValue, setLonValue] = useState("-0.145");
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

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lon = place.geometry.location.lng();
        onLocationSelected(lat, lon);
        setLatValue(lat.toFixed(3));
        setLonValue(lon.toFixed(3));

        // Update the input value with the full address/place name
        setInputValue(place.formatted_address || place.name || "");

        // Call handleLatChange and handleLonChange with the lat and lng values
        handleLatChange({ target: { value: lat.toFixed(3) } });
        handleLonChange({ target: { value: lon.toFixed(3) } });
      }
    }
  };

  useEffect(() => {
    console.log(latValue, lonValue);
  }, [latValue, lonValue]);

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
            <Autocomplete
              onLoad={(autocomplete) => {
                autocompleteRef.current = autocomplete;
              }}
              onPlaceChanged={handlePlaceChanged}
            >
              <input
                className={`w-full rounded bg-white/10 p-2`}
                type="text"
                placeholder="Enter a location"
                value={inputValue}
                onChange={handleInputChange}
              />
            </Autocomplete>
          </div>
          <button
            className={`bg-buttonBlue grid aspect-square w-10 place-items-center items-center rounded`}
            type={"button"}
            onClick={handleGetUserLocation}
          >
            {geoLoading ? loadingSpinner : getUserLocationIcon}
          </button>
          <button
            className={`bg-buttonBlue grid aspect-square w-10 place-items-center rounded`}
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

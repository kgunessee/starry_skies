import React, { useState, useRef, useEffect } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
const libraries = ["places"];
import { searchIcon } from "./SVGIcons.jsx";

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
  const [lonValue, setLonValue] = useState("-0.1275");

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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          onLocationSelected(lat, lng);
          setLatValue(lat.toFixed(3));
          setLonValue(lng.toFixed(3));
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location.");
        },
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  if (loadError) return <div>Error loading maps!</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={`grid grid-cols-4`}>
      <Autocomplete
        onLoad={(autocomplete) => {
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          className={`w-full border-2 p-2`}
          type="text"
          placeholder="Enter a location"
          value={inputValue}
          onChange={handleInputChange}
        />
      </Autocomplete>
      <input
        className={`w-full border-2 p-2`}
        type="number"
        onChange={handleLatChange}
        value={latValue}
      />
      <input
        className={`w-full border-2 p-2`}
        type="number"
        onChange={handleLonChange}
        value={lonValue}
      />
      <button
        className={`bg-blue-400 p-1`}
        type={"button"}
        onClick={fetchWeatherData}
      >
        {loading ? (
          <svg
            aria-hidden="true"
            className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        ) : (
          searchIcon
        )}
      </button>
      <button type={"button"} onClick={handleGetUserLocation}>
        Get Current Location
      </button>
    </div>
  );
};

export default LocationInput;

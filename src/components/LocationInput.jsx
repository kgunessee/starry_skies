import React, { useState, useRef } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const LocationInput = ({ onLocationSelected, userLonInput, userLatInput }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Replace with your API key
    libraries,
  });
  const [inputValue, setInputValue] = useState("");
  const [latValue, setLatValue] = useState("");
  const [lonValue, setLonValue] = useState("");

  const autocompleteRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        onLocationSelected(lat, lng);
        setLatValue(lat.toFixed(3));
        setLonValue(lng.toFixed(3));
      }
    }
  };

  const handleGetUserLocation = () => {
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
      <button onClick={handleGetUserLocation}>Get Current Location</button>
    </div>
  );
};

export default LocationInput;

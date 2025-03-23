import { useState } from "react";

// Icons //
import {
  searchIcon,
  getUserLocationIcon,
  loadingSpinner,
} from "./SVGIcons.jsx";

// Libraries //
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import axios from "axios";

const LocationInput = ({
  onLocationSelected,
  userLonInput,
  userLatInput,
  fetchWeatherData,
  loading,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [latValue, setLatValue] = useState("51.5072");
  const [lonValue, setLonValue] = useState("-1.45");
  const [geoLoading, setGeoLoading] = useState(false);

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

  const handleInputChange = () => {
    /* This empty function prevents the user input box from being populated by the autocomplete locations when they are hovered.
    Without this function, the input box would show '[OBJECT, OBJECT]' on hover due to how the location data is provided.
    It ensures that the location is only populated in the correct format when the user clicks the location. */
  };

  // Reverse geocoding using Geoapify's reverse geocoding API. This displays the users location in the input box.
  const handleReverseGeolocation = (lat, lon) => {
    axios
      .get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${
          import.meta.env.VITE_GEOAPIFY_API_KEY
        }`,
      )
      .then((response) => {
        const data = response.data;
        if (data.features && data.features.length > 0) {
          setInputValue(data.features[0].properties.city);
        } else {
          setInputValue(
            `Latitude: ${lat.toFixed(3)}, Longitude: ${lon.toFixed(3)}`,
          );
        }
        setGeoLoading(false);
        fetchWeatherData();
      })
      .catch((error) => {
        console.error("Error reverse geocoding:", error);
        setInputValue(
          `Latitude: ${lat.toFixed(3)}, Longitude: ${lon.toFixed(3)}`,
        );
        setGeoLoading(false);
        fetchWeatherData();
      });
  };

  const handleChangeLocation = (value) => {
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

  // Get the users location with permission and display the weather results
  const handleGetUserLocation = (e) => {
    e.preventDefault();
    setGeoLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          onLocationSelected(lat, lon);
          setLatValue(lat.toFixed(3));
          setLonValue(lon.toFixed(3));

          handleReverseGeolocation(lat, lon);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location.");
          setGeoLoading(false);
        },
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setGeoLoading(false);
    }
  };

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
                placeSelect={handleChangeLocation}
                suggestionsChange={handleInputChange}
              />
            </GeoapifyContext>
          </div>

          {/*// Button to fetch user location*/}
          <button
            title={`Get User Location`}
            className={`bg-buttonBlue grid aspect-square w-10 cursor-pointer place-items-center items-center rounded`}
            type={"button"}
            onClick={handleGetUserLocation}
          >
            {geoLoading ? loadingSpinner : getUserLocationIcon}
          </button>

          {/*// Button to fetch and display weather */}
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

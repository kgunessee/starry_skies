import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CloudParameter from "./weather-parameters/CloudParameter.jsx";
import TimeParameter from "./weather-parameters/TimeParameter.jsx";
import PrecipitationParameter from "./weather-parameters/PrecipitationParameter.jsx";
import WeatherTypeParameter from "./weather-parameters/WeatherTypeParameter.jsx";
import WindParameter from "./weather-parameters/WindParameter.jsx";

const MainWeatherGridSection = ({ lat, lon, isKPH }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(""); // Holds the active date
  const [speedUnit, setSpeedUnit] = useState("MPH");

  const sectionRefs = useRef([]); // Stores refs for each section

  // ---------------FETCH WEATHER DATA---------------------------------------------------
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (lat && lon) {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,precipitation_probability,precipitation,rain,showers,weather_code,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=sunrise,sunset,daylight_duration&wind_speed_unit=mph&timezone=auto`;

        setLoading(true);
        setError(null);

        try {
          setLoading(true);
          const openMeteoResponse = await axios.get(apiUrl);
          setWeatherData(openMeteoResponse.data);
        } catch (err) {
          setError(err);
          setWeatherData(null);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchWeatherData();
  }, [lat, lon]);

  // ---------------INTERSECTION OBSERVER TO CHANGE DATE BASED ON THE DAT IN VIEW---------------------------------------------------
  useEffect(() => {
    if (!weatherData || !weatherData.hourly) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentDate(entry.target.getAttribute("data-date"));
          }
        });
      },
      { root: null, threshold: 0.8 },
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [weatherData]);

  useEffect(() => {
    isKPH ? setSpeedUnit("KPH") : setSpeedUnit("MPH");
  }, [isKPH]);

  if (loading) return <div>Loading weather...</div>;
  if (error) return <div>Error fetching weather: {error.message}</div>;
  if (!weatherData) return <div>Enter a location to see the weather.</div>;
  if (!weatherData.hourly) return <div>Weather data not available</div>;

  const {
    time,
    cloud_cover,
    cloud_cover_low,
    cloud_cover_mid,
    cloud_cover_high,
    precipitation_probability,
    weather_code,
    wind_speed_10m,
    wind_direction_10m,
    wind_gusts_10m,
  } = weatherData.hourly;

  const parameterNames = [
    "Time (24hr)",
    "Cloud Cover (Total)",
    "Cloud Cover (High)",
    "Cloud Cover (Mid)",
    "Cloud Cover (Low)",
    "Weather",
    "Precipitation Probability (%)",
    `Wind Speed (${speedUnit})`,
    "Wind Direction",
    `Wind Gusts (${speedUnit})`,
  ];

  const gridItemStyling =
    "relative grid h-10 w-10 place-items-center rounded-sm p-1";

  const timeToDay = [];
  time.forEach((time, index) => {
    if (index % 24 === 0) {
      timeToDay.push(time);
    }
  });

  const timeToHour = time.map((t) => {
    const date = new Date(t);
    return date.getHours();
  });

  const handleMphToKph = (miles) => {
    if (isKPH) {
      return (miles * 1.60934).toFixed(1);
    } else {
      return miles.toFixed(1);
    }
  };

  return (
    <div className="relative">
      <div className="top-4 left-4 z-50 rounded bg-white p-3 text-lg font-bold shadow-lg dark:bg-gray-900">
        {currentDate || "Loading..."}
      </div>
      <section className={`flex`}>
        <div className={`w-auto`}>
          {parameterNames.map((name) => {
            return (
              <p
                key={`weatherParam-${name}`}
                className={`mb-1 flex h-10 w-max items-center`}
              >
                {name}
              </p>
            );
          })}
        </div>
        {/* ------------------Scrollable Weather Sections--------------------- */}
        <div className="flex overflow-x-auto">
          {timeToDay.map((day, dayIndex) => (
            <div
              key={dayIndex}
              ref={(item) => (sectionRefs.current[dayIndex] = item)}
              data-date={day}
              className="border"
            >
              {/* ---------------Weather Data Grid---------------- */}
              <TimeParameter
                time={timeToHour}
                dayIndex={dayIndex}
                additionalWeatherVariable={cloud_cover}
                gridItemStyling={gridItemStyling}
              />
              <CloudParameter
                clouds={cloud_cover}
                dayIndex={dayIndex}
                gridItemStyling={gridItemStyling}
              />
              <CloudParameter
                clouds={cloud_cover_high}
                dayIndex={dayIndex}
                gridItemStyling={gridItemStyling}
              />
              <CloudParameter
                clouds={cloud_cover_mid}
                dayIndex={dayIndex}
                gridItemStyling={gridItemStyling}
              />
              <CloudParameter
                clouds={cloud_cover_low}
                dayIndex={dayIndex}
                gridItemStyling={gridItemStyling}
              />
              <WeatherTypeParameter
                weatherType={weather_code}
                dayIndex={dayIndex}
                gridItemStyling={gridItemStyling}
              />
              <PrecipitationParameter
                precipitation={precipitation_probability}
                dayIndex={dayIndex}
                gridItemStyling={gridItemStyling}
              />
              <WindParameter
                windSpeed={wind_speed_10m}
                windGusts={wind_gusts_10m}
                windDirection={wind_direction_10m}
                dayIndex={dayIndex}
                gridItemStyling={gridItemStyling}
                mphToKph={handleMphToKph}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainWeatherGridSection;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CloudParameter from "./weather-parameters/CloudParameter.jsx";
import TimeParameter from "./weather-parameters/TimeParameter.jsx";
import PrecipitationParameter from "./weather-parameters/PrecipitationParameter.jsx";
import WeatherTypeParameter from "./weather-parameters/WeatherTypeParameter.jsx";
import WindParameter from "./weather-parameters/WindParameter.jsx";
import DewPointParameter from "./weather-parameters/DewPointParameter.jsx";
import HumidityParameter from "./weather-parameters/HumidityParameter.jsx";
import TemperatureParameter from "./weather-parameters/TemperatureParameter.jsx";

const MainWeatherGridSection = ({ lat, lon, isKPH, isFarenheit }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(""); // Holds the active date
  const [speedUnit, setSpeedUnit] = useState("MPH");
  const [tempUnit, setTempUnit] = useState("C");
  const [dailyWeatherData, setDailyWeatherData] = useState(null);

  const sectionRefs = useRef([]); // Stores refs for each section

  // ---------------FETCH WEATHER DATA---------------------------------------------------

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

  useEffect(() => {
    fetchWeatherData();
  }, []);

  // ---------------INTERSECTION OBSERVER TO CHANGE DATE BASED ON THE DAT IN VIEW---------------------------------------------------
  useEffect(() => {
    if (!weatherData || !weatherData.hourly) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const date = entry.target.getAttribute("data-date");
          const dateIndex = timeToDay.indexOf(date);

          if (entry.isIntersecting) {
            setCurrentDate(date);
            setDailyWeatherData(sunrise[dateIndex]);
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

  useEffect(() => {
    isFarenheit ? setTempUnit("F") : setTempUnit("C");
  }, [isFarenheit]);

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
    temperature_2m,
    relative_humidity_2m,
    dew_point_2m,
  } = weatherData.hourly;

  const { sunrise, sunset, daylight_duration } = weatherData.daily;

  const parameterNames = [
    "Time (24hr)",
    "Clouds (Total)",
    "Clouds (High)",
    "Clouds (Mid)",
    "Clouds (Low)",
    "Weather",
    "Precipitation (%)",
    `Wind (${speedUnit})`,
    "Wind Direction",
    `Gusts (${speedUnit})`,
    `Temperature (°${tempUnit})`,
    "Humidity (%)",
    `Dew Point (°${tempUnit})`,
  ];

  const gridItemStyling =
    "relative grid h-8 w-8 place-items-center text-black font-semibold text-sm rounded-sm p-1";

  const timeToDay = [];
  time.forEach((time, index) => {
    if (index % 24 === 0) {
      const convertedToDate = new Date(time);
      const day = convertedToDate.getDate();
      const month = convertedToDate.getMonth() + 1;
      const year = convertedToDate.getFullYear();
      timeToDay.push(`${day}/${month}/${year}`);
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

  const handleCelciusToFarenheit = (celcius) => {
    if (isFarenheit) {
      return ((celcius * 9) / 2 + 32).toFixed(0);
    } else return celcius;
  };

  return (
    <div className="relative">
      <button onClick={fetchWeatherData}>CLICK ME!</button>
      <div className="top-4 left-4 z-50 rounded bg-white p-3 text-lg font-bold shadow-lg dark:bg-gray-900">
        {currentDate || "Loading..."}
        {dailyWeatherData}
      </div>
      <section className={`flex h-[300px] overflow-scroll`}>

        <div className={`flex w-auto flex-col items-end gap-1 bg-sky-950 px-1`}>
          <p>Time</p>
          {parameterNames.map((name) => {
            return (
              <p
                key={`weatherParam-${name}`}
                className={`flex h-8 w-max items-center text-right text-sm`}
              >
                {name}
              </p>
            );
          })}
        </div>

        <div className="flex gap-1 overflow-x-auto">
          <p>TIME</p>
          {timeToDay.map((day, dayIndex) => (
            <div
              key={dayIndex}
              ref={(item) => (sectionRefs.current[dayIndex] = item)}
              data-date={day}
              className="bg-gradient-to-r from-slate-900 to-slate-800"
            > <TimeParameter
              time={timeToHour}
              dayIndex={dayIndex}
              additionalWeatherVariable={cloud_cover}
              gridItemStyling={gridItemStyling}
            /></div>
          ))}{" "}
        </div>

        {/* ------------------Scrollable Weather Sections--------------------- */}
        <div className="flex gap-1 overflow-x-auto">
          {timeToDay.map((day, dayIndex) => (
            <div
              key={dayIndex}
              ref={(item) => (sectionRefs.current[dayIndex] = item)}
              data-date={day}
              className="bg-gradient-to-r from-slate-900 to-slate-800"
            >
              {/* ---------------Weather Data Grid---------------- */}
              <div className={`sticky inset-0`}>
                <TimeParameter
                  time={timeToHour}
                  dayIndex={dayIndex}
                  additionalWeatherVariable={cloud_cover}
                  gridItemStyling={gridItemStyling}
                />
              </div>
              <div>
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

                <TemperatureParameter
                  temp={temperature_2m}
                  dayIndex={dayIndex}
                  gridItemStyling={gridItemStyling}
                  celciusToFarenheit={handleCelciusToFarenheit}
                />
                <HumidityParameter
                  humidity={relative_humidity_2m}
                  dayIndex={dayIndex}
                  gridItemStyling={gridItemStyling}
                />
                <DewPointParameter
                  dewPoint={dew_point_2m}
                  dayIndex={dayIndex}
                  gridItemStyling={gridItemStyling}
                  additionalWeatherVariable={temperature_2m}
                  celciusToFarenheit={handleCelciusToFarenheit}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainWeatherGridSection;

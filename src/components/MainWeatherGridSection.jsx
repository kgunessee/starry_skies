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

import {
  dateToTime,
  timeToHour,
  unixToTime,
} from "./unitConversionFunctions.js";
import MoonParameter from "./weather-parameters/MoonParameter.jsx";

const MainWeatherGridSection = ({
  isKPH,
  isFarenheit,
  mainSectionHeight,
  loading,
  weatherData,
  error,
  moonData,
}) => {
  const [currentDate, setCurrentDate] = useState(""); // Holds the active date
  const [speedUnit, setSpeedUnit] = useState("MPH");
  const [tempUnit, setTempUnit] = useState("C");
  const [dailyWeatherData, setDailyWeatherData] = useState({});
  const [dailyMoonData, setDailyMoonData] = useState({});

  const sectionRefs = useRef([]); // Stores refs for each section
  const timeGridRef = useRef(null);
  const mainGridRef = useRef(null);

  // ---------------INTERSECTION OBSERVER TO CHANGE DATE BASED ON THE DATE IN VIEW---------------------------------------------------
  useEffect(() => {
    if (!weatherData || !weatherData.hourly) return;

    const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
    const threshold = isMobile ? 0.1 : 0.2; // Adjust thresholds
    const rootMargin = isMobile ? "0px 0px -20px 0px" : "0px"; // Adjust rootMargin

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const date = entry.target.getAttribute("data-date");
          const dateIndex = formattedDate.indexOf(date);

          if (entry.isIntersecting) {
            setCurrentDate(date);
            setDailyWeatherData({
              sunrise: dateToTime(sunrise[dateIndex]),
              sunset: dateToTime(sunset[dateIndex]),
            });
            setDailyMoonData({
              moonrise: unixToTime(moonData.daily[dateIndex].moonrise),
              moonset: unixToTime(moonData.daily[dateIndex].moonset),
            });
          }
        });
      },
      { root: null, threshold: threshold, rootMargin: rootMargin },
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

  const { sunrise, sunset } = weatherData.daily;

  const parameterNames = [
    // "Time (24hr)",
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

  const formattedDate = [];
  time.forEach((time, index) => {
    if (index % 24 === 0) {
      const convertedToDate = new Date(time);
      const day = convertedToDate.getDate();
      const month = convertedToDate.getMonth() + 1;
      const year = convertedToDate.getFullYear();
      formattedDate.push(`${day}/${month}/${year}`);
    }
  });

  let isSyncing = false;

  const handleScroll = (sourceRef, targetRef) => {
    if (!sourceRef.current || !targetRef.current || isSyncing) return;
    isSyncing = true;
    targetRef.current.scrollLeft = sourceRef.current.scrollLeft;
    isSyncing = false;
  };

  return (
    <div className="sticky top-0">
      <div className="z-50 w-auto overflow-y-scroll rounded bg-blue-900 p-3 text-lg font-bold shadow-lg">
        <p>{currentDate || "Loading..."}</p>
        <p>{dailyMoonData.moonrise}</p>
      </div>

      {/*TIME GRID SECTION*/}
      <div className={`flex`}>
        <div
          className={`flex w-[100px] shrink-0 flex-col items-end gap-1 bg-sky-950 px-1 text-xs`}
        >
          {/*<p*/}
          {/*  className={`flex min-h-16 w-auto items-center text-right text-xs`}*/}
          {/*></p>*/}
          <p className={`flex min-h-8 w-auto items-center text-right text-xs`}>
            Moon
          </p>
          <p className={`flex min-h-8 w-auto items-center text-right text-xs`}>
            Time (24hr)
          </p>
        </div>
        <div
          ref={timeGridRef}
          onScroll={() => handleScroll(timeGridRef, mainGridRef)}
          className={`flex gap-1 overflow-y-scroll`}
        >
          {formattedDate.map((day, dayIndex) => (
            <div
              key={dayIndex}
              ref={(item) => (sectionRefs.current[dayIndex] = item)}
              data-date={day}
              className="bg-gradient-to-r from-slate-900 to-slate-800"
            >
              {/*<div className={`bg-sky-950`}>*/}
              {/*  <div className={`sticky top-0 left-0 z-50 mx-2 h-16 w-10`}>*/}
              {/*    {day}*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/* ---------------Weather Data Grid---------------- */}
              <div className={``}>
                <MoonParameter
                  time={timeToHour(time)}
                  dayIndex={dayIndex}
                  moonData={dailyMoonData}
                  gridItemStyling={gridItemStyling}
                />
                <TimeParameter
                  dailyWeather={dailyWeatherData}
                  time={timeToHour(time)}
                  dayIndex={dayIndex}
                  gridItemStyling={gridItemStyling}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/*MAIN GRID SECTION*/}
      <section
        style={{ maxHeight: `${mainSectionHeight}px` }}
        className={`flex overflow-scroll`}
      >
        <div
          className={`flex w-[100px] shrink-0 flex-col items-end gap-1 bg-sky-950 px-1`}
        >
          {parameterNames.map((name) => {
            return (
              <p
                key={`weatherParam-${name}`}
                className={`flex min-h-8 w-auto items-center text-right text-xs`}
              >
                {name}
              </p>
            );
          })}
        </div>

        {/* ------------------Scrollable Weather Sections--------------------- */}
        <div
          ref={mainGridRef}
          onScroll={() => handleScroll(mainGridRef, timeGridRef)}
          className="flex h-max gap-1 overflow-x-auto"
        >
          {formattedDate.map((day, dayIndex) => (
            <div
              key={dayIndex}
              ref={(item) => (sectionRefs.current[dayIndex] = item)}
              data-date={day}
              className="bg-gradient-to-r from-slate-900 to-slate-800"
            >
              {/* ---------------Weather Data Grid---------------- */}
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
                  dailyWeather={dailyWeatherData}
                  time={timeToHour(time)}
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
                  isKPH={isKPH}
                />

                <TemperatureParameter
                  temp={temperature_2m}
                  dayIndex={dayIndex}
                  gridItemStyling={gridItemStyling}
                  isFarenheit={isFarenheit}
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
                  isFarenheit={isFarenheit}
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

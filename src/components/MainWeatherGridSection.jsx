import React, { useState, useEffect, useRef } from "react";
import CloudParameter from "./weather-parameters/CloudParameter.jsx";
import TimeParameter from "./weather-parameters/TimeParameter.jsx";
import PrecipitationParameter from "./weather-parameters/PrecipitationParameter.jsx";
import WeatherTypeParameter from "./weather-parameters/WeatherTypeParameter.jsx";
import WindParameter from "./weather-parameters/WindParameter.jsx";
import DewPointParameter from "./weather-parameters/DewPointParameter.jsx";
import HumidityParameter from "./weather-parameters/HumidityParameter.jsx";
import TemperatureParameter from "./weather-parameters/TemperatureParameter.jsx";

import { dateToTime, timeToHour, unixToTime } from "./conversionFunctions.js";
import {
  selectMoonPhaseIcon,
  moonPhaseName,
} from "./selectMoonIconFunction.js";
import MoonParameter from "./weather-parameters/MoonParameter.jsx";
import {caretDownFill, caretUpFill} from "./SVGIcons.jsx";

const MainWeatherGridSection = ({
  isKPH,
  isFarenheit,
  // mainSectionHeight,
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
  const [writtenDayString, setWrittenDayString] = useState("");

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

            const convertedToDate = new Date(
              weatherData.hourly.time[dateIndex * 24],
            );
            const dayOfWeek = convertedToDate.getDay();
            setWrittenDayString(writtenDay(dayOfWeek));

            setDailyWeatherData({
              sunrise: dateToTime(sunrise[dateIndex]),
              sunset: dateToTime(sunset[dateIndex]),
            });
            setDailyMoonData({
              moonrise: unixToTime(moonData.daily[dateIndex].moonrise),
              moonset: unixToTime(moonData.daily[dateIndex].moonset),
              moonPhase: moonData.daily[dateIndex].moon_phase,
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
    "Moon Visibility",
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
    "relative grid h-8 w-8 place-items-center text-black text-sm rounded-sm p-1";

  const formattedDate = [];
  const writtenDay = (value) => {
    if (value === 0) {
      return "Sunday";
    } else if (value === 1) {
      return "Monday";
    } else if (value === 2) {
      return "Tuesday";
    } else if (value === 3) {
      return "Wednesday";
    } else if (value === 4) {
      return "Thursday";
    } else if (value === 5) {
      return "Friday";
    } else return "Saturday";
  };
  time.forEach((time, index) => {
    if (index % 24 === 0) {
      const convertedToDate = new Date(time);
      const day = convertedToDate.getDate();
      const month = convertedToDate.getMonth() + 1;
      const year = convertedToDate.getFullYear();
      formattedDate.push(`${day}/${month}/${year}`);
    }
  });

  // let isSyncing = false;
  //
  // const handleScroll = (sourceRef, targetRef) => {
  //   if (!sourceRef.current || !targetRef.current || isSyncing) return;
  //   isSyncing = true;
  //   targetRef.current.scrollLeft = sourceRef.current.scrollLeft;
  //   isSyncing = false;
  // };

  return (
    <div className="sticky top-0">

      <div className="z-50 mx-2 grid grid-cols-2 w-auto gap-2 overflow-y-scroll rounded-md bg-white/10 p-2 text-lg font-bold shadow-lg">
        <div>
          <p aria-label={"Day of the week"}>{writtenDayString}</p>
          <p aria-label={"Date in DD/MM/YYYY format"}>
            {currentDate || "Loading..."}
          </p>
        </div>
        <div className={`flex gap-2`}>
          <p>{selectMoonPhaseIcon(dailyMoonData.moonPhase, 40, 40)}</p>
          <div>
            <p>{moonPhaseName(dailyMoonData.moonPhase)}</p>
            <p className={`text-sm flex -ml-0.5 items-center font-light`}>
              <span>{caretUpFill}</span>
              {dailyMoonData.moonrise}
            </p>
            <p className={`text-sm flex -ml-0.5 items-center font-light`}>
              <span>{caretDownFill}</span>
              {dailyMoonData.moonset}
            </p>
          </div>
        </div>
      </div>

      {/*TIME & MOON GRID SECTION - SCROLLABLE*/}
      <div className={`mt-2 flex`}>
        {/*<div*/}
        {/*  className={`bg-background/50 flex w-[100px] shrink-0 flex-col items-end gap-1 px-1 text-xs`}*/}
        {/*>*/}
        {/*  <p className={`flex min-h-8 w-auto items-center text-right text-xs`}>*/}
        {/*    Moon*/}
        {/*  </p>*/}
        {/*  <p className={`flex min-h-8 w-auto items-center text-right text-xs`}>*/}
        {/*    Time (24hr)*/}
        {/*  </p>*/}
        {/*</div>*/}
        {/*<div*/}
        {/*  ref={timeGridRef}*/}
        {/*  onScroll={() => handleScroll(timeGridRef, mainGridRef)}*/}
        {/*  className={`flex gap-4 overflow-y-scroll`}*/}
        {/*>*/}
        {/*  {formattedDate.map((day, dayIndex) => (*/}
        {/*    <div*/}
        {/*      key={dayIndex}*/}
        {/*      ref={(item) => (sectionRefs.current[dayIndex] = item)}*/}
        {/*      data-date={day}*/}
        {/*      className=""*/}
        {/*    >*/}
        {/*      /!* ---------------Weather Data Grid---------------- *!/*/}
        {/*      <div className={``}>*/}
        {/*        <MoonParameter*/}
        {/*          time={timeToHour(time)}*/}
        {/*          dayIndex={dayIndex}*/}
        {/*          moonData={dailyMoonData}*/}
        {/*          gridItemStyling={gridItemStyling}*/}
        {/*        />*/}
        {/*        <TimeParameter*/}
        {/*          dailyWeather={dailyWeatherData}*/}
        {/*          time={timeToHour(time)}*/}
        {/*          dayIndex={dayIndex}*/}
        {/*          gridItemStyling={gridItemStyling}*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</div>*/}
      </div>
      {/*--------------------GRID SECTION-------------------------*/}
      <section
        // style={{ maxHeight: `${mainSectionHeight}px overflow-scroll` }}
        className={`mx-2 flex rounded-md bg-white/10 p-2`}
      >
        {/* ---------------Parameter Names---------------- */}

        <div className={`flex w-[90px] shrink-0 flex-col items-end gap-1 px-1`}>
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
        {/* ---------------Weather Data Grid---------------- */}
        <div
          ref={mainGridRef}
          // onScroll={() => handleScroll(mainGridRef, timeGridRef)}
          className="flex h-max gap-4 overflow-x-auto"
        >
          {formattedDate.map((day, dayIndex) => (
            <div
              key={dayIndex}
              ref={(item) => (sectionRefs.current[dayIndex] = item)}
              data-date={day}
              className=""
            >
              <div>
                <MoonParameter
                  time={timeToHour(time)}
                  moonData={moonData}
                  gridItemStyling={gridItemStyling}
                  dayIndex={dayIndex}

                />
                <TimeParameter
                  dailyWeather={dailyWeatherData}
                  time={timeToHour(time)}
                  dayIndex={dayIndex}
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

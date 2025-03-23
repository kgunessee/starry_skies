import { useState, useEffect, useRef } from "react";

// Parameter Components //
import CloudParameter from "./weather-parameters/CloudParameter.jsx";
import TimeParameter from "./weather-parameters/TimeParameter.jsx";
import PrecipitationParameter from "./weather-parameters/PrecipitationParameter.jsx";
import WeatherTypeParameter from "./weather-parameters/WeatherTypeParameter.jsx";
import WindParameter from "./weather-parameters/WindParameter.jsx";
import DewPointParameter from "./weather-parameters/DewPointParameter.jsx";
import HumidityParameter from "./weather-parameters/HumidityParameter.jsx";
import TemperatureParameter from "./weather-parameters/TemperatureParameter.jsx";
import MoonParameter from "./weather-parameters/MoonParameter.jsx";
import DailyWeatherSectionMobile from "./weather-parameters/DailyWeatherSectionMobile.jsx";
import DailyWeatherSectionDesktop from "./weather-parameters/DailyWeatherSectionDesktop.jsx";

// Functions //
import { dateToTime, timeToHour, unixToTime } from "./conversionFunctions.js";

//--------------------------------------------------------------------------------------//

const MainWeatherGridSection = ({
  isKPH,
  isFahrenheit,
  loading,
  weatherData,
  error,
  moonData,
  isMobile,
}) => {
  const [currentDate, setCurrentDate] = useState("");
  const [speedUnit, setSpeedUnit] = useState("MPH");
  const [tempUnit, setTempUnit] = useState("C");
  const [dailyWeatherData, setDailyWeatherData] = useState({});
  const [dailyMoonData, setDailyMoonData] = useState({});
  const [writtenDayString, setWrittenDayString] = useState("");

  const sectionRefs = useRef([]);
  const mainGridRef = useRef(null);

  // ---------------INTERSECTION OBSERVER TO CHANGE DATE BASED ON THE DATE IN VIEW---------//

  useEffect(() => {
    if (!weatherData || !weatherData.hourly) return;

    // const isMobile = window.innerWidth <= 1024;
    const threshold = isMobile ? 0.1 : 0.2; // Intersection Observer Threshold
    const rootMargin = isMobile ? "0px 0px -20px 0px" : "0px"; // Intersection Observer Root Margin

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
    isFahrenheit ? setTempUnit("F") : setTempUnit("C");
  }, [isFahrenheit]);

  if (loading) return <div>Loading weather...</div>;
  if (error) return <div>Error fetching weather: {error.message}</div>;
  if (!weatherData) return <div>Enter a location to see the weather.</div>;
  if (!weatherData.hourly) return <div>Weather data not available</div>;

  // Destructured weather params from API response
  const {
    time,
    cloud_cover,
    cloud_cover_low,
    cloud_cover_mid,
    cloud_cover_high,
    precipitation_probability,
    precipitation,
    weather_code,
    wind_speed_10m,
    wind_direction_10m,
    wind_gusts_10m,
    temperature_2m,
    relative_humidity_2m,
    dew_point_2m,
  } = weatherData.hourly;

  const { sunrise, sunset } = weatherData.daily;

  // Weather params to display
  const parameterNames = [
    "Moon Visibility",
    "Time (24hr)",
    "Clouds (Total)",
    "Clouds (High)",
    "Clouds (Mid)",
    "Clouds (Low)",
    "Weather",
    `Precipitation (%)`,
    `Precipitation (mm)`,
    `Wind (${speedUnit})`,
    "Wind Direction",
    `Gusts (${speedUnit})`,
    `Temperature (°${tempUnit})`,
    "Humidity (%)",
    `Dew Point (°${tempUnit})`,
  ];

  const gridItemStyling =
    "relative grid h-8 w-8 place-items-center text-black text-sm rounded-sm p-1";

  // Function that takes the day of the week (0-6) and returns the written day
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

  // Function that takes the date and returns it in DD/MM/YYYY format
  time.forEach((time, index) => {
    if (index % 24 === 0) {
      const convertedToDate = new Date(time);
      const day = convertedToDate.getDate();
      const month = convertedToDate.getMonth() + 1;
      const year = convertedToDate.getFullYear();
      formattedDate.push(`${day}/${month}/${year}`);
    }
  });

  return (
    <div className="sticky top-0">
      {/*// ---------------------------DAILY WEATHER SECTION----------------------------//*/}
      {isMobile && (
        <DailyWeatherSectionMobile
          writtenDayString={writtenDayString}
          currentDate={currentDate}
          dailyMoonData={dailyMoonData}
        />
      )}

      {/*// ---------------------------GRID SECTION----------------------------//*/}
      <section className={`mx-2 flex rounded-md bg-white/10 p-2`}>
        {/* ---------------Parameter Names---------------- */}
        <div
          className={`flex w-[90px] shrink-0 flex-col items-end gap-1 px-1 lg:mt-20`}
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
        {/* ---------------Weather Data Grid---------------- */}
        <div ref={mainGridRef} className="flex h-max gap-4 overflow-x-auto">
          {formattedDate.map((day, dayIndex) => (
            <div
              key={dayIndex}
              ref={(item) => (sectionRefs.current[dayIndex] = item)}
              data-date={day}
              className=""
            >
              {!isMobile && (
                <DailyWeatherSectionDesktop
                  day={day}
                  dayIndex={dayIndex}
                  writtenDay={writtenDay}
                  moonData={moonData}
                />
              )}
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
                  precipParams={{ precipitation_probability, precipitation }}
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
                  isFarenheit={isFahrenheit}
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
                  isFarenheit={isFahrenheit}
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

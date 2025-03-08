import React from "react";

import {
  clear,
  cloudy,
  fog,
  snow,
  partlyCloudy,
  drizzle,
  lightRain,
  heavyRain,
  lightning,
  moderateRain,
} from "../WeatherIcons.jsx";
import { roundHour } from "../unitConversionFunctions.js";

const weatherIcon = {
  0: clear,
  1: partlyCloudy,
  2: partlyCloudy,
  3: cloudy,
  45: fog,
  48: fog,
  51: drizzle,
  53: drizzle,
  55: drizzle,
  56: drizzle,
  57: drizzle,
  61: lightRain,
  66: lightRain,
  80: lightRain,
  63: moderateRain,
  81: moderateRain,
  65: heavyRain,
  67: heavyRain,
  82: heavyRain,
  71: snow,
  73: snow,
  75: snow,
  77: snow,
  85: snow,
  86: snow,
  95: lightning,
  96: lightning,
  99: lightning,
};

const getWeatherIcon = (weatherCode) => {
  return weatherIcon[weatherCode];
};

export default function WeatherTypeParameter({
  weatherType,
  dayIndex,
  gridItemStyling,
  time,
  dailyWeather,
}) {
  return (
    <div className="mb-1 flex gap-1">
      {weatherType
        .slice(dayIndex * 24, dayIndex * 24 + 24)
        .map((item, index) => (
          <div key={`grid-item-${index}`} className={`${gridItemStyling}`}>
            <div key={index} className={`rounded bg-blue-400 p-0.5`}>
              {getWeatherIcon(item)}
            </div>
          </div>
        ))}
    </div>
  );
}

import React from "react";
import {
  Clear,
  Cloudy,
  Fog,
  Snow,
  PartlyCloudy,
  Drizzle,
  LightRain,
  HeavyRain,
  Lightning,
  ModerateRain,
} from "../weatherIcons.jsx";

const weatherIcon = {
  0: Clear(),
  1: PartlyCloudy(),
  2: PartlyCloudy(),
  3: Cloudy(),
  45: Fog(),
  48: Fog(),
  51: Drizzle(),
  53: Drizzle(),
  55: Drizzle(),
  56: Drizzle(),
  57: Drizzle(),
  61: LightRain(),
  66: LightRain(),
  80: LightRain(),
  63: ModerateRain(),
  81: ModerateRain(),
  65: HeavyRain(),
  67: HeavyRain(),
  82: HeavyRain(),
  71: Snow(),
  73: Snow(),
  75: Snow(),
  77: Snow(),
  85: Snow(),
  86: Snow(),
  95: Lightning(),
  96: Lightning(),
  99: Lightning(),
};

const getWeatherIcon = (weatherCode) => {
  return weatherIcon[weatherCode];
};

export default function WeatherTypeParameter({
  weatherType,
  dayIndex,
  gridItemStyling,
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

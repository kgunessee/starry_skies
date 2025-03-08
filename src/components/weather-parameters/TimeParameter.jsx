import React from "react";
import { roundHour } from "../unitConversionFunctions.js";

export default function TimeParameter({
  time,
  dayIndex,
  gridItemStyling,
  dailyWeather,
}) {
  const dayOrNightColour = (item) => {
    if (
      item < roundHour(dailyWeather.sunrise, dailyWeather) ||
      item > roundHour(dailyWeather.sunset, dailyWeather)
    ) {
      return "#152D62";
    } else if (
      item === roundHour(dailyWeather.sunrise, dailyWeather) ||
      item === roundHour(dailyWeather.sunset, dailyWeather)
    ) {
      return "#CAAE42";
    }
    return "#FFD54F";
  };

  const displayNumberOrSunIcon = (value) => {
    if (value === roundHour(dailyWeather.sunrise, dailyWeather)) {
      return "up";
    } else if (value === roundHour(dailyWeather.sunset, dailyWeather)) {
      return "down";
    } else return value;
  };

  return (
    <div className="mb-1 flex gap-1">
      {time.slice(dayIndex * 24, dayIndex * 24 + 24).map((item, index) => (
        <div
          style={{
            background: dailyWeather ? dayOrNightColour(item) : "#022763",
          }}
          key={`grid-item-${index}`}
          className={`${gridItemStyling}`}
        >
          <div key={index} className={``}>
            {dailyWeather && displayNumberOrSunIcon(item)}
          </div>
        </div>
      ))}
    </div>
  );
}

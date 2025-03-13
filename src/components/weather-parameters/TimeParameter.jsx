import React from "react";
import { roundHour } from "../conversionFunctions.js";
import { sunsetIcon, sunriseIcon } from "../SVGIcons.jsx";

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
      return {background: "#0C152C", color: "#E0E0E0" };

    } else if (
      item === roundHour(dailyWeather.sunrise, dailyWeather) ||
      item === roundHour(dailyWeather.sunset, dailyWeather)
    ) {
      // return "#CAAE42";
      return {background: "#CAAE42", color: "#000" };

    }
    // return "#FFD54F";
    return {background: "#FFD54F", color: "#000" };

  };

  const displayNumberOrSunIcon = (value) => {
    if (value === roundHour(dailyWeather.sunrise, dailyWeather)) {
      return sunriseIcon;
    } else if (value === roundHour(dailyWeather.sunset, dailyWeather)) {
      return sunsetIcon;
    } else return value;
  };

  return (
    <div className="mb-1 flex gap-1">
      {time.slice(dayIndex * 24, dayIndex * 24 + 24).map((item, index) => (
        <div
          style={dayOrNightColour(item)}
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

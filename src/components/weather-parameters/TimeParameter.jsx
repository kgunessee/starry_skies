import React from "react";

export default function TimeParameter({
  time,
  dayIndex,
  gridItemStyling,
  dailyWeather,
}) {


  const roundHour = (timeString) => {
    if (timeString && dailyWeather) {
      const [hour, minute] = timeString.split(":").map(Number);
      return minute >= 30 ? hour + 1 : hour;
    }
  };

  const dayOrNightColour = (item) => {
    if (
      item < roundHour(dailyWeather.sunrise) ||
      item > roundHour(dailyWeather.sunset)
    ) {
      return "#022763";
    } else if (
      item === roundHour(dailyWeather.sunrise) ||
      item === roundHour(dailyWeather.sunset)
    ) {
      return "#c47d25";
    }
    return "#c3f011";
  };

  const displayNumberOrSunIcon = (value) => {
    if (value === roundHour(dailyWeather.sunrise)) {
      return "up";
    } else if (value === roundHour(dailyWeather.sunset)) {
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

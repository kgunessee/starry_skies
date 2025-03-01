import React from "react";

export default function TimeParameter({
  time,
  dayIndex,
  additionalWeatherVariable, // Prop to pass a value from another variable to use as styling, for example, cloud cover in the time component.
  gridItemStyling,
}) {
  const handleTimeStyle = (clouds, index) => {
    if (clouds[index] < 30) {
      return "#17182b";
    } else if (clouds[index] > 30 && clouds[index] < 60) {
      return "#a4c423";
    } else return "#b50526";
  };

  return (
    <div className="mb-1 flex gap-1">
      {time.slice(dayIndex * 24, dayIndex * 24 + 24).map((item, index) => (
        <div
          style={{
            background: handleTimeStyle(additionalWeatherVariable, index),
          }}
          key={`grid-item-${index}`}
          className={`${gridItemStyling}`}
        >
          <div key={index} className={``}>
            {item}
          </div>
        </div>
      ))}
    </div>
  );
}

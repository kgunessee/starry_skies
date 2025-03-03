import React from "react";

export default function DewPointParameter({
  dewPoint,
  dayIndex,
  additionalWeatherVariable, // Prop to pass a value from another variable to use as styling, for example, cloud cover in the time component.
  gridItemStyling,
}) {
  const convertedDewPoint = dewPoint
    .slice(dayIndex * 24, dayIndex * 24 + 24)
    .map((dewPoint) => Math.round(dewPoint).toFixed());

  return (
    <div className="mb-1 flex gap-1">
      {convertedDewPoint.map((item, index) => (
        <div key={`grid-item-${index}`} className={`${gridItemStyling}`}>
          <div key={index} className={``}>
            {item}
          </div>
        </div>
      ))}
    </div>
  );
}

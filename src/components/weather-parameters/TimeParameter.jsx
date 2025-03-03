import React from "react";
import { gridColourFunction } from "../gridColourFunction.js";

export default function TimeParameter({
  time,
  dayIndex,
  additionalWeatherVariable, // Prop to pass a value from another variable to use as styling, for example, cloud cover in the time component.
  gridItemStyling,
}) {
  const clouds = additionalWeatherVariable.slice(
    dayIndex * 24,
    dayIndex * 24 + 24,
  );

  return (
    <div className="mb-1 flex gap-1">
      {time.slice(dayIndex * 24, dayIndex * 24 + 24).map((item, index) => (
        <div
          style={{
            background: gridColourFunction(clouds[index], 10, 30),
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

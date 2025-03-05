import React from "react";
import { gridColourFunction } from "../gridColourFunction.js";

export default function HumidityParameter({
  humidity,
  dayIndex,
  gridItemStyling,

}) {
  return (
    <div className="mb-1 flex gap-1">
      {humidity.slice(dayIndex * 24, dayIndex * 24 + 24).map((item, index) => (
        <div style={{background: gridColourFunction(item, 80, 90)}} key={`grid-item-${index}`} className={`${gridItemStyling}`}>
          <div key={index} className={``}>
            {item}
          </div>
        </div>
      ))}
    </div>
  );
}

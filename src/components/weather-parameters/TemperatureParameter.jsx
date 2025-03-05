import React from "react";
import { gridColourFunction } from "../gridColourFunction.js";

export default function TemperatureParameter({
  temp,
  dayIndex,
  gridItemStyling,
  celciusToFarenheit,
}) {
  const convertedTemp = temp
    .slice(dayIndex * 24, dayIndex * 24 + 24)
    .map((dewPoint) => Math.round(dewPoint).toFixed());

  return (
    <div className="mb-1 flex gap-1">
      {convertedTemp.map((item, index) => (
        <div style={{background: gridColourFunction(temp[index], 10, 20)}} key={`grid-item-${index}`} className={`${gridItemStyling}`}>
          <div key={index} className={``}>
            {celciusToFarenheit(item)}
          </div>
        </div>
      ))}
    </div>
  );
}

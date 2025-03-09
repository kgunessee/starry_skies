import React from "react";
import { gridColourFunction } from "../gridColourFunction.js";
import { handleCelciusToFarenheit } from "../conversionFunctions.js";

export default function TemperatureParameter({
  temp,
  dayIndex,
  gridItemStyling,
  isFarenheit,
}) {
  const convertedTemp = temp
    .slice(dayIndex * 24, dayIndex * 24 + 24)
    .map((item) => Math.round(item).toFixed());

  return (
    <div className="mb-1 flex gap-1">
      {convertedTemp.map((item, index) => (
        <div
          style={{ background: gridColourFunction(temp[index], 10, 20) }}
          key={`grid-item-${index}`}
          className={`${gridItemStyling}`}
        >
          <div key={index} className={``}>
            {handleCelciusToFarenheit(item, isFarenheit)}
          </div>
        </div>
      ))}
    </div>
  );
}

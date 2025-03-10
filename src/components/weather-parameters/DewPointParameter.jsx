import React from "react";

import { handleCelciusToFarenheit } from "../conversionFunctions.js";

export default function DewPointParameter({
  dewPoint,
  dayIndex,
  additionalWeatherVariable, // Prop to pass a value from another variable to use as styling, for example, cloud cover in the time component.
  gridItemStyling,
  isFarenheit,
}) {
  const convertedDewPoint = dewPoint
    .slice(dayIndex * 24, dayIndex * 24 + 24)
    .map((dewPoint) => Math.round(dewPoint).toFixed());

  const dewPointColourFunction = (value, param1, param2) => {
    if (value < param1) {
      return "#E57373";
    } else if (value >= param1 && value <= param2) {
      return "#EAC94A";
    } else return "#48DF6B";
  };

  const dewPointSpreadCalc = (temp, dewPoint) => {
    return temp - dewPoint;
  };

  return (
    <div className="mb-1 flex gap-1">
      {convertedDewPoint.map((item, index) => (
        <div
          style={{
            background: dewPointColourFunction(
              dewPointSpreadCalc(additionalWeatherVariable, dewPoint),
              3,
              4,
            ),
          }}
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

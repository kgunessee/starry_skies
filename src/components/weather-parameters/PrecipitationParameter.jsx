import React from "react";
import { gridColourFunction } from "../gridColourFunction.js";

export default function PrecipitationParameter({
  precip,
  dayIndex,
  gridItemStyling,
  weatherModel,
}) {
  // const handlePrecipStyle = (precip) => {
  //   if (precip === 0) {
  //     return "#17182b";
  //   } else if (precip > 0 && precip < 10) {
  //     return "#a4c423";
  //   } else return "#b50526";
  // };

  const precipitationType =
    weatherModel === "ukmo_seamless"
      ? precip.precipitation
      : precip.precipitation_probability;

  return (
    <div className="mb-1 flex gap-1">
      {precipitationType
        .slice(dayIndex * 24, dayIndex * 24 + 24)
        .map((item, index) => (
          <div
            style={{
              background:
                weatherModel === "ukmo_seamless"
                  ? gridColourFunction(item, 0.2, 0.5)
                  : gridColourFunction(item, 1, 10),
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

import React from "react";
import { gridColourFunction } from "../gridColourFunction.js";

export default function PrecipitationParameter({
  precipParams,
  dayIndex,
  gridItemStyling,
}) {
  return (
    <>
      <div className="mb-1 flex gap-1">
        {precipParams.precipitation_probability
          .slice(dayIndex * 24, dayIndex * 24 + 24)
          .map((item, index) => (
            <div
              style={{
                background: gridColourFunction(item, 1, 10),
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
      <div className="mb-1 flex gap-1">
        {precipParams.precipitation
          .slice(dayIndex * 24, dayIndex * 24 + 24)
          .map((item, index) => (
            <div
              style={{
                background: gridColourFunction(item, 0.2, 0.5),
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
    </>
  );
}

import React from "react";
import { gridColourFunction } from "../gridColourFunction.js";

export default function WindParameter({
  windSpeed,
  windDirection,
  windGusts,
  dayIndex,
  gridItemStyling,
  mphToKph,
}) {
  // Pre-process windSpeed and windGusts to integers
  const roundedWindSpeed = windSpeed
    .slice(dayIndex * 24, dayIndex * 24 + 24)
    .map((speed) => Math.round(mphToKph(speed)));

  const roundedWindGusts = windGusts
    .slice(dayIndex * 24, dayIndex * 24 + 24)
    .map((gust) => Math.round(mphToKph(gust)));

  const windDirections = windDirection.slice(dayIndex * 24, dayIndex * 24 + 24);

  const arrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#e3e3e3"
      viewBox="0 -960 960 960"
    >
      <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487z"></path>
    </svg>
  );

  return (
    <>
      <div className="mb-1 flex gap-1">
        {roundedWindSpeed.map((item, index) => (
          <div
            style={{
              background: gridColourFunction(windSpeed[index], 11, 20),
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
        {windDirections.map((item, index) => (
          <div
            style={{ transform: `rotate(${item}deg)` }}
            key={`grid-item-${index}`}
            className={`${gridItemStyling}`}
          >
            <div key={index} className={``}>
              {arrow}
            </div>
          </div>
        ))}
      </div>
      <div className="mb-1 flex gap-1">
        {roundedWindGusts.map((item, index) => (
          <div
            style={{background: gridColourFunction(windGusts[index], 20, 30)}}
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

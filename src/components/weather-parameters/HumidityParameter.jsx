import React from "react";

export default function HumidityParameter({
  humidity,
  dayIndex,
  gridItemStyling,
}) {
  return (
    <div className="mb-1 flex gap-1">
      {humidity.slice(dayIndex * 24, dayIndex * 24 + 24).map((item, index) => (
        <div key={`grid-item-${index}`} className={`${gridItemStyling}`}>
          <div key={index} className={``}>
            {item}
          </div>
        </div>
      ))}
    </div>
  );
}

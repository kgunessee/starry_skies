import React from "react";

export default function PrecipitationParameter({
  precipitation,
  dayIndex,
  gridItemStyling,
}) {
  const handlePrecipStyle = (precip) => {
    if (precip === 0) {
      return "#17182b";
    } else if (precip > 0 && precip < 10) {
      return "#a4c423";
    } else return "#b50526";
  };

  return (
    <div className="mb-1 flex gap-1">
      {precipitation
        .slice(dayIndex * 24, dayIndex * 24 + 24)
        .map((item, index) => (
          <div
            style={{
              background: handlePrecipStyle(item),
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

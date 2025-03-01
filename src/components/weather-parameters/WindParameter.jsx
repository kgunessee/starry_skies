import React from "react";

export default function WindParameter({
  windSpeed,
  windDirection,
  windGusts,
  dayIndex,
  gridItemStyling,
  mphToKph,
}) {
  const handleWindStyle = (clouds, index) => {
    if (clouds[index] < 30) {
      return "#17182b";
    } else if (clouds[index] > 30 && clouds[index] < 60) {
      return "#a4c423";
    } else return "#b50526";
  };

  return (
    <>
      <div className="mb-1 flex gap-1">
        {windSpeed
          .slice(dayIndex * 24, dayIndex * 24 + 24)
          .map((item, index) => (
            <div
              style={{}}
              key={`grid-item-${index}`}
              className={`${gridItemStyling}`}
            >
              <div key={index} className={``}>
                {mphToKph(item)}
              </div>
            </div>
          ))}
      </div>
      <div className="mb-1 flex gap-1">
        {windDirection
          .slice(dayIndex * 24, dayIndex * 24 + 24)
          .map((item, index) => (
            <div
              style={{}}
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
        {windGusts
          .slice(dayIndex * 24, dayIndex * 24 + 24)
          .map((item, index) => (
            <div
              style={{}}
              key={`grid-item-${index}`}
              className={`${gridItemStyling}`}
            >
              <div key={index} className={``}>
                {mphToKph(item)}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

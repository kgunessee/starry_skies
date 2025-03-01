import React from "react";

export default function CloudParameter({ clouds, dayIndex, gridItemStyling }) {
  return (
    <div className="mb-1 flex gap-1">
      {clouds.slice(dayIndex * 24, dayIndex * 24 + 24).map((item, index) => (
        <div key={`grid-item-${index}`} className={`${gridItemStyling}`}>
          <div
            style={{ opacity: item / 100 }}
            className={`absolute h-full w-full rounded-sm bg-white`}
          ></div>
          <div
            key={index}
            className={`z-10 ${item < 50 ? "text-white" : "text-black"}`}
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  );
}

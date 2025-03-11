import React from "react";

export default function ToggleSwitch({
  toggleUnit,
  leftUnit,
  rightUnit,
  isToggled,
}) {
  return (
    <div className={`flex items-center gap-2`}>
      <p>{leftUnit}</p>
      <div
        onClick={() => {
          toggleUnit();
        }}
        className={`bg-primaryText relative h-8 w-16 rounded-full hover:cursor-pointer`}
      >
        <input type={"button"} />
        <div
          className={`bg-buttonBlue absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full transition-transform duration-150 ${isToggled ? "right-1" : "left-1"}`}
        ></div>
      </div>
      <p>{rightUnit}</p>
    </div>
  );
}

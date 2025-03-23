import React from "react";

export default function ToggleSwitch({
  toggleUnit,
  unit1,
  unit2,
  isToggled,
  label,
}) {
  return (
    <div className={`flex flex-col gap-2`}>
      <label className={`text-sm`}>{label}</label>
      <button
        onClick={() => {
          toggleUnit();
        }}
        className={`bg-accentBlue cursor-pointer items-center gap-2 rounded p-2`}
      >
        {isToggled ? unit2 : unit1}
      </button>
    </div>
  );
}

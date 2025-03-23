import React from "react";

export default function ToggleSwitch({
  toggleUnit = null,
  unit1,
  unit2,
  isToggled,
  label,
  isMobile,
}) {
  const mobileBtnStyling =
    "bg-accentBlue hover:bg-accentBlue/80 active:bg-accentBlue/60 w-24 cursor-pointer items-center gap-2 rounded p-2";
  const mobileDivStyling = "flex flex-col items-center gap-2";

  const desktopBtnStyling =
    "bg-accentBlue hover:bg-accentBlue/80 active:bg-accentBlue/60 w-16 cursor-pointer items-center gap-2 rounded p-1";
  const desktopDivStyling = "flex items-center gap-2";

  return (
    <div className={isMobile ? mobileDivStyling : desktopDivStyling}>
      <label className={`text-right text-sm`}>{label}</label>
      <button
        onClick={() => {
          toggleUnit();
        }}
        className={isMobile ? mobileBtnStyling : desktopBtnStyling}
      >
        {isToggled ? unit2 : unit1}
      </button>
    </div>
  );
}

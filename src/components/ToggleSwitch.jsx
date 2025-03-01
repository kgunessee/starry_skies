import React from "react";

export default function ToggleSwitch({ toggleSpeedUnit }) {
  return (
    <button
      onClick={() => {
        toggleSpeedUnit();
      }}
      className={``}
    >
      Click
    </button>
  );
}

import React from "react";

export default function ToggleSwitch({ toggleUnit }) {
  return (
    <button
      onClick={() => {
        toggleUnit();
      }}
      className={``}
    >
      Click
    </button>
  );
}

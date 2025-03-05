import ToggleSwitch from "./ToggleSwitch.jsx";

export default function MobileMenu({ toggleSpeedUnit, toggleTempUnit }) {
  return (
    <menu className={`absolute top-0 z-20 h-20 w-screen bg-red-300`}>
      <ToggleSwitch toggleUnit={toggleSpeedUnit} />
      <ToggleSwitch toggleUnit={toggleTempUnit} />

    </menu>
  );
}

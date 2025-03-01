import ToggleSwitch from "./ToggleSwitch.jsx";

export default function MobileMenu({ toggleSpeedUnit }) {
  return (
    <menu className={`absolute top-0 z-20 h-20 w-screen bg-red-300`}>
      <ToggleSwitch toggleSpeedUnit={toggleSpeedUnit} />
    </menu>
  );
}

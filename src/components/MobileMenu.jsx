import ToggleSwitch from "./ToggleSwitch.jsx";
import { motion } from "motion/react";

export default function MobileMenu({
  toggleSpeedUnit,
  toggleTempUnit,
  isMobileMenuOpen,
  isFahrenheit,
  isKPH,
  handleWeatherModel,
}) {
  return (
    <motion.menu
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: "-0%", opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "tween", duration: 0.2 }}
      className={`${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"} absolute bottom-0 z-20 h-[30vh] w-screen p-2`}
    >
      <div
        className={`bg-background flex h-full w-full flex-col items-end gap-4 rounded-xl p-4 backdrop-blur`}
      >
        <ToggleSwitch
          toggleUnit={toggleSpeedUnit}
          leftUnit={"MPH"}
          rightUnit={"KPH"}
          isToggled={isKPH}
        />
        <ToggleSwitch
          toggleUnit={toggleTempUnit}
          leftUnit={"C"}
          rightUnit={"F"}
          isToggled={isFahrenheit}
        />

        <div>
          <h3>Select Weather Model</h3>
          <label htmlFor={"ukmo"}>UKMO (UK Met Office)</label>
          <input
            type={"radio"}
            checked={true}
            id={"ukmo"}
            name={"weather-model"}
            value={"ukmo_seamless"}
            onClick={(e) => handleWeatherModel(e.target.value)}
          />
          <label htmlFor={"ecmwf"}>ECMWF (Europe)</label>
          <input
            type={"radio"}
            id={"ecmwf"}
            name={"weather-model"}
            value={"ecmwf_ifs025"}
            onClick={(e) => handleWeatherModel(e.target.value)}
          />
        </div>
      </div>
    </motion.menu>
  );
}

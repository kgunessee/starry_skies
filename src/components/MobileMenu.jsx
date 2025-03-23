import ToggleSwitch from "./ToggleSwitch.jsx";
import { motion } from "motion/react";

export default function MobileMenu({
  toggleSpeedUnit,
  toggleTempUnit,
  isMobileMenuOpen,
  isFahrenheit,
  isKPH,
}) {
  return (
    <motion.menu
      style={{ overflow: "hidden" }}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ type: "tween", duration: 0.1 }}
      className={`${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"} bg-card-background/40 z-20 mx-2 mb-2 h-auto rounded-md p-2`}
    >
      <div
        className={`grid h-full w-full grid-cols-4 items-end gap-6 p-4 backdrop-blur`}
      >
        <ToggleSwitch
          toggleUnit={toggleSpeedUnit}
          unit1={"MPH"}
          unit2={"KPH"}
          isToggled={isKPH}
          label={"MPH / KPH"}
        />
        <ToggleSwitch
          toggleUnit={toggleTempUnit}
          unit1={"°C"}
          unit2={"°F"}
          isToggled={isFahrenheit}
          label={"°C / °F"}
        />
      </div>
    </motion.menu>
  );
}

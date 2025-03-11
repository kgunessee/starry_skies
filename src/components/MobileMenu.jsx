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
      </div>
    </motion.menu>
  );
}

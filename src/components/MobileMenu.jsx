import ToggleSwitch from "./ToggleSwitch.jsx";
import { motion } from "motion/react";

export default function MobileMenu({
  toggleSpeedUnit,
  toggleTempUnit,
  isMobileMenuOpen,
  isFahrenheit,
  isKPH,
  redLight,
  toggleRedLight,
  handleToggleMenu,
  isMobile,
}) {
  return (
    <motion.menu
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ type: "tween", duration: 0.1 }}
      className={`${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"} bg-background fixed bottom-0 z-20 h-auto w-full overflow-y-scroll rounded-tl-md rounded-tr-md px-4 py-2`}
    >
      <div className={`flex items-baseline justify-between`}>
        <h2 className={`text-xl font-semibold`}>Settings</h2>
        <button
          className="z-[999] flex h-8 w-8 flex-col justify-center space-y-1 transition-all duration-300 hover:cursor-pointer focus:outline-none"
          aria-label="Toggle Menu"
          onClick={handleToggleMenu}
        >
          <span
            className={`block h-0.5 w-8 rotate-45 bg-white transition-transform duration-300`}
          ></span>
          <span
            className={`block h-0.5 w-8 -translate-y-1.25 -rotate-45 bg-white transition-transform duration-300`}
          ></span>
        </button>
      </div>

      <div className={`flex h-full w-full justify-center gap-6 p-4`}>
        <ToggleSwitch
          toggleUnit={toggleSpeedUnit}
          unit1={"MPH"}
          unit2={"KPH"}
          isToggled={isKPH}
          label={"MPH / KPH"}
          isMobile={isMobile}
        />
        <ToggleSwitch
          toggleUnit={toggleTempUnit}
          unit1={"°C"}
          unit2={"°F"}
          isToggled={isFahrenheit}
          label={"°C / °F"}
          isMobile={isMobile}
        />
        <ToggleSwitch
          toggleUnit={toggleRedLight}
          unit1={"On"}
          unit2={"Off"}
          isToggled={redLight}
          label={"Red Light Filter"}
          isMobile={isMobile}
        />
      </div>
      <p className={`opacity-20`}>V1.0 23/03/2025</p>
    </motion.menu>
  );
}

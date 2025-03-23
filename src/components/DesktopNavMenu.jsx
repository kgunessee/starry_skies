import ToggleSwitch from "./ToggleSwitch.jsx";

export default function DesktopNavMenu({
  toggleRedLight,
  redLight,
  isFahrenheit,
  isKPH,
  toggleTempUnit,
  toggleSpeedUnit,
  isMobile,
}) {
  return (
    <div className={`flex h-full w-full justify-end gap-6 p-4`}>
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
  );
}

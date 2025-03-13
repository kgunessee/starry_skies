import { roundHour } from "../conversionFunctions.js";
import { selectMoonPhaseIcon } from "../selectMoonIconFunction.js";

const displayMoonSymbol = (value, moonData, moonPhaseIcon) => {
  if (!moonData || !moonData.moonrise || !moonData.moonset) {
    return value; // Or a default value if data is missing
  }

  const roundedMoonrise = roundHour(moonData.moonrise, moonData);
  const roundedMoonset = roundHour(moonData.moonset, moonData);

  if (roundedMoonrise < roundedMoonset) {
    // Standard case: moonrise before moonset
    if (value >= roundedMoonrise && value <= roundedMoonset) {
      return moonPhaseIcon; // Moon is up
    } else {
      return ""; // Moon is down
    }
  } else {
    // Moonset before moonrise (moon up overnight)
    if (value >= roundedMoonrise || value <= roundedMoonset) {
      return moonPhaseIcon; // Moon is up
    } else {
      return ""; // Moon is down
    }
  }
};

export default function MoonParameter({
  time,
  dayIndex,
  gridItemStyling,
  moonData,
}) {
  const moonPhaseIcon =
    moonData && moonData.moonPhase
      ? selectMoonPhaseIcon(moonData.moonPhase, 20, 20)
      : null;

  return (
    <div className="mb-1 flex gap-1">
      {time.slice(dayIndex * 24, dayIndex * 24 + 24).map((item, index) => (
        <div
          key={`grid-item-${index}`}
          className={`${gridItemStyling} bg-accentBlue/20`}
        >
          <div key={index} className={`text-white`}>
            {moonData && displayMoonSymbol(item, moonData, moonPhaseIcon)}
          </div>
        </div>
      ))}
    </div>
  );
}

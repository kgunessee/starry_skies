import { roundHour } from "../conversionFunctions.js";
import { moonIcon } from "../SVGIcons.jsx";
import { selectMoonPhaseIcon } from "../selectMoonIconFunction.js";

const displayMoonSymbol = (value, moonData) => {
  if (!moonData || !moonData.moonrise || !moonData.moonset) {
    return value; // Or a default value if data is missing
  }

  const roundedMoonrise = roundHour(moonData.moonrise, moonData);
  const roundedMoonset = roundHour(moonData.moonset, moonData);
  const moonPhaseIcon = selectMoonPhaseIcon(moonData.moonPhase, 20, 20);

  // if (roundedMoonrise < roundedMoonset) {
  //   // Standard case: moonrise before moonset
  //   if (value >= roundedMoonrise && value <= roundedMoonset) {
  //     return moonPhaseIcon; // Moon is up
  //   } else {
  //     return ""; // Moon is down
  //   }
  // } else {
  //   // Moonset before moonrise (moon up overnight)
  //   if (value >= roundedMoonrise || value <= roundedMoonset) {
  //     return moonPhaseIcon; // Moon is up
  //   } else {
  //     return ""; // Moon is down
  //   }
  // }

  if (roundedMoonrise < roundedMoonset) {
    // Standard case: moonrise before moonset
    if (value >= roundedMoonrise && value <= roundedMoonset) {
      return moonIcon; // Moon is up
    } else {
      return ""; // Moon is down
    }
  } else {
    // Moonset before moonrise (moon up overnight)
    if (value >= roundedMoonrise || value <= roundedMoonset) {
      return moonIcon; // Moon is up
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
  return (
    <div className="mb-1 flex gap-1">
      {time.slice(dayIndex * 24, dayIndex * 24 + 24).map((item, index) => (
        <div
          key={`grid-item-${index}`}
          className={`${gridItemStyling} bg-accentBlue/20`}
        >
          <div key={index} className={`text-white`}>
            {moonData && displayMoonSymbol(item, moonData)}
          </div>
        </div>
      ))}
    </div>
  );
}

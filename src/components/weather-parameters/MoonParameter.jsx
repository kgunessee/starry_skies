import { roundHour } from "../unitConversionFunctions.js";

const displayMoonSymbol = (value, moonData) => {
  if (!moonData || !moonData.moonrise || !moonData.moonset) {
    return value; // Or a default value if data is missing
  }

  const roundedMoonrise = roundHour(moonData.moonrise, moonData);
  const roundedMoonset = roundHour(moonData.moonset, moonData);

  if (roundedMoonrise < roundedMoonset) {
    // Standard case: moonrise before moonset
    if (value >= roundedMoonrise && value <= roundedMoonset) {
      return "up"; // Moon is up
    } else {
      return "down"; // Moon is down
    }
  } else {
    // Moonset before moonrise (moon up overnight)
    if (value >= roundedMoonrise || value <= roundedMoonset) {
      return "up"; // Moon is up
    } else {
      return "down"; // Moon is down
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
        <div key={`grid-item-${index}`} className={`${gridItemStyling}`}>
          <div key={index} className={`text-white`}>
            {moonData && displayMoonSymbol(item, moonData)}
          </div>
        </div>
      ))}
    </div>
  );
}

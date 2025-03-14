import { useState, useEffect } from "react";
import { unixToTime, roundHour } from "../conversionFunctions.js";
import {selectMoonPhaseIcon} from "../selectMoonIconFunction.js";

export default function MoonParameter({
  time,
  gridItemStyling,
  moonData,
  dayIndex,
}) {
  const [dailyMoon, setDailyMoon] = useState([]);

  useEffect(() => {
    if (moonData && moonData.daily) {
      const newMoonData = [];
      for (let i = 0; i < 7; i++) {
        newMoonData.push({
          moonrise: roundHour(unixToTime(moonData.daily[i].moonrise)),
          moonset: roundHour(unixToTime(moonData.daily[i].moonset)),
          moonPhase: moonData.daily[i].moon_phase
        });
      }
      setDailyMoon(newMoonData);
    }
  }, [moonData]);

  useEffect(() => {
    console.log(dailyMoon);
  }, [dailyMoon]); //changed dependancy array.

  const moonVisable = (time, i) => {
    const {moonrise, moonset, moonPhase} = dailyMoon[i]
    if (dailyMoon && moonrise < moonset) {
      // Standard case: moonrise before moonset
      if (time >= moonrise && time <= moonset) {
        return selectMoonPhaseIcon(moonPhase, 20, 20); // Moon is up
      } else {
        return ""; // Moon is down
      }
    } else {
      // Moonset before moonrise (moon up overnight)
      if (time >= moonrise || time <= moonset) {
        return selectMoonPhaseIcon(moonPhase, 20, 20); // Moon is up
      } else {
        return ""; // Moon is down
      }
    }
  };


  return (
    <div className="mb-1 flex gap-1">
      {time.slice(dayIndex * 24, dayIndex * 24 + 24).map((item, index) => (
        <div key={`grid-item-${index}`} className={`${gridItemStyling} bg-white/5`}>
          <div key={index} className={`text-gray-50`}>
            {dailyMoon[dayIndex] && moonVisable(item, dayIndex)}
          </div>
        </div>
      ))}
    </div>
  );
}

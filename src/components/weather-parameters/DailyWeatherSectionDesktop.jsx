import {
  moonPhaseName,
  selectMoonPhaseIcon,
} from "../selectMoonIconFunction.js";
import { caretDownFill, caretUpFill } from "../SVGIcons.jsx";
import { unixToTime } from "../conversionFunctions.js";

export default function DailyWeatherSectionDesktop({
  writtenDay,
  moonData,
  dayIndex,
  day,
}) {
  return (
    <div className="z-50 mb-2 flex h-18 w-auto items-center gap-4 overflow-y-scroll rounded-md bg-white/10 p-2 text-lg shadow-lg">
      <div className={``}>
        <p
          title={"Day of the week"}
          className={`text-sm font-light`}
          aria-label={"Day of the week"}
        >
          {writtenDay(dayIndex)}
        </p>
        <p
          className={`font-semibold`}
          aria-label={"Date in DD/MM/YYYY format"}
          title={"Date in DD/MM/YYYY format"}
        >
          {day || "Loading..."}
        </p>
      </div>
      <div className={`flex items-center gap-2`}>
        <p>
          {selectMoonPhaseIcon(moonData.daily[dayIndex].moon_phase, 40, 40)}
        </p>
        <div>
          <p className={`font-semibold`} title={"Moon Phase"}>
            {moonPhaseName(moonData.daily[dayIndex].moon_phase)}
          </p>
          <div className={`flex gap-2`}>
            <p
              title={"Time of Moonrise"}
              className={`-ml-0.5 flex items-center text-sm font-light`}
            >
              <span>{caretUpFill}</span>
              {unixToTime(moonData.daily[dayIndex].moonrise)}
            </p>
            <p
              title={"Time of Moonset"}
              className={`-ml-0.5 flex items-center text-sm font-light`}
            >
              <span>{caretDownFill}</span>
              {unixToTime(moonData.daily[dayIndex].moonset)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

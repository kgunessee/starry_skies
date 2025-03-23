import {
  moonPhaseName,
  selectMoonPhaseIcon,
} from "../selectMoonIconFunction.js";
import { caretDownFill, caretUpFill } from "../SVGIcons.jsx";

export default function DailyWeatherSectionMobile({
  dailyMoonData,
  currentDate,
  writtenDayString,
}) {
  return (
    <div className="z-50 mx-2 mb-2 flex w-auto gap-2 overflow-y-scroll rounded-md bg-white/10 p-2 text-lg shadow-lg">
      <div className={`w-1/3`}>
        <p
          title={"Day of the week"}
          className={`text-sm font-light`}
          aria-label={"Day of the week"}
        >
          {writtenDayString}
        </p>
        <p
          className={`font-semibold`}
          aria-label={"Date in DD/MM/YYYY format"}
          title={"Date in DD/MM/YYYY format"}
        >
          {currentDate || "Loading..."}
        </p>
      </div>
      <div className={`flex items-center gap-2`}>
        <p>{selectMoonPhaseIcon(dailyMoonData.moonPhase, 40, 40)}</p>
        <div>
          <p className={`font-semibold`} title={"Moon Phase"}>
            {moonPhaseName(dailyMoonData.moonPhase)}
          </p>
          <div className={`flex gap-2`}>
            <p
              title={"Time of Moonrise"}
              className={`-ml-0.5 flex items-center text-sm font-light`}
            >
              <span>{caretUpFill}</span>
              {dailyMoonData.moonrise}
            </p>
            <p
              title={"Time of Moonset"}
              className={`-ml-0.5 flex items-center text-sm font-light`}
            >
              <span>{caretDownFill}</span>
              {dailyMoonData.moonset}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  fullMoon,
  newMoon,
  waningCrescent3,
  waningCrescent1,
  waningGibbous1,
  waningCrescent2,
  waningGibbous2,
  waningGibbous3,
  waxingCrescent1,
  waxingCrescent2,
  waxingGibbous1,
  waxingGibbous2,
  waxingCrescent3,
  waxingGibbous3,
  thirdQuarter,
  firstQuarter,
} from "./moonIcons.jsx";

export const selectMoonPhaseIcon = (moonPhase, height, width) => {
  if (moonPhase >= 0.05 && moonPhase <= 0.09) {
    return waxingCrescent1(height, width);
  } else if (moonPhase >= 0.1 && moonPhase <= 0.14) {
    return waxingCrescent2(height, width);
  } else if (moonPhase >= 0.15 && moonPhase <= 0.19) {
    return waxingCrescent3(height, width);
  } else if (moonPhase >= 0.2 && moonPhase <= 0.29) {
    return firstQuarter(height, width);
  } else if (moonPhase >= 0.3 && moonPhase <= 0.35) {
    return waxingGibbous1(height, width);
  } else if (moonPhase >= 0.36 && moonPhase <= 0.39) {
    return waxingGibbous2(height, width);
  } else if (moonPhase >= 0.4 && moonPhase <= 0.44) {
    return waxingGibbous3(height, width);
  } else if (moonPhase >= 0.45 && moonPhase <= 0.54) {
    return fullMoon(height, width);
  } else if (moonPhase >= 0.55 && moonPhase <= 0.57) {
    return waningGibbous3(height, width);
  } else if (moonPhase >= 0.58 && moonPhase <= 0.6) {
    return waningGibbous2(height, width);
  } else if (moonPhase >= 0.61 && moonPhase <= 0.64) {
    return waningGibbous1(height, width);
  } else if (moonPhase >= 0.65 && moonPhase <= 0.74) {
    return thirdQuarter(height, width);
  } else if (moonPhase >= 0.75 && moonPhase <= 0.77) {
    return waningCrescent3(height, width);
  } else if (moonPhase >= 0.78 && moonPhase <= 0.8) {
    return waningCrescent2(height, width);
  } else if (moonPhase >= 0.81 && moonPhase <= 0.84) {
    return waningCrescent1(height, width);
  } else {
    return newMoon(height, width);
  }
};

export const moonPhaseName = (moonPhase) => {
  if (moonPhase >= 0.05 && moonPhase <= 0.19) {
    return "Waxing Crescent";
  } else if (moonPhase >= 0.2 && moonPhase <= 0.29) {
    return "First Quarter";
  } else if (moonPhase >= 0.3 && moonPhase <= 0.44) {
    return "Waxing Gibbous";
  } else if (moonPhase >= 0.45 && moonPhase <= 0.54) {
    return "Full Moon";
  } else if (moonPhase >= 0.55 && moonPhase <= 0.64) {
    return "Waning Gibbous";
  } else if (moonPhase >= 0.65 && moonPhase <= 0.74) {
    return "Third Quarter";
  } else if (moonPhase >= 0.75 && moonPhase <= 0.84) {
    return "Waning Crescent";
  } else {
    return "New Moon";
  }
};

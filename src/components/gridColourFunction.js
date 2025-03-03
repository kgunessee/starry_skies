export function gridColourFunction(value, param1, param2, param3 = null) {
  if (value < param1) {
    return "#7ec754";
  } else if (value >= param1 && value <= param2) {
    return "#cf7821";
  } else return "#c4122f";
}

export function gridColourFunction(value, param1, param2, param3 = null) {
  if (value < param1) {
    return "#48DF6B";
  } else if (value >= param1 && value <= param2) {
    return "#EAC94A";
  } else return "#E57373";
}

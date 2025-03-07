export const timeToHour = (timeInput) => {
  if (Array.isArray(timeInput)) {
    return timeInput.map((t) => {
      return new Date(t).getHours();
    });
  } else if (typeof timeInput === "string") {
    return new Date(timeInput).getHours();
  } else {
    return null; // Handle invalid input
  }
};

export const dateToTime = (date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const unixToTime = (unixValue) => {
  const date = new Date(unixValue * 1000); // Multiply by 1000 to convert seconds to milliseconds
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const handleMphToKph = (miles, isKPH) => {
  if (isKPH) {
    return (miles * 1.60934).toFixed(1);
  } else {
    return miles.toFixed(1);
  }
};

export const handleCelciusToFarenheit = (celcius, isFarenheit) => {
  if (isFarenheit) {
    return ((celcius * 9) / 2 + 32).toFixed(0);
  } else return celcius;
};

export const roundHour = (timeString, checkWeatherIsNull) => {
  if (timeString && checkWeatherIsNull) {
    const [hour, minute] = timeString.split(":").map(Number);
    return minute >= 30 ? hour + 1 : hour;
  }
};

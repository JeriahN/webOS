// Date Functions
function getDate(useFullDayMonthNames) {
  const now = new Date();
  const day = now.getDate();
  const weekday = now.toLocaleString("default", { weekday: "long" });

  const month = now.toLocaleString("default", { month: "long" });

  const shortenedWeekday = now.toLocaleString("default", { weekday: "short" });
  const shortenedMonth = now.toLocaleString("default", { month: "short" });

  if (useFullDayMonthNames) {
    return `${weekday} ${month} ${day}`;
  } else {
    return `${shortenedWeekday} ${shortenedMonth} ${day}`;
  }
}

// Time Functions
function getCurrentTime(use24HourFormat, useSeconds, useFlashingColon) {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  let seconds = "";
  const flashingColon = useFlashingColon
    ? now.getSeconds() % 2
      ? ":"
      : " "
    : ":";

  if (useSeconds) {
    seconds = now.getSeconds().toString().padStart(2, "0");
  }

  if (!use24HourFormat) {
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}${flashingColon}${minutes}${
      seconds ? flashingColon + seconds : ""
    } ${ampm}`;
  }

  return `${hours}${flashingColon}${minutes}${
    seconds ? flashingColon + seconds : ""
  }`;
}

console.log(getCurrentTime(false, false));

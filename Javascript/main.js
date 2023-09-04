const desktop = $("#desktop");
const menubar = $("#menubar");
const taskbar = $("#taskbar");
const menubarDate = $(".date");
const menubarTime = $(".time");
let useFullDayMonthNames = false;
let use24HourFormat = false;
let useSeconds = false;
let useFlashingColon = true;

// Theme Mode Functions
function handleColorSchemeChange(event) {
  const theme = event.matches ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
}

const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
handleColorSchemeChange(prefersDarkMode);

prefersDarkMode.addListener(handleColorSchemeChange);

// UI Functions
function toggleMenubar() {
  menubar.toggleClass("hidden");
}

function toggleTaskbar() {
  taskbar.toggleClass("hidden");
}

function toggleDesktop() {
  desktop.toggleClass("hidden");
}

function updateUI() {
  menubarDate.text(getDate());
  menubarTime.text(
    getCurrentTime(use24HourFormat, useSeconds, useFlashingColon)
  );
}

setInterval(() => {
  // Code executed every second
  updateUI();
}, 500);

setInterval(() => {
  // Code executed every minute
}, 60000);

updateUI();

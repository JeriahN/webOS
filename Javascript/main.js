const desktop = $("#desktop");
const menubar = $("#menubar");
const taskbar = $("#taskbar");
const platform = navigator.platform.toLowerCase();
const userAgent = navigator.userAgent.toLowerCase();

// Function to handle color scheme changes
function handleColorSchemeChange(event) {
  const theme = event.matches ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
}

// Check the initial color scheme preference
const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
handleColorSchemeChange(prefersDarkMode);

// Listen for changes in color scheme preference
prefersDarkMode.addListener(handleColorSchemeChange);

function getCurrentTime(use24HourFormat, useSeconds) {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  let seconds = "";

  if (useSeconds) {
    seconds = now.getSeconds().toString().padStart(2, "0");
  }

  if (!use24HourFormat) {
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes}${seconds ? ":" + seconds : ""} ${ampm}`;
  }

  return `${hours}:${minutes}${seconds ? ":" + seconds : ""}`;
}

console.log(getCurrentTime(false, false));

setInterval(() => {
  // Code executed every second
  $(".time").text(getCurrentTime(false));
}, 1000);

setInterval(() => {
  // Code executed every minute
  console.log("Executed every minute");
}, 60000);

// Create new key in localStorage
function createLocalStorageFile(
  name,
  content,
  type,
  path,
  dateModified,
  dateCreated,
  overwriteIfExists
) {
  // Check if file with same name already exists and check if file path is also the same, if the paths match, overwrite the file if overwriteIfExists is true
  if (localStorage.getItem(name) && localStorage.getItem(name).path === path) {
    if (overwriteIfExists) {
      localStorage.setItem(
        name,
        JSON.stringify({
          name,
          content,
          type,
          path,
          dateModified,
          dateCreated,
        })
      );
    } else {
      throw new Error("File already exists");
    }
  }

  // Create new file
  localStorage.setItem(
    name,
    JSON.stringify({
      name,
      content,
      type,
      path,
      dateModified,
      dateCreated,
    })
  );
}

// Modify existing key in localStorage
function modifyLocalStorageFile(name, content, dateModified) {
  // Check if file exists
  if (!localStorage.getItem(name)) {
    throw new Error("File does not exist");
  }

  // Modify file
  localStorage.setItem(
    name,
    JSON.stringify({
      ...JSON.parse(localStorage.getItem(name)),
      content,
      dateModified,
    })
  );
}

// Delete key in localStorage
function deleteLocalStorageFile(name) {
  // Check if file exists
  if (!localStorage.getItem(name)) {
    throw new Error("File does not exist");
  }

  // Delete file
  localStorage.removeItem(name);
}

// Get key in localStorage
function getLocalStorageFile(name) {
  // Check if file exists
  if (!localStorage.getItem(name)) {
    throw new Error("File does not exist");
  }

  // Get file
  return JSON.parse(localStorage.getItem(name));
}

// Get all keys in localStorage
function getAllLocalStorageFiles(sortBy, filterBy) {
  // Get all files
  const files = [];

  for (let i = 0; i < localStorage.length; i++) {
    files.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }

  // Sort files
  if (sortBy) {
    files.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }

      if (a[sortBy] > b[sortBy]) {
        return 1;
      }

      return 0;
    });
  }

  // Filter files
  if (filterBy) {
    return files.filter((file) => file[filterBy]);
  }

  return files;
}

// Get all keys in localStorage with a specific path
function getAllLocalStorageFilesInPath(path) {
  // Get all files
  const files = [];

  for (let i = 0; i < localStorage.length; i++) {
    if (JSON.parse(localStorage.getItem(localStorage.key(i))).path === path) {
      files.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
  }

  return files;
}

/*
Example FS Usage
createLocalStorageFile(
  "test.txt",
  "Hello World",
  "text",
  "/",
  new Date(),
  new Date(),
  true
);
*/

// modifyLocalStorageFile("test.txt", "Hello World 2", new Date());

// deleteLocalStorageFile("test.txt");

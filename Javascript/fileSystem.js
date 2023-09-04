// Initialize Dexie database
const db = new Dexie("FileSystemDB");
db.version(1).stores({
  files: "name,path,content,type,dateModified,dateCreated",
});

// Create new key in Dexie database
async function createDexieFile(
  name,
  content,
  type,
  path,
  dateModified,
  dateCreated,
  overwriteIfExists
) {
  try {
    const existingFile = await db.files.get({ name });

    if (existingFile && existingFile.path === path) {
      if (overwriteIfExists) {
        await db.files.delete(name);
      } else {
        throw new Error("File already exists");
      }
    }

    await db.files.put({
      name,
      content,
      type,
      path,
      dateModified,
      dateCreated,
    });
  } catch (error) {
    console.error("Error creating file:", error);
    throw error;
  }
}

// Modify existing key in Dexie database
async function modifyDexieFile(name, content, dateModified) {
  try {
    const existingFile = await db.files.get({ name });

    if (!existingFile) {
      throw new Error("File does not exist");
    }

    await db.files.update(name, {
      content,
      dateModified,
    });
  } catch (error) {
    console.error("Error modifying file:", error);
    throw error;
  }
}

// Delete key in Dexie database
async function deleteDexieFile(name) {
  try {
    const existingFile = await db.files.get({ name });

    if (!existingFile) {
      throw new Error("File does not exist");
    }

    await db.files.delete(name);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}

// Get key in Dexie database
async function getDexieFile(name) {
  try {
    const file = await db.files.get({ name });

    if (!file) {
      throw new Error("File does not exist");
    }

    return file;
  } catch (error) {
    console.error("Error getting file:", error);
    throw error;
  }
}

// Get all keys in Dexie database
async function getAllDexieFiles(sortBy, filterBy) {
  try {
    let files = await db.files.toArray();

    if (sortBy) {
      files = files.sort((a, b) => a[sortBy] - b[sortBy]);
    }

    if (filterBy) {
      return files.filter((file) => file[filterBy]);
    }

    return files;
  } catch (error) {
    console.error("Error getting all files:", error);
    throw error;
  }
}

// Get all keys in Dexie database with a specific path
async function getAllDexieFilesInPath(path) {
  try {
    const files = await db.files.where({ path }).toArray();
    return files;
  } catch (error) {
    console.error("Error getting files in path:", error);
    throw error;
  }
}

// Example usage
(async () => {
  try {
    await createDexieFile(
      "test.txt",
      "Hello World",
      "text",
      "/",
      new Date(),
      new Date(),
      true
    );

    console.log(await getDexieFile("test.txt"));

    await modifyDexieFile("test.txt", "Hello World 2", new Date());

    console.log(await getDexieFile("test.txt"));

    await deleteDexieFile("test.txt");

    console.log(await getDexieFile("test.txt"));
  } catch (error) {
    console.error("Error in file system usage:", error);
  }
})();

// Resetting Functions
// Reset Dexie Database
async function resetDexie() {
  try {
    await Dexie.delete("FileSystemDB");
    console.log("Dexie database reset.");
  } catch (error) {
    console.error("Error resetting Dexie database:", error);
  }
}

// Reset Local Storage
function resetLocalStorage() {
  try {
    localStorage.clear();
    console.log("Local Storage cleared.");
  } catch (error) {
    console.error("Error clearing Local Storage:", error);
  }
}

// Reset Cookies (Note: This won't delete cookies set by third-party services)
function resetCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
  }

  console.log("Cookies cleared.");
}

// Reset Everything
function factoryReset() {
  // Create confirmation dialog
  const confirmation = confirm(
    "Are you sure you want to reset everything? This will delete all files and settings."
  );

  if (confirmation) {
    // Create extra confirmation dialog
    const extraConfirmation = confirm(
      "Are you really sure you want to reset everything? This will delete all files and settings."
    );

    if (extraConfirmation) {
      resetDexie();
      resetLocalStorage();
      resetCookies();
      location.reload();
    }
  }

  return;
}

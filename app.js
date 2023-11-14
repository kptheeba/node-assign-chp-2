const fs = require("fs");
const yargs = require("yargs");

// Function to write 'You are awesome' to a file
const writeToFile = (filename) => {
  const content = "You are awesome\n";
  fs.writeFileSync(filename, content);
  console.log(`File "${filename}" created with content: "${content.trim()}"`);
};

// Function to handle file creation and writing
const createAndWriteFile = (filename) => {
  // Check if the file already exists
  if (fs.existsSync(filename)) {
    console.log(`File "${filename}" already exists.`);
    return false;
  }

  // Create a new file and write content
  writeToFile(filename);

  return true;
};

// Function to read filenames from a text file
const readFilenamesFromFile = (filename) => {
  try {
    const data = fs.readFileSync(filename, "utf8");
    return JSON.parse(data) || [];
  } catch (error) {
    return [];
  }
};

// Function to save filenames to a text file
const saveFilenamesToFile = (filename, filenames) => {
  fs.writeFileSync(filename, JSON.stringify(filenames));
};

// Command-line interface using yargs
yargs.command({
  command: "write",
  describe: "Write to a new file",
  handler: (argv) => {
    const { filename } = argv;
    const filenames = readFilenamesFromFile("filenames.txt");

    // Check if the filename already exists
    if (filenames.includes(filename)) {
      console.log(
        `Filename "${filename}" already exists. Please choose a new filename.`
      );
    } else {
      // Save the new filename to the array and text file
      filenames.push(filename);
      saveFilenamesToFile("filenames.txt", filenames);

      // Create and write to the new file
      createAndWriteFile(filename);
    }
  },
  builder: {
    filename: {
      describe: "Specify the filename",
      demandOption: true,
      type: "string",
    },
  },
}).argv;

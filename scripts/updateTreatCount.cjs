const fs = require('fs');
const path = require('path');

// Path to the config.js file
const configFilePath = path.join(__dirname, '../src/lib/config.js');

// New value for TREATS_AVAILABLE passed as a command line argument
const newTreatCount = process.argv[2];

if (!newTreatCount || isNaN(Number(newTreatCount))) {
  console.error('Please provide a valid number as an argument.');
  process.exit(1);
}

// Read the current content of config.js
fs.readFile(configFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading ${configFilePath}:`, err);
    process.exit(1);
  }

  // Replace the TREATS_AVAILABLE value with the new value
  const updatedData = data.replace(/(TREATS_AVAILABLE\s*=\s*)\d+/, `$1${newTreatCount}`);

  // Write the updated content back to config.js
  fs.writeFile(configFilePath, updatedData, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing to ${configFilePath}:`, err);
      process.exit(1);
    }

    console.log(`TREATS_AVAILABLE updated to ${newTreatCount}`);
  });
});
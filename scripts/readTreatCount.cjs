const fs = require('fs');
const path = require('path');

// Path to the config.js file
const configFilePath = path.join(__dirname, '../src/lib/config.js');

// Read the current content of config.js
fs.readFile(configFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading ${configFilePath}:`, err);
    return;
  }

  // Use a regular expression to extract the value of TREATS_AVAILABLE
  const match = data.match(/TREATS_AVAILABLE\s*=\s*(\d+)/);

  if (match && match[1]) {
    console.log(`Current TREATS_AVAILABLE: ${match[1]}`);
  } else {
    console.error('TREATS_AVAILABLE value not found.');
  }
});

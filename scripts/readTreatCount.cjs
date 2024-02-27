const fs = require('fs');
const path = require('path');

// Path to the config.ts file
const configFilePath = path.join(__dirname, '../src/lib/config.ts');

// Read the current content of config.ts
fs.readFile(configFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading ${configFilePath}:`, err);
    return;
  }

  // Use a regular expression to extract the value of TREAT_COUNT
  const match = data.match(/TREAT_COUNT\s*=\s*(\d+)/);

  if (match && match[1]) {
    console.log(`Current TREAT_COUNT: ${match[1]}`);
  } else {
    console.error('TREAT_COUNT value not found.');
  }
});

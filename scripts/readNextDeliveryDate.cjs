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

  // Adjust the regular expression to match the new Date format
  const match = data.match(/NEXT_DELIVERY_DATE\s*=\s*new Date\((\d+),\s*(\d+),\s*(\d+)\)/);

  if (match && match.length === 4) {
    // Adjusting the month for display (adding 1 because JavaScript months are 0-indexed)
    const year = match[1];
    const month = parseInt(match[2], 10) + 1;
    const day = match[3];
    console.log(`Current NEXT_DELIVERY_DATE: ${month.toString().padStart(2, '0')}/${day.padStart(2, '0')}/${year}`);
  } else {
    console.error('NEXT_DELIVERY_DATE value not found or format is incorrect.');
  }
});

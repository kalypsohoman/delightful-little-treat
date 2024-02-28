const fs = require('fs');
const path = require('path');

// Path to the config.ts file
const configFilePath = path.join(__dirname, '../src/lib/config.ts');

// New value for NEXT_DELIVERY_DATE passed as a command line argument
const newDate = process.argv[2];

if (!newDate) {
    console.error('Please provide the date in MM/DD/YYYY format or "null".');
    process.exit(1);
}

if (newDate.toLowerCase() === 'null') {
    // If the argument is 'null' set NEXT_DELIVERY_DATE to null
    updateConfig('null');
} else {
    // Validate the date format using a simple regex
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(newDate)) {
        console.error('Please provide the date in MM/DD/YYYY format or "null".');
        process.exit(1);
    }

    // Parse the input date into a Date constructor
    const [month, day, year] = newDate.split('/').map(num => parseInt(num, 10));
    const inputDate = new Date(year, month - 1, day);

      // Create a currentDate variable to check against the input date
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset time part to compare only date part

      // Check if the input date is valid and in the future
    if (isNaN(inputDate.getTime())) {
        console.error('Invalid date. Please check the date provided.');
        process.exit(1);
    } else if (inputDate <= currentDate) {
        console.error('The date must be in the future.');
        process.exit(1);
    }

  // Proceed to update if the date is valid and in the future
  updateConfig(`new Date(${year}, ${month - 1}, ${day})`);
}

function updateConfig(newValue) {
    fs.readFile(configFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${configFilePath}:`, err);
            process.exit(1);
        }

        let updatedData;
        if (newValue === 'null') {
                // Update the NEXT_DELIVERY_DATE value to null
            updatedData = data.replace(/(NEXT_DELIVERY_DATE\s*:\s*Date\s*\|\s*null\s*=\s*)[^\;]+/, `$1null;`);
        } else {
                // Replace the NEXT_DELIVERY_DATE value with the new date object
            updatedData = data.replace(/(NEXT_DELIVERY_DATE\s*:\s*Date\s*\|\s*null\s*=\s*)[^\;]+/, `$1${newValue};`);
        }

        fs.writeFile(configFilePath, updatedData, 'utf8', (err) => {
            if (err) {
                console.error(`Error writing to ${configFilePath}:`, err);
                process.exit(1);
            }

            console.log(`NEXT_DELIVERY_DATE updated to ${newValue === 'null' ? 'null' : newDate}`);
        });
    });
}

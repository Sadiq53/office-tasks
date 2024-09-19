const xlsx = require('xlsx');
const csv = require('csv-parser');


// ---------------------------------File Reading-----------------------------------------

// Function to read XLSX files
function readXLSXFile(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Assuming we want the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet); // Converts to JSON format
  
    return data; // Array of objects
  }
  
  // Function to read CSV files
  function readCSVFile(filePath) {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          resolve(results); // Return all data rows as an array of objects
        })
        .on('error', (error) => reject(error));
    });
  }
  
  // ---------------------------------File Reading-----------------------------------------

export {readCSVFile, readXLSXFile}
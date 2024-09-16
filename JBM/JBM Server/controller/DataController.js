const route = require('express').Router();
const dataModel = require('../model/addDataSchema')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
const csv = require('csv-parser');
const generateFileName = require('randomstring');



// ---------------------------------File Reading-----------------------------------------

function readXLSXFile(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // Assuming we want the first sheet
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet); // Converts to JSON format

  return data; // Array of objects
}

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

const uploadDir = path.join(__dirname, "..", 'assets', 'uploads');

// Create upload directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    // Generate a unique name for the file
    const generatedName = generateFileName.generate(6);
    const extension = path.extname(file.originalname); // Get the file extension
    const newFileName = `${generatedName}${extension}`; // Combine generated name with file extension
    cb(null, newFileName);
  }
});

const upload = multer({ storage: storage });

// Function to read XLSX or CSV files
function readXLSXFile(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // Assuming we want the first sheet
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet); // Converts to JSON format

  return data; // Array of objects
}

//-------------------------File Saving------------------------------------

// -------------------------ROUTING STARTS----------------------------------------------------

route.post("/", upload.any(), async (req, res) => {
  if (req.files && req.files.length > 0) {
    const { bank } = req.body;
    const { path: filePath, originalname } = req.files[0]; // Destructuring to get the path and original name
    const newFileName = req.files[0].filename; // Get the generated filename from Multer
    const uploaddate = new Date();

    // Creating the member created Date in Proper Format
    const currentDate = uploaddate;
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    const formattedDate = currentDate.toLocaleString('en-US', options);

    // Object to save in database
    const obj = {
      bank: bank,
      uploaddate: uploaddate,
      formatdate: formattedDate,
      file: {
        name: originalname, // Store original file name
        newname: newFileName, // Store generated file name
        path: filePath // Full path where file is stored
      }
    };

    try {
      // Check if data with the same original file name already exists
      const isDataExist = await dataModel.findOne({ 'file.name': originalname });

      if (!isDataExist) {
        // Check if file already exists on the file system to avoid duplicate uploads
        if (fs.existsSync(filePath)) {
          // Save to database if not existing
          await dataModel.create(obj);
          
          // Read the file data
          const data = readXLSXFile(filePath);

          // Send back the updated data
          const getFileData = await dataModel.findOne({ 'file.name': originalname })
          const updatedData = {
            _id: getFileData?._id,
            name: getFileData?.file?.name,
            path: getFileData?.file?.path,
            uploaddate: getFileData?.uploaddate,
            formatdate: getFileData?.formatdate,
            newname: getFileData?.file?.newname,
            bank_name: getFileData?.bank,
            data: data
          };
          res.send({ status: 200, filedata: updatedData });
        } else {
          res.send({status : 400});
        }
      } else {
        res.send({status : 400});
      }
    } catch (error) {
      console.error("Error saving file data:", error);
      res.status(500).send("Internal server error.");
    }
  } else {
    console.log("No files uploaded.");
    res.status(400).send("No files uploaded.");
  }
});

route.get('/', async(req, res) => {
  let allFileData = await dataModel.find();
  const rawFileData = allFileData?.map((value) => {
      const getFileData = readXLSXFile(value.file.path);
      return {
          _id : value._id, 
          name : value.file.name,
          path : value.file.path,
          uploaddate : value.uploaddate,
          formatdate : value.formatdate,
          newname : value.file.newname,
          bank_name : value.bank,
          data : getFileData
      }
  })
  res.send({ fileData : rawFileData })
});

route.put('/', async(req, res) => {});

// DELETE route to remove file and its database record
route.delete('/', async (req, res) => {
  const {IDs} = req.body;
  
  try {
    // Initialize arrays to track success and errors
    const errors = [];
    const deletedIds = [];

    // Loop through each file ID
    for (const fileId of IDs) {
      try {
        // Find the file record by ID
        const findFile = await dataModel.findOne({ _id: fileId });
        if (!findFile) {
          console.log(`File not found for ID: ${fileId}`);
          errors.push({ fileId, error: 'File not found' });
          continue; // Skip to the next iteration if the file is not found
        }

        const filePath = findFile.file.path;

        // Resolve the absolute path for security
        const absoluteFilePath = path.resolve(filePath);

        // Delete the file using fs.promises.unlink
        await fs.promises.unlink(absoluteFilePath); // Promises version of unlink
        // console.log(`Deleted file at path: ${absoluteFilePath}`);

        // Delete the file record from the database
        await dataModel.deleteOne({ _id: fileId });
        // console.log(`Deleted record from database for ID: ${fileId}`);
        deletedIds.push(fileId); // Track successful deletions

      } catch (err) {
        console.error(`Error processing file ID: ${fileId}`, err);
        errors.push({ fileId, error: err.message });
      }
    }

    // Respond with status 200 even if there are some errors, detailing what succeeded and failed
    res.status(200).send({ 
      status: 200, 
      message: errors.length > 0 ? 'Partial success' : 'All files deleted successfully',
      deletedIds, 
      errors 
    });

  } catch (error) {
    console.error('Error deleting files:', error);
    res.status(500).send({ status: 500, message: 'Internal server error' });
  }
});

module.exports = route;
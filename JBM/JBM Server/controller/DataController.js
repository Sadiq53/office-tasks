let route = require('express').Router();
let user = require("../model/addDataSchema");
const multer = require('multer');
const path = require('path')

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname));
//     },
//   });
  // navigator.clipboard.writetext()
//   const upload = multer({ storage });
  

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle the file upload
route.post("/", upload.single("File"), (req, res) => {
  // Check if a file is uploaded
  if (req.file) {
    console.log("Uploaded file details:", req.file);
    res.status(200).send("File uploaded successfully!");
  } else {
    console.log("No file uploaded.");
    res.status(400).send("No file uploaded.");
  }
});

route.get('/', async(req, res)=>{
    
});
route.put('/', async(req, res)=>{

});

route.delete('/', async(req, res)=>{

});

module.exports = route
const route = require('express').Router();
const memberData = require('../model/addMemberSchema');
const bankData = require('../model/addBankSchema');
const manageTagsData = require('../model/manageTagsSchema');
const xlsx = require('xlsx');
const csv = require('csv-parser');
const dataModel = require('../model/addDataSchema')

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
  

route.get('/', async(req, res)=>{
    const member = await memberData.find();
    const bank = await bankData.find();
    const manageData = await manageTagsData.find();
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
    res.send({ status : 200, memberData : member, bankData : bank, manageTags : manageData, fileData : rawFileData })
});

route.post('/', async(req, res)=>{
    try{
        if(req.body){
            const {formData, createdat, password, formatdate} = req.body;
            const {member_email} = formData
            const chckUser = await memberData.findOne({member_email : member_email})
            if(!chckUser) {
                await memberData.create(formData);
                
                // Creating the Object to Update in Users Collection
                const object = {
                    formatdate : formatdate,
                    password : password,
                    createdat : createdat,
                }
                await memberData.updateMany({member_email : member_email}, {$set : object})
                // Creating the Object to Update in Users Collection

                res.send({status : 200})
            } else {
                res.send({status : 403})
            }
        }
    } catch (error) {
        console.log(error)
    }
});

route.put('/', async(req, res)=>{

});

route.delete('/:email', async(req, res)=>{
    const member_email = req.params.email;
    console.log(member_email)
    await memberData.deleteOne({member_email : member_email})
    res.send({status : 200})
});

module.exports = route;
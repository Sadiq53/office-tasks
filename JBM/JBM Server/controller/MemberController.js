const route = require('express').Router();
const memberData = require('../model/addMemberSchema');
const generateRandomString = require("randomstring")
const bankData = require('../model/addBankSchema');
const manageTagsData = require('../model/manageTagsSchema');

route.get('/', async(req, res)=>{
    const member = await memberData.find();
    const bank = await bankData.find();
    const manageData = await manageTagsData.find();
    res.send({ status : 200, memberData : member, bankData : bank, manageTags : manageData })
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
const route = require('express').Router();
const memberData = require('../model/addMemberSchema');
const jwt = require('jsonwebtoken')

const key = 'User Authentication'

route.post('/', async(req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    const findAccount = await memberData.findOne({member_email : username});
    console.log(findAccount)
    if(findAccount) {
        if(findAccount?.password === password) {
            const token = { id : findAccount?._id }
            const ID = jwt.sign(token?.id.toString(), key)
            console.log(ID)
            res.status(200).set('Content-Type', 'text/plain').send({status : 200, token : ID});
        }
    } else {
        res.status(400).set('Content-Type', 'text/plain').send({status : 400});
    }
})

module.exports = route;
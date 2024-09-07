require('../config/dataBase');

let mongoose = require("mongoose")

const addData = mongoose.Schema({
    name : String,
}, { collection : "add_data" });

module.exports = mongoose.model("add_data", addData);
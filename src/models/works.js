const mongoose = require('mongoose');
const validator = require('validator')
const Schema = mongoose.Schema

const WorkSchema = new Schema({
    title:{
        type : String,
        required : true
    },
     description:{
         type : String,
         required : true
     }
})

const Work = new mongoose.model("Work", WorkSchema)

module.exports = Work
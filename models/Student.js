const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required: true,
        unique:true
    },
    fatherName:{
        type:String,
        unique:false,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    contact_number:{
        type:Number,
        required:true
    }
    
}, {timestamps:true})


module.exports = mongoose.model("students", studentSchema);
const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    RollNo: {
        type: Number,
        required: true
    },
    City: {
        type: String,   
        required: true
    },
    State:{
        type: String,
        required: true
    },
    Country:{
        type: String,
        required: true
    },
    Pincode: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    Class: {
        type: String,   
        required: true
    }




    
},{timestamps: true});


    const Student = mongoose.model('Student', studentSchema);
    module.exports = {
        studentSchema: studentSchema,
        Student: Student
    };
  

    
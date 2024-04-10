
const mongoose = require("mongoose");


const schoolSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true
    },
    School_Address: {
        type: String,
        required: true
    },
    School_PinCode: {
        type: Number,
        required: true
    },
    School_City: {
        type: String,
        required: true
        
    },
    School_State:{
        type: String,
        required: true
    },
    School_Country: {
        type: String,
        required: true
    },
    School_Email: {
        type: String,
        required: true
    },
    School_Password: {
        type: String,  
        required: true     
    },
    School_Phone: {
        type: Number,
        required: true
    }
    
})
const School=mongoose.model("School",schoolSchema)
module.exports = {
    schoolSchema: schoolSchema,
    School: School
};






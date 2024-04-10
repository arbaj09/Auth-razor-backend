
const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;

const Database_Connection = async () => {

    try {
         const db = await mongoose.connect("mongodb+srv://shaikharbaj092:zlofs4IHd5nemPi3@cluster-auth-razorpay.2pbaani.mongodb.net/", {
       
       });
       console.log("Database Connection Success",);
       
}catch(err) {
    console.log(   "Database Connection", err);
}
}

module.exports = Database_Connection; // Exporting the Database_Connection function
    










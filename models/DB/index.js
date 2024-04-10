
import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const Database_Connection = async () => {

    try {
         const db = await mongoose.connect(process.env.Mongodb_URI, {
       
       });
       console.log("Database Connection Success",);
       
}catch(err) {
    console.log(   "Database Connection", err);
}
}

export default Database_Connection
    










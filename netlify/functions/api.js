const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const {School}  = require('../models/school.model.js');
const  {Student}  = require('../models/student.model.js');
const Database_Connection = require('./DB/index.js');


const router = express.Router();

router.get('/', (req, res) => {
res.send('App is running..');
});



dotenv.config({
    path: './.env'
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;



////Create School in DB


router.get("/test", (req, res) => {
    res.send("test")
})
Database_Connection();

router.post("/create-school", async (req, res) => {
    try {
        const {  
        schoolName,
        School_Address,
        School_PinCode,
        School_City,
        School_State,
        School_Password,
        School_Country,
        School_Email,
        School_Phone} = req.body;
        if (
            [schoolName, School_Address, School_PinCode, School_City, School_State, School_Country, School_Email, School_Password,School_Phone].some((field) => field?.trim() === "")
        ) {
            throw new Error(400, "All fields are required")
        }
        console.log("req.body", req.body);


        const existingSchool = await School.findOne({ School_Email });
        if(existingSchool) {
            return res.status(400).send("School already exists");
        }
   

       await School.create({ schoolName, School_Address, School_PinCode, School_City, School_State, School_Country, School_Email, School_Password,School_Phone });


        return res.status(200).send("School created successfully");
    } catch (error) {
        console.error("Error while creating school:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});


///create student in DB

router.post("/create-student", async (req, res) => {
    let requiredFields;
    try {
        const { 
            FullName,
            Email,
            Password,
            RollNo,
            City,
            State,
            Country,
            Pincode,
            Address,
            PhoneNumber,
            Class } = req.body;
            console.log("req.body", req.body);
        requiredFields = [FullName, RollNo, Pincode, Email, Password, City, State, Address, PhoneNumber, Country ,Class ];

        // Check if any required field is missing or empty
        const missingFields = requiredFields.filter(field => !field || (typeof field === 'string' && field.trim() === ''));
        if (missingFields.length > 0) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if school exists
        const existingSchool = await Student.findOne({ Email });
        if(existingSchool) {      
          return res.status(400).send("School does not exist");
         }

        // Create student record
        await Student.create({    FullName,
            Email,
            Password,
            RollNo,
            City,
            State,
            Country,
            Pincode,
            Address,
            PhoneNumber,
            Class });


        return res.status(200).send("Student created successfully");
    } catch (error) {
        console.error("Error while creating student:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});



    
    




/// login student
router.post("/student/login", async (req, res) => {
    try {
        const { Email, Password } = req.body;
        console.log("req.body", req.body);

        // Find the user with the provided email
        const user = await Student.findOne({ Email });
        console.log("user", user);
        if(!user) {
            console.log("User not found");
            return res.status(401).json({ error: "User not found" });
        }

        // If user does not exist or password is incorrect, return error
        if (!user|| user.Password !== Password) {
            console.log("Invalid email or password");
            return res.status(401).json({ error: "Invalid email or password" });
           

        }
        console.log("Login successful");

        // If user exists and password is correct, return success
        return res.status(200).json({ message: "Login successful" });
  
    } catch (error) {
        console.error("Error while logging in:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});

///// login school
router.post("/school/login", async (req, res) => {
    try { 
        const { School_Email, School_Password } = req.body;
        
        console.log("req.body", req.body);
        const user=await School.findOne({ School_Email });
        console.log("school", user);
        if(!user) {
            return res.status(401).json({ error: "User not found" });
        }
        if (!user || user.School_Password !== School_Password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        return res.status(200).json({ message: "Login successful" });
        
    } catch (error) {
        console.error("Error while logging in:", error);
        return res.status(500).json({ error: "Something went wrong" });
        
    }
})







 





app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));






app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
//const port = 8080;
//app.listen(process.env.PORT || port, () => {
//	console.log(`Listening on port ${port}`);
//});
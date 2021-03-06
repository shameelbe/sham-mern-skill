// Import - Express, mongoose, students.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const students = require("./students.js");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/skill";
const PORT = process.env.PORT || 5000;
const path = require('path');

// Connect to MongoDb - Atlas link
mongoose.connect("mongodb+srv://skill:Skill2020!@mern-skill.chomw.mongodb.net/skill", { useNewUrlParser: true})
.then(() => {
    // Once Connected we have to then define our backend server - express create our API
    const app = express();
    app.use(cors());

    app.listen(PORT, () => {
        console.log("server has started");
    })
    
    // Get All Students
    app.get("/students", async(req, res) => {
        // GET API which will fetch the students data from Database - MongoDB
        // What takes time? what should we wait for?
        // DB call to MongoDb
        const data = await students.find();
        res.json(data);
    })

    // Get one students
    app.get("/students/:id", async(req, res) => {
        // GET API
        // JSON - One Student
        // MongoDB - Fetch One Student from MongoDB

        // Error Codes - Decide on the error
        // TO check whether mongodb fetch has issues whether it is successful
        // Crappy Id. Id is not present. HTTP code. NOT FOUND 404

        // try catch
        try {
            const student = await students.findOne({_id: req.params.id});
            res.json(student);
            console.log("Request was successful - Student Object - " + student);
        } catch {
            console.log("Error - problem");
            res.status(404)
            res.json({error: "Student does not exist"})
        }   
    })

    // POST Request
    // PATH - /students
    // BODY - JSON - Understood by EXPRESS 
    // MongoDB - Update Request - INSERT
    // SEND this response with the students once this is successful

    app.use(express.json());
    app.post("/students", async (req, res) => {
        console.log(req.body);

        const student = new students({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            course: req.body.course,
            fee: req.body.fee,
            location: req.body.location
        })

        await student.save();
        
        res.status(201)
        res.json(student)
    })

    // Update 
    // PUT Request / PATCH request
    // Path - /students/:id - Param - Id
    // BODY - JSON
    // MONGODB - Instead of creating new you are updating. -> Fetch by Id. Update each value
    // {Name: "Shameel" course: "Abdul"} check what my req body and then update values accordingly
    // Send the response which success/failure

    app.put("/students/:id", async(req, res) => {
        try {
            console.log(req.params);
            console.log(req.body);
            const student = await students.findOne({_id: req.params.id});
            console.log(student);

            if (req.body.firstName) {
                student.firstName = req.body.firstName;
            }

            if (req.body.lastName) {
                student.lastName = req.body.lastName;
            }

            if (req.body.course) {
                student.course = req.body.course;
            }

            if (req.body.fee) {
                student.fee = req.body.fee;
            }

            if (req.body.location) {
                student.location = req.body.location;
            }

            await student.save();
            res.json(student)
        } catch {
            res.status(404);
            res.json({error: "Student does not exist"});
        }
    })

    app.delete("/students/:id", async(req, res) => {
        try {
            await students.deleteOne({_id: req.params.id})
            res.status(204).send();
        } catch {
            res.status(404);
            res.json({error: "Student not exist"})
        }
    } )

    if (process.env.NODE_ENV === "production") {
        app.use(express.static("client/build"));

        app.get('*', (req, res) => {
          res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
    }
})


// Frontend - React, Backend - Express, DB - MongodB

// Frontend and Backend - HTTP - JSON
// Backend Database MongoDB - communicate? Connectors - Mongose to MongoDB - JSON format
// JSON

// PUT, POST, GET and DELETE - Backend defined
// TESTING

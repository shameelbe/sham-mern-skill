const mongoose = require("mongoose");

const schema = mongoose.Schema({
    firstName: String,
    lastName: String,
    course: String,
    // _id: String,
    fee: Number,
    location: String,
}, {collection: 'students'});

module.exports = mongoose.model("students", schema);

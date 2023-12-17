const mongoose = require("mongoose")
require("dotenv").config();

const mongoConnect =()=>{
    return mongoose.connect("mongodb://localhost:27017",console.log("database connected"));
}

module.exports = {mongoConnect}
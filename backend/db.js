const mongoose = require("mongoose");
const mongooseURI = "mongodb://localhost:27017/notes";

const connectTomongo = ()=>{
    mongoose.connect(mongooseURI, ()=>{
       console.log("Connected To MongoDB")
    });
}

module.exports = connectTomongo;
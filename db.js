import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
// const mongoose=require("mongoose");

//Defining the MongoDB URL

// const mongoURL='mongodb://localhost:27017/hotels'; // hotels is the name of the data base
const onlineMongoURL=process.env.MONGO_URL

mongoose.connect(onlineMongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db=mongoose.connection;

// defining the event listener when connection is established

db.on('connected',()=>{
    console.log("Connection established with MongoDB");
})
db.on('error',(err)=>{
    console.error("Connection error with MongoDB",err);
})
db.on('disconnected',()=>{
    console.log("Disconnected MongoDB");
})


//time to export the database connection
// module.exports =db;
export default db;

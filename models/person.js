// Here we will define the schema of the DB

import mongoose from "mongoose";

const personSchema= new mongoose.Schema({
    name:{
        type:String,
        // required:true  
    },
    age:{
        type: Number
    },
    work:{
        type:String,
        enum:['coder','cashier','manager'],
        // required:true
    },
    mobile:{
        type:String,
        // required:true,
    },
    email:{
        type:String,
        // required:true,
        unique:true
    }, 
    address:{
        type:String
    },
    salary:{
        type:Number,
        // required:true
    }
});

//Create Person Schema
export const Person=mongoose.model('Person',personSchema);


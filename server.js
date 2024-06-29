// const express = require('express')
import express from "express"
const app = express()
// const db= require('./db');
import db from './db.js';

import dotenv from 'dotenv';
dotenv.config();


import bodyParser from "body-parser";
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World Welcome to my hotel');
})


//importing the router files
// for persons
import personRouter from "./routes/personRoutes.js";
app.use('/person',personRouter);

//for menu items
import menuitemRouter from "./routes/menuItemRoutes.js";
app.use('/menuitems',menuitemRouter);

app.listen(3000,()=>{
  console.log("Running on the port 3000");
})
import express from "express";
const router=express.Router();
import {Person} from "../models/person.js";
import bodyParser from "body-parser";
router.use(bodyParser.json());


//POST route to add a new person
router.post('/', async  (req,res)=>{
    try{
      const data=req.body; // assuming the request body contains the person data

      const newPerson=new Person(data); // create a new person model using the mongoose model

      // save rhe newPerson to the DB
      const response = await newPerson.save();
      console.log("data saved");
      res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    } 
});

//GET method to get the data of the person

router.get('/', async (req,res)=>{
    try{
        const data= await Person.find();
        console.log("Data fetched");
        res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Data not fetched'});
    }
});

//get method for Specific URL
router.get('/:work', async (req,res)=>{
    try{
        const workType = req.params.work; // extracting the workType from the URL

        if(workType =='coder' || workType=='cashier'|| workType=='manager'){
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response)
        }
        else{
          res.status(404).json({error: 'Invalid work type'});
        }
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
})

//Update data using PUT

router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatePersonData=req.body;

        const response= await Person.findByIdAndUpdate(personId,updatePersonData,{
            new:true,  // return the updated data
            runValidators:true  // check all the mongoose validations
        })

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//Delete data using DELETE

router.delete('/:id',async(req,res)=>{
    try{

        const personId=req.params.id;

        const response=await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error: 'Person Data not found'});
        }

        console.log('data deleted');
        res.status(200).json({message: 'Data deleted Successfully'});

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})
export default router;
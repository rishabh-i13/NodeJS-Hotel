import express, { response } from "express";
const router=express.Router();
import {MenuItem} from "../models/MenuItem.js"


//POST ROUTE to add a new item in the menuItem
router.post('/', async (req,res)=>{
    try{
        const data=req.body;
        const newItem= new MenuItem(data);
  
        const response= await newItem.save();
        console.log("new item added");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Item Data not found'});
    }
});
  //GET method to get menu Data
router.get('/',async (req,res)=>{
    try{
        const data= await MenuItem.find();
        console.log("Items fetched"); 
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Item data not fetched'});
    }
})

// GET the data where the item is a drink or not a drink

router.get('/:DrinkType',async (req,res)=>{
    try{
        const drinkType=req.params.DrinkType;

        if(drinkType=='drink'){
            const response= await MenuItem.find({is_drink: true});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else if(drinkType=='notdrink'){
            const response= await MenuItem.find({is_drink: false});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            console.log(err);
            res.status(500).json({error: 'It does not exist '});
        }
    }
    catch(err){
            console.log(err);
            res.status(500).json({error: 'Internal Server Error'});
    }
});

//PUT to update the data using id of an item
router.put('/:id', async (req,res)=>{
    try{
        const itemId=req.params.id;
        const updateMenu=req.body;
        
        const response=await MenuItem.findByIdAndUpdate(itemId,updateMenu,{
            new:true,
            runValidators:true
        })

        if(!response){
            res.status(500).json({error: 'No such item exist'})
        }

        console.log("Item updated");
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//DELETE , to delete item of the menu using id

router.delete('/:id',async (req,res)=>{
    try{
        const itemId=req.params.id;

        const response=await MenuItem.findByIdAndDelete(itemId);

        if(!response){
            res.status(500).json({error: 'no such item exist'});
        }

        console.log('Item deleted successfully');
        res.status(200).json({message: 'Item deleted from the menu'})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})
  
export default router;
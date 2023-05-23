import express from "express";
import {UserModel} from "../models/Users.js";
import {CategoryModel} from "../models/Category.js";
import {ItemModel} from "../models/Item.js";


const router = express.Router();

//post method for adding new item for auction. Only the seller or admin can add new items.
router.post('/add',async (req,res)=>{
    const {name,description,sellerUsername, imagesUrl, categories} = req.body
    const user = await UserModel.findOne({username:sellerUsername})

    if(!user)
        return res.json({message:"User with that username does not exist!"})

    let itemCategories = []
    //checking if all categories are valid
    for (const each of categories) {
        let category = await CategoryModel.findOne({_id:each})
        if(!category)
            return res.json({message:"Category with that id does not exist!"})
        itemCategories.push({_id:category._id, name:category.name})
    }

    const newItem = new ItemModel({name:name, description:description, sellerUsername:sellerUsername,
                                       imagesUrl:imagesUrl,categories:itemCategories})
    await newItem.save();
    res.json({message:"Item added successfully"})
})
//get method that returns the items added by the user with provided username
router.get('/itemsForUser/:username',async (req,res)=>{
    const username = req.params.username;

    const user = await UserModel.findOne({username})
    if(!user)
        return res.json({message:"User with that username does not exist!"})

    let itemsForUser = await ItemModel.find({sellerUsername:username})

    res.json({message:"Items retrieved successfully", itemsForUser:itemsForUser})
})

//method for deleting item from the database using the id
router.get('/delete/:itemId',async (req,res)=>{
    const itemId = req.params.itemId;

    const item = await ItemModel.find({_id:itemId})
    if(!item)
        return res.json({message:"Item with that id does not exist!"})

    await ItemModel.deleteOne({_id : itemId})

    res.json({message:"Item successfully deleted!"})
})

//method for editing the details of specified item with id
router.post('/edit',async (req,res)=>{
    const {itemId, name, description, imagesUrl, categories} = req.body

    const item = await ItemModel.findById(itemId)
    if(!item)
        return res.json({message:"Item with that id does not exist!"})

    await ItemModel.findByIdAndUpdate(itemId,{name:name})
    await ItemModel.findByIdAndUpdate(itemId,{description:description})
    await ItemModel.findByIdAndUpdate(itemId,{imagesUrl:imagesUrl})
    await ItemModel.findByIdAndUpdate(itemId,{categories:categories})
    return res.json({message:"Item details edited successfully"})
})

//method for getting item details based on id
router.get('/:itemId',async (req,res)=>{
    const itemId = req.params.itemId;

    const item = await ItemModel.findById(itemId);
    if(!item)
        return res.json({message:"Item with that id does not exist!"})

    res.json({message:"Item retrieved successfully!",item:item})
})

router.post('/editImages',async (req,res)=>{
    const {itemId, imagesUrl} = req.body

    const item = await ItemModel.findById(itemId)
    if(!item)
        return res.json({message:"Item with that id does not exist!"})

    await ItemModel.findByIdAndUpdate(itemId,{imagesUrl:imagesUrl})
    return res.json({message:"Item images edited successfully"})
})

export {router as itemRouter}
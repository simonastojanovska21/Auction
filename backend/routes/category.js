import {CategoryModel} from "../models/Category.js";
import express from "express";

const router = express.Router();

router.post("/add", async (req,res)=>{
    const {name, imageUrl,isSubcategory, mainCategoryId} = req.body;
    let savedCategoryId;

    const newCategory = new CategoryModel({name,imageUrl,isSubcategory})
    await newCategory.save().then(category=>savedCategoryId=category._id);

    if(isSubcategory && mainCategoryId){
        await CategoryModel.findByIdAndUpdate(mainCategoryId,{$push:{subcategories:savedCategoryId}})
        return res.json({message:"Subcategory successfully added"})
    }
    res.json({message:"Category successfully added"})
})

export {router as categoryRouter};
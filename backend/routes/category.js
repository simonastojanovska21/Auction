import {CategoryModel} from "../models/Category.js";
import express from "express";

const router = express.Router();

//Post method for add new category in the database. First the category is inserted in the database. After that
//we check if the added category is mainCategory or subCategory. If it is subcategory in the mainCategory document a
//id is added linking the main and sub category.
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

//Get method for retrieving all the categories in the database along with a list of the subcategories
//associated with each category
router.get('/all',async (req,res)=>{
    let categoriesList=[]
    await CategoryModel.find({isSubcategory:false})
        .then(async (categories) => {
            for (const each of categories) {
                let subcategories = []
                for (const id of each.subcategories) {
                    const subCategory = await CategoryModel.findById(id)
                    subcategories.push({_id:subCategory._id,name:subCategory.name,
                        imageUrl: subCategory.imageUrl})
                }
                categoriesList.push({_id: each._id, name: each.name, imageUrl: each.imageUrl,
                    subcategories:subcategories})
            }
        })

    return res.json({message:"Categories retrieved successfully", categories:categoriesList})
})

//Get method for getting all main categories without their subcategories
router.get('/mainCategories',async (req,res)=>{
    let mainCategories = []
    await CategoryModel.find({isSubcategory:false})
        .then((response)=>{
            response.forEach(each=>{
                mainCategories.push({_id:each._id, name:each.name, imageUrl:each.imageUrl})
            })
        })
    return res.json({message:"Categories retrieved successfully", mainCategories:mainCategories})
})

//Get method for retrieving all the subcategories for the provided category id
router.get('/subcategories/:categoryId',async (req,res)=>{
    const categoryId = req.params.categoryId;
    const category = await CategoryModel.findById(categoryId);
    let subcategories=[]

    if(!category)
        return res.json({message:"Category with that id does not exist"})

    for(const id of category.subcategories){
        const subCategory = await CategoryModel.findById(id)
        subcategories.push({_id:subCategory._id,name:subCategory.name,
            imageUrl: subCategory.imageUrl})
    }
    return res.json({message:"Retrieved subcategories for category", subcategories:subcategories})
})

export {router as categoryRouter};
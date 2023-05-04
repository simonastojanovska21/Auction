import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {type:String, required:true},
    imageUrl: {type:String, required: true},
    isSubcategory: {type: Boolean, required:true},
    subcategories: [{type: mongoose.Schema.Types.ObjectId,refs:"category"}]
});

export const CategoryModel = mongoose.model("category",CategorySchema)
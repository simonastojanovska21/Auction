import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required: true},
    seller: {type:mongoose.Schema.Types.ObjectId, refs:"users", required:true},
    imagesUrl: [{type:String, coverPhoto:Boolean}],
    categories: [{type:mongoose.Schema.Types.ObjectId, refs:"category", required:true}]
});

export const ItemModel = mongoose.model("items",ItemSchema)
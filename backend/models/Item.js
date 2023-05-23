import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required: true},
    sellerUsername: {type:String, refs:"users", required:true},
    imagesUrl: [{type:String}],
    categories: [{_id: mongoose.Schema.Types.ObjectId, name:String}]
});

export const ItemModel = mongoose.model("items",ItemSchema)
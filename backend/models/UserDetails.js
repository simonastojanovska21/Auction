import mongoose from "mongoose";

const UserDetailsSchema = new mongoose.Schema({
    detailsForUser:{type:mongoose.Schema.Types.ObjectId, refs:"users", required:true},
    firstName:{type: String},
    lastName:{type: String},
    imageUrl:{type:String},
    phoneNumber:{type:String}
})

export const UserDetailsModel = mongoose.model("userDetails",UserDetailsSchema)
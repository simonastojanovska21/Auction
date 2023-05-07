import mongoose from "mongoose";

const UserDetailsSchema = new mongoose.Schema({
    username:{type:String},
    firstName:{type: String},
    lastName:{type: String},
    imageUrl:{type:String},
    phoneNumber:{type:String}
})

export const UserDetailsModel = mongoose.model("userDetails",UserDetailsSchema)
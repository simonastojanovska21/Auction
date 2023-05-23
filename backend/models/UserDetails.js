import mongoose from "mongoose";

const UserDetailsSchema = new mongoose.Schema({
    username:{type:String},
    firstName:{type: String},
    lastName:{type: String},
    imageUrl:{type:String},
    phoneNumber:{type:String},
    location:{
        country:{type:String},
        city:{type:String},
        address:{type:String}
    }
})

export const UserDetailsModel = mongoose.model("userDetails",UserDetailsSchema)
import express, {json} from "express";
import {UserModel} from "../models/Users.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {UserDetailsModel} from "../models/UserDetails.js";


const router = express.Router();

router.post("/register", async (req,res)=>{
    const {username, password,repeatedPassword} = req.body;
    const user = await UserModel.findOne({username:username})

    if(user)
        return res.json({message:"User already exists!"})

    if(password !== repeatedPassword)
        return res.json({message:"Passwords do not match!"})

    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = new UserModel({username, password:hashedPassword,userRole:'Buyer'})
    await newUser.save()
    res.json({message:"User registered successfully"})
})

router.post("/login", async (req,res)=>{
    const {username,password} = req.body;
    const user = await UserModel.findOne({username})

    if(!user)
        return res.json({message:"User with that username does not exists!"})

    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid)
        return res.json({message:"Username or password is incorrect!"})

    const token = jwt.sign({id: user._id},"secret")
    res.json({token, userId:user._id, userRole:user.userRole, username:username})
    //res.json({message:"Successful login"})
})

router.post("/editUserDetails",async (req,res)=>{
    const {username, firstName,lastName,imageUrl, phoneNumber,country,city,address} = req.body;
    const user = await UserModel.findOne({username})

    if(!user)
        return res.json({message:"User with that username does not exist!"})

    //checking if the user with the username has inserted any profile information
    const userDetails = await UserDetailsModel.findOne({username})
    if(!userDetails){
        //if there is no profile information about the user than userDetails document is added in the database
        const userDetailsModel = new UserDetailsModel({username:username, firstName,lastName,imageUrl,phoneNumber,
        country,city,address})
        await userDetailsModel.save();
        return res.json({message:"User details added successfully"})
    }
    //if there is data about the user than it should be updated with the provided information from the frontend
    await UserDetailsModel.findOneAndUpdate({username}, {firstName:firstName})
    await UserDetailsModel.findOneAndUpdate({username}, {lastName:lastName})
    await UserDetailsModel.findOneAndUpdate({username}, {imageUrl:imageUrl})
    await UserDetailsModel.findOneAndUpdate({username}, {phoneNumber:phoneNumber})
    await UserDetailsModel.findOneAndUpdate({username},{location:{country:country,city:city,address:address}})
    // await UserDetailsModel.findOneAndUpdate({username}, {country:country})
    // await UserDetailsModel.findOneAndUpdate({username}, {city:city})
    // await UserDetailsModel.findOneAndUpdate({username}, {address:address})
    return res.json({message:"User details edited successfully"})
})

//Get request for retrieving user details given the username
router.get("/userDetails/:username",async (req,res)=>{
    const username = req.params.username;

    const user = await UserModel.findOne({username})
    if(!user)
        return res.json({message:"User with that username does not exist!"})

    const userDetails = await UserDetailsModel.findOne({username})
    //if there is no UserDetails document present about the user with given username than an object with empty fields is sent
    if(!userDetails){
        return res.json({message:"There are no user details about that user",
            userDetails:{username,firstName:"",lastName:"",imageUrl:"",phoneNumber:""}})
    }
    return res.json({message:"User details retrieved successfully",userDetails:userDetails})
})

router.get("/getUsernames",async (req,res)=>{
    await UserModel.find({})
        .then((users)=>{
            return res.json({usernames: users.map(user=>user.username)})
        })
})

router.post("/updateUserRole",async (req,res)=>{
    const {username, userRole} = req.body;
    const user = await UserModel.findOne({username})
    console.log(user)
    if(!user)
        return res.json({message:"User with that username does not exist!"})

    const roles=["Admin","Buyer","Seller"]
    if(!roles.includes(userRole.toString()))
        return res.json({message:"Invalid user role. Valid options are Admin, Buyer and Seller"})

    await UserModel.findOneAndUpdate({username},{userRole:userRole})
    return res.json({message:"User role updated successfully"})
})

export {router as userRouter};
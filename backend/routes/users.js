import express, {json} from "express";
import {UserModel} from "../models/Users.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

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
    res.json({token, userId:user._id, userRole:user.userRole})
    //res.json({message:"Successful login"})
})

export {router as userRouter};
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import {userRouter} from './routes/users.js'
import {categoryRouter} from "./routes/category.js";
const app = express();

app.use(express.json())
app.use(cors())

app.use("/authentication",userRouter);
app.use("/category",categoryRouter)

mongoose.connect(
    "mongodb+srv://simonastojanovska1999:5tB4giClOYu3JS2I@auction.vosz7ht.mongodb.net/auction?retryWrites=true&w=majority"
    )

app.listen(3001,()=>{
    console.log("Server runs.")
});


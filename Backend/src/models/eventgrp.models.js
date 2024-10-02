import mongoose from "mongoose";
const eventgrpSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    participants:[{type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }],
    ngo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Ngo"
    }
},{timestamps:true})
export const Eventgrp=mongoose.model("Eventgrp",eventgrpSchema)
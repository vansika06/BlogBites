import mongoose from "mongoose";
const eventSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    organiser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Ngo"
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        
    },
    address:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Eventgrp"
    },
    startime:{
        type:String,
        required:true  ,
        
    },
    endtime:{
        type:String,
        required:true,
        
    }
},{timestamps:true})
export const Event=mongoose.model("Event",eventSchema)

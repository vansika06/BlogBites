import mongoose from "mongoose";
const followerSchema=new mongoose.Schema({
    follower:{//one who is subscribing
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    blogger:{
        type:mongoose.Schema.Types.ObjectId,//one to whom subscribed
        ref:"User",
        required:true
    }
},{timestamps:true})
export const Follower=mongoose.model("Follower",followerSchema)
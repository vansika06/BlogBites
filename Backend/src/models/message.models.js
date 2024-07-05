import mongoose from "mongoose";
const messageSchema=new mongoose.Schema({
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation"
    },
    message:{
        type:String,
        required:true
    }
    ,
    sentBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    seen:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
export const Message=mongoose.model("Message",messageSchema)
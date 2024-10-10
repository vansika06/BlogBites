import mongoose from "mongoose";
const bookmarkSchema=new mongoose.Schema({
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        reqired:true
    },
    
        user:{
            type:mongoose.Schema.Types.ObjectId,
            refPath: 'ownerType',
            required:true
        },
        ownerType:{
            type: String,
    required: true,
    enum: ['User', 'Ngo'], 
        }
    
},{timestamps:true})
export const Bookmark=mongoose.model("Bookmark",bookmarkSchema)

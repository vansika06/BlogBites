import mongoose,{Schema} from "mongoose";
const commentSchema=new Schema({
    content:{
        type:String,
        required:true
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        refPath: 'ownerType',
        required:true
    },
    ownerType:{
        type: String,
required: true,
enum: ['user', 'ngo'], 
    }

    
},{timestamps:true})
export const Comment=mongoose.model("Comment",commentSchema)
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";

import Mongoose, { isValidObjectId,ObjectId }  from "mongoose";

import { Like } from "../models/like.models.js";
const toggleLike=asyncHandler(async(req,res)=>{
    const {blogId}=req.body
    console.log(blogId)
    //const objectId = new Mongoose.Types.ObjectId(blogger);
    //if(!isValidObjectId(blogger)){
    ///    throw new ApiError(404,"Invalid object id")
    //}
    const isLiked=await Like.findOne({likedBy:req.user._id,blog:blogId})
    console.log(isLiked)
    if(!isLiked){
        const like=await Like.create({likedBy:req.user._id,blog:blogId})
    if(!like){
        throw new ApiError(500,"something went wrong while liking ")
    }
    
   // const follow=await Follower.create({follower:req.user._id,blogger})
    
   // 
   return res
    .status(200)
    .json(new ApiResponse(200,like,"successfully liked"))
    //const populatedFollow = await Follower.findById(follow._id).populate('follower').populate('blogger');
   // console.log(populatedFollow)
} 
else{
    const unlike=await Like.findByIdAndDelete(isLiked._id)
    if(!unlike){
        throw new ApiError(500,"something went wrong while unliking")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,null,"successfully unliked"))
}
})


const getAllLikedPosts=asyncHandler(async(req,res)=>{
    const likedPosts=await Like.aggregate([
        {$match:{
            user:req.user._id
        }},
        {
            $lookup:{
                from:"blogs",
                localField:"blog",
                foreignField:"_id",
                as:"blogDetails"
            }
        },
        {
            $addFields:{
                blogDetails:{
                    
                        $first:"$blogDetails"
                     
                }
            }
        }
    ])
    console.log(likedPosts)
    if(likedPosts.length==0){
        return res.status(200).json(200,null,"No Posts Liked Yet")
    }
    else{
        return res.status(200).json(200,likedPosts,"No Posts Liked Yet")
    }
})

export {toggleLike,getAllLikedPosts} 
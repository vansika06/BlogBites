import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {User} from "../models/user.models.js"
import {Blog} from "../models/Blog.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"
import Mongoose from "mongoose";
import {ObjectId} from "mongoose"
const publishPost=asyncHandler(async(req,res)=>{
    const {title,thumbnail,description,category,status}=req.body
    if([title,thumbnail,description,category,status].some((field)=>(field?.trim()===""))){
        throw new ApiError(400,"All fields are required")
   }
   const imageLocalPath=req.files?.image[0]?.path
   let mediaLocalPath;
   if(req.files && Array.isArray(req.files.media)&& req.files.media.length>0){
      mediaLocalPath=req.files.media[0].path
   }

   if(!imageLocalPath){
      throw new ApiError(400,"image is required")
   }
  const image= await uploadOnCloudinary(imageLocalPath)//jo response return  aaya
  const media=await uploadOnCloudinary(mediaLocalPath)
  if(!image){
   throw new ApiError(400,"image is required")
  }
  const user=await User.findById(req.user._id).select("-password -refreshToken")
 const blog=await Blog.create({title,
               image:image.url,
               media:media?media.url:null,
               thumbnail,
               description,
               // owner:
               owner:req.user._id,
               category,
               status,
             
            })
            
//    const createdBlog= await Blog.aggregate(
//       [{
//          $match:{
//             _id: new mongoose.Types.ObjectId(blog._id)

//            } 
// },{
//       $lookup:{
//          from:"users",
//          localField:"owner",
//          foreignField:"_id",
//          as:"owner",
//          pipeline:[
//             {
//                $project:{
//                   fullname:1,
//                   username:1,
//                   avatar:1,
//                   email:1,
//                   postHistory:1
//                }
//             },]
//       }
// },{
//    $addFields:{
//      ownerDetails:{
//         $first:"$owner"
//      }
//    }  
//   }
// ]
//    )
  // await createdBlog.save();
 const createBlog=await Blog.findById(blog._id)
 console.log(createBlog)
   if(!createBlog){
      throw new ApiError(500,"something went wrong while creating the user")
   }
   return(
      res
      .status(200)
      .json(new ApiResponse(200,createBlog,"Published successfully"))
   )
 
})
const getPostByTitle = asyncHandler(async (req, res) => {
   const { title} = req.params
   if(!(title?.trim())){
      throw new ApiError(400,"title is missing")
   }
   const blog=await User.aggregate([
      {
         $match:{
            title:title?.toLowerCase()
         }
      },])
   //TODO: get video by id
})
const getPostById=asyncHandler(async(req,res)=>{
   const {blogId}=req.params
   const objectId = new Mongoose.Types.ObjectId(blogId);
  // const blog=await Blog.findById(id)
   const createdBlog=await Blog.aggregate([
    {  $match:{
         _id:objectId
      }},
      {
         $lookup:{
            from:"users",
            localField:"owner",
            foreignField:"_id",
            as:"ownerDetails",
            pipeline:[
                            {
                               $project:{
                                  fullname:1,
                                  username:1,
                                  avatar:1,
                                  email:1,
                                  postHistory:1,
                                  _id:1
                               }
                            },]
         }
      },{
         $lookup:{
            from:"likes",
            localField:"_id",
            foreignField:"blog",
            as:"likedBy"
         }
      },{
        $lookup:{
         from:"comments",
         localField:"_id",
         foreignField:"blog",
         as:"CommentedBy"
        } 
      }
      ,
       {
              $addFields:{
                ownerDetails:{
                   $first:"$ownerDetails"
                },
                likes:{
                  $size:"$likedBy"
                },
                comments:{
                  $size:"$commentedBy"
                },
                isLiked:{
                  $cond:{
                     if:{$in:[req.user?._id,"$likedBy.likedBy"]},
                     then:true,
                     else:false
                  }  
               }
              }  
             }
   ])
   console.log(1);
   console.log(createdBlog)
   if(createdBlog.length==0){
      throw new ApiError(400,"Blog not found")
   }
   return res
   .status(200)
   .json(new ApiResponse(200,createdBlog[0],"Blog fetched successfully"))
})
const getAllPost=asyncHandler(async(req,res)=>{
      const posts=await Blog.find({})
      if(!posts){
         throw new ApiError(500,"something went wrong while fetching the posts")
      }
      console.log(posts)
      return (res
      .status(200)
      .json(new ApiResponse(200,posts,"all posts fetched")))



})
const getPostByCategory=asyncHandler(async(req,res)=>{
   const {category}=req.params
   const blog=await Blog.find({category:category})
   if(!blog){
      throw new ApiError(404,"not found")
   }
   console.log(blog)
   return res
   .status(200)
   .json(new ApiResponse(200,blog,"category fetched successfully"))
})
const updateBlog=asyncHandler(async(req,res)=>{
   const {blogId}=req.body
})
const userPosts=asyncHandler(async(req,res)=>{
   const userId=req.user._id;
   const blog=await Blog.find({owner:userId,status:true})
   if( blog.length==0){
      return res
      .status(200)
      .json(new ApiResponse(200,"You have no blogs"))
   }
   else{
      return res
      .status(200)
      .json(new ApiResponse(200,blog,"Posts fetched successfully"))
   }
})
const userDrafts=asyncHandler(async(req,res)=>{
   const userId=req.user._id;
   const blog=await Blog.find({owner:userId,status:"inactive"})
   if( blog.length==0){
      return res
      .status(200)
      .json(new ApiResponse(200,"You have no drafts"))
   }
   else{
      return res
      .status(200)
      .json(new ApiResponse(200,blog,"Drafts fetched successfully"))
   } 
})
const latestBlogs=asyncHandler(async(req,res)=>{
   const blogs=await Blog.aggregate([{
      $sort:{
         createdAt:-1
      }
   },
   {
      $limit:5
   }])
   //const blogs=await Blog.sort({createdAt:-1}).limit(7);
   if(blogs.length==0){
      return res
      .status(200)
      .json(new ApiResponse(200,"no blogs","not fetched successfully"))
   }
   return res
      .status(200)
      .json(new ApiResponse(200, blogs,"fetched successfully"))
})

const trending=asyncHandler(async(req,res)=>{
   const blogs=await Blog.aggregate([{
      $sort:{
         views:-1
      }
   },
   {
      $limit:5
   }])
   //const blogs=await Blog.sort({createdAt:-1}).limit(7);
   if(blogs.length==0){
      return res
      .status(200)
      .json(new ApiResponse(200,"no blogs","not fetched successfully"))
   }
   return res
      .status(200)
      .json(new ApiResponse(200, blogs,"fetched successfully"))

})

const getLikes=asyncHandler(async(req,res)=>{
   const  {blogId}=req.params
   const objectId = new Mongoose.Types.ObjectId(blogId);
   const blog=Blog.aggregate([
      {
         $match:{
            _id:objectId
         }
      },{
         $lookup:{
            from:"likes",
            localField:"bn"
         }
      }
   ])
})

export{
    publishPost,
    getAllPost,
    getPostByCategory,
    userPosts,
    userDrafts,
    updateBlog,
    getPostById,
    latestBlogs,
    trending
}
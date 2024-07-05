import  nodemailer from 'nodemailer'
import {User} from '../models/user.models'
import bcrypt from "bcrypt"
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const transporter = nodemailer.createTransport({
   service:"gmail",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "maddison53@ethereal.email",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });
 const sendEmail=asyncHandler(async(req,res)=>{
  const {email,type,userId}=req.body
  const user=await User.findById(userId)
  if(!user){
    throw new ApiError(400,"User not found")
  }
  const token=Math.floor(1000+Math.random()*9000)
  const mailOptions={
    from:,
    to:email,
    subject:"Verify your email",
    html:`<p>The otp for your email  verification is  <b>${token}</b>.Enter the otp to verify your email.Happy Blogging!!!!!</p>`
  }
  const hashedOtp=await bcrypt.hash(token,10);
  if(type==="VERIFY"){
      const updated=await User.findByIdAndUpdate(
        userId
        ,{
           $set:{
              verifyToken:token,
              verifyTokenExpiry:Date.now()+3600000
             
              
           }
        }
        ,{new:true}
     ).select("-password ")}
     if(!updated){
      throw new ApiError(500,"Something went wrong while generating the otp")
     }
     await transporter.sendMail(mailOptions)
     return res.status(200).json(new ApiResponse(200,{user:userId,email},"Email sent successfully"))

 })
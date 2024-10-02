import { request } from "express"
import { verifyJWT } from "./auth.middleware.js"
import { verifyJWTNgo } from "./ngo.middleware.js"
export const dynamicVerify=(req,res,next)=>{
  console.log(req.headers.usertype)
    if (req.headers.usertype === 'user') {
        console.log("user")
        return verifyJWT(req, res, next); // Verify JWT for user
      } else if (req.headers.usertype === 'ngo') {
        console.log("ngo")
        return verifyJWTNgo(req, res, next); // Verify JWT for NGO
      } else {
        return res.status(401).json({ message: 'Unauthorized' });
      }
}
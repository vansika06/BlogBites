import { Router } from "express";
import { upload } from "../Middlewares/multer.middleware.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { publishPost,getAllPost,getPostByCategory,getPostById,latestBlogs,trending } from "../controllers/blog.controller.js";
const router=Router()
router.route("/post").post(verifyJWT, upload.fields([
    {
        name: "image",
        maxCount: 1
    }, 
    {
        name: "media",
        maxCount: 1
    }
]),publishPost)
router.route("/allPosts").get(verifyJWT,getAllPost)
router.route("/cat/:category").get(verifyJWT,getPostByCategory)
router.route("/viewPosts/:blogId").get(verifyJWT,getPostById)
router.route("/latest").get(verifyJWT,latestBlogs)
router.route("/trending").get(verifyJWT,trending)
//router.route("/login").post(loginUser)
export default router
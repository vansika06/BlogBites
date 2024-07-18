import { Router } from "express";
import { upload } from "../Middlewares/multer.middleware.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { publishPost,getAllPost,getPostByCategory,getPostById,latestBlogs,trending,getBlogsOfType, similarPosts } from "../controllers/blog.controller.js";
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
router.route("/view/:blogId").get(verifyJWT,getPostById)
router.route("/latest").get(verifyJWT,latestBlogs)
router.route("/trending").get(verifyJWT,trending)
router.route("/:type").get(verifyJWT,getBlogsOfType)
router.route("/similar").get(verifyJWT,similarPosts)
//router.route("/login").post(loginUser)
export default router
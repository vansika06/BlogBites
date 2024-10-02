import { Router } from "express";
import { upload } from "../Middlewares/multer.middleware.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { dynamicVerify } from "../Middlewares/dynamic.middleware.js";
import { publishPost,getAllPost,getPostByCategory,getPostById,latestBlogs,trending,getBlogsOfType, similarPosts, getUserPosts, deletePost, Editpost, editImage, userDrafts, searchBlog } from "../controllers/blog.controller.js";
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
router.route("/u").get(verifyJWT,getUserPosts)

router.route("/allPosts").get(verifyJWT,getAllPost)
router.route("/delete").post(verifyJWT,deletePost)
router.route("/edit").patch(verifyJWT,Editpost)
router.route("/draft").get(verifyJWT,userDrafts)
router.route("/editImage").patch(verifyJWT,upload.single("image"),editImage)
router.route("/search").post(dynamicVerify,searchBlog)
router.route("/cat/:category").get(dynamicVerify,getPostByCategory)
router.route("/view/:blogId").get(dynamicVerify,getPostById)
router.route("/latest").get(dynamicVerify,latestBlogs)
router.route("/trending").get(dynamicVerify,trending)
router.route("/:type").get(dynamicVerify,getBlogsOfType)


//router.route("/login").post(loginUser)
export default router
import { Router } from "express";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { dynamicVerify } from "../Middlewares/dynamic.middleware.js";
import { addComment,editComment,deleteComment ,getAllComments, commentedPosts} from "../controllers/comment.controllers.js";
const router=Router()
router.route('/post').post(dynamicVerify,addComment)
router.route('/edit').post(dynamicVerify,editComment)
router.route('/delete').post(dynamicVerify,deleteComment)
router.route('/commentedPost').get(dynamicVerify,commentedPosts)
router.route('/allComments/:blogId').get(dynamicVerify,getAllComments)
export default router
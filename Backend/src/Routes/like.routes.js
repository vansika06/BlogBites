import { Router } from "express";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
import {getAllLikedPosts, toggleLike} from '../controllers/like.controllers.js'
import { dynamicVerify } from "../Middlewares/dynamic.middleware.js";
const router=Router()
router.route('/handleLike').post(dynamicVerify,toggleLike)
router.route("/userliked").get(dynamicVerify,getAllLikedPosts)

//router.route('/unfollow').post(unfollow)
export default router
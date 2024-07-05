import { Router } from "express";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
import {toggleLike} from '../controllers/like.controllers.js'
const router=Router()
router.route('/handleLike').post(verifyJWT,toggleLike)
//router.route('/unfollow').post(unfollow)
export default router
import { Router } from "express";
import { dynamicVerify } from "../Middlewares/dynamic.middleware.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { toggleBookmark,getAllbookmarks } from "../controllers/bookmark.controller.js";
const router=Router()
router.route('/toggle').post(dynamicVerify,toggleBookmark)
router.route('/show').get(dynamicVerify,getAllbookmarks)
export default router
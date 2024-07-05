import {Router} from "express"
import { verifyJWT } from "../Middlewares/auth.middleware.js"
import { getAllmessages, getUserMessage, sendMessage } from "../controllers/message.controller.js"
const router=Router()
router.route("/send").post(verifyJWT,sendMessage)
router.route("/all/:id1").get(verifyJWT,getAllmessages)
router.route('/userConversations').get(verifyJWT,getUserMessage)
export default router
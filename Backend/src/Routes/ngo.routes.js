import {Router} from "express"
import { upload } from "../Middlewares/multer.middleware.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { verifyJWTNgo } from "../Middlewares/ngo.middleware.js";
import { dynamicVerify } from "../Middlewares/dynamic.middleware.js";
import { register,addEvent,getAllEvents,loginNgo,logOutNgo, participate,getCurrentUser,handleGroupJoin, fetchParticipants, sendMessage, getUserEvents, totalVol,getNgoevents } from "../controllers/ngo.controller.js";
const router=Router()
router.route('/registerNgo').post(upload.single("avatar"),register)
router.route("/loginNgo").post(loginNgo)
router.route("/logoutNgo").get(verifyJWTNgo,logOutNgo)
router.route("/addEvent").post(verifyJWTNgo,upload.single("image"),addEvent)
router.route('/getAllEvents').get(dynamicVerify,getAllEvents)
router.route('/participate').post(verifyJWT,participate)
router.route('/getCurrent').get(verifyJWTNgo,getCurrentUser)
router.route('/grpJoin').post(dynamicVerify,handleGroupJoin)
router.route('/send').post(dynamicVerify,upload.single('image'),sendMessage)
router.route('/participants').post(dynamicVerify,fetchParticipants)
router.route('/getUserEvents').get(verifyJWT,getUserEvents)
router.route('/totVol').get(verifyJWTNgo,totalVol)
router.route('/getngoEvents').get(verifyJWTNgo,getNgoevents)
export default router
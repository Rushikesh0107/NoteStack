import { Router } from "express";
import { 
    registerUser,
} from "../controllers/User.controller.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from '../middlewares/multer.middleware.js'

const router = Router();


router.route("/register").post(upload.none(), registerUser);

export default router;
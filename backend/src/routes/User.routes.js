import { Router } from "express";
import { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    uploadNotes
} from "../controllers/User.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from '../middlewares/multer.middleware.js'

const router = Router();


router.route("/register").post(upload.none(), registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(verifyJWT, logoutUser);

router.route("/refresh-token").post(verifyJWT, refreshAccessToken);

router.route('/upload-notes').post(verifyJWT, upload.fields([
    {name: "fileUrl", maxCount: 1},
]), uploadNotes);

router.route("/me").get(verifyJWT, getCurrentUser);

export default router;
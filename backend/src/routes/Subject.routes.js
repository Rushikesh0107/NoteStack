import {Router} from "express"
import {getSubjects} from "../controllers/Subject.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-subjects").post(verifyJWT, getSubjects);

export default router;

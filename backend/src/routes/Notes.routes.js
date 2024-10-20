import { Router } from "express";
import { getNotes } from "../controllers/Notes.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/get-notes").post(verifyJWT, getNotes);

export default router;
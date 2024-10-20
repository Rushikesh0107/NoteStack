import { Router } from "express";
import { getPYQs } from "../controllers/Pyq.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-pyq").post(verifyJWT, getPYQs);

export default router;
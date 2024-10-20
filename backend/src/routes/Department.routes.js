import { Router } from "express";
import { getDepartments } from "../controllers/department.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-departments").get(verifyJWT, getDepartments);

export default router;
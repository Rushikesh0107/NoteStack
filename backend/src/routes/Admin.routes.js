import { Router } from "express";
import { 
        addSubjects,
        removeSubject,
        uploadPyq,
        addDepartment,
        verifyNotes,
        adminLogin,
        } from "../controllers/Admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/add-subject").post(verifyJWT, verifyAdmin, addSubjects);

router.route("/remove-subject").delete(verifyJWT, verifyAdmin, removeSubject);

router.route("/add-department").post(verifyJWT, verifyAdmin, addDepartment);

router.route("/upload-pyq").post(
    verifyJWT,
    verifyAdmin, 
    upload.fields([
        {
            name: "fileUrl", 
            maxCount: 1
        }
    ]),uploadPyq);

router.route("/verify-notes/:_id").post(verifyJWT, verifyAdmin, verifyNotes);

router.route("/admin-login").post(adminLogin);

export default router;
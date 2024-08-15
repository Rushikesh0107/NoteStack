import {Router} from 'express';
import { createNote } from '../controllers/Notes.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/upload-notes').post(verifyJWT, upload.fields([
    {name: "fileUrl", maxCount: 1},
]), createNote);

export default router;
import { ApiErrors } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Notes } from "../models/Notes.model.js";
import { ApiResponse } from "../utils/ApiResponseHandler.js";
import {uploadOnCloudinary} from"../utils/cloudinary.js"
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

export const createNote = asyncHandler(async (req, res) => {
    try {
        const {title, semester, subject, department, module} = req.body;

        if(!(title && semester && subject && department && module)) {
            throw new ApiResponse(400, {}, "All fields are required")
        }

        const notesLocalPath = req.files?.fileUrl[0].path;

        if(!notesLocalPath){
            throw new ApiResponse(400, {}, "File not uploaded")
        }

        const notesCloudinaryPath = await uploadOnCloudinary(notesLocalPath, "notes");

        const note = await Notes.create({
            title,
            fileUrl: notesCloudinaryPath.url,
            semester,
            subject,
            department,
            module,
            user: req.user._id
        })

        if(!note){
            throw new ApiResponse(400, {}, "Note not created try again")
        }

        return res
        .status(201)
        .json(new ApiResponse(201, note, "Note created successfully"))

    } catch (error) {
        throw new ApiErrors(400, error || "Something went wrong while creating note")
    }
})
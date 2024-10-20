import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponseHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { Notes } from "../models/Notes.model.js";

export const getNotes = asyncHandler(async(req, res) => {
    const {subject} = req.body;

    console.log(req.body);

    if(!subject){
        return res.status(400).json(new ApiResponse(400, {}, "Please provide all the required fields"));
    }

    try {
        const notes = await Notes.find({subject})

        console.log("NOTES", notes);

        if(!notes) {
            return res.status(404).json(new ApiResponse(404, {}, "No notes found for the provided department, semester and subject"));
        }

        return res
        .status(200)
        .json(
            new ApiResponse(
                200, 
                notes, 
                "Notes found successfully"
            )
        );

    }catch(e) {
        throw new ApiErrors(400, e.message || "Something went wrong while fetching notes");
    }
})


export const numberOfNotes = asyncHandler(async (req, res) => {
    try {
        const notes = await Notes.find({});

        if(!notes){
            return res.status(404).json(new ApiResponse(404, {}, "No notes found"));
        }

        const numberOfNotes = notes.length;

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {numberOfNotes},
                "Number of notes found successfully"
            )
        );
    }catch(e) {
        throw new ApiErrors(400, e.message || "Something went wrong while fetching notes");
    }
})
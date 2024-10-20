import { ApiErrors } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Pyq } from "../models/Pyq.model.js";
import { ApiResponse } from "../utils/ApiResponseHandler.js";

export const getPYQs = asyncHandler(async (req, res) => {
    const {subject} = req.body;

    if(!subject) {
        return res.status(400).json(new ApiResponse(400, {}, "Please provide the subject"));
    }

    try {
        const pyq = await Pyq.find({
            subject
        })

        if(!pyq) {
            return res.status(404).json(new ApiResponse(404, {}, "No PYQs found for the provided subject"))
        }

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                pyq,
                "PYQs found successfully"
            )
        )
    } catch (e) {
        throw new ApiErrors(400, error || "Something went wrong while fetching PYQs")
    }
})

export const getNumberOfPYQs = asyncHandler(async (req, res) => {
    try{
        const pyq = await Pyq.find({});

        if(!pyq){
            return res.status(404).json(new ApiResponse(404, {}, "No PYQs found"))
        }

        const numberOfPYQs = pyq.length;

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {numberOfPYQs},
                "Number of PYQs found successfully"
            )
        )
    }catch(e){
        throw new ApiErrors(400, e.message || "Something went wrong while fetching PYQs")
    }
})
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponseHandler.js";
import { Subject } from "../models/Subject.model.js";
import { ApiErrors } from "../utils/ApiErrors.js";

export const getSubjects = asyncHandler(async (req, res) => {

    // Extract departmentId and semester from the request body
    const {departmentId, semester} = req.body;

    console.log(req.body);

    console.log("DEPARTMENT ID", departmentId);
    console.log("SEMESTER", semester);

    // Validate the inputs
    if (!departmentId || !semester) {
        return res.status(400).json(new ApiResponse(400, {}, "Please provide both department ID and semester"));
    }

    try {
        // Fetch subjects using departmentId and semester
        const subjects = await Subject.find({
            $or: [
                { departmentId: departmentId },
                { semester: semester },
            ],
        });

        console.log("SUBJECTS", subjects);

        // Check if subjects were found
        if (!subjects || subjects.length === 0) {
            return res.status(404).json(new ApiResponse(404, {}, "No subjects found."));
        }

        // Return the subjects in the response
        return res.status(200).json(new ApiResponse(200, subjects, "Subjects found successfully"));
    } catch (error) {
        // Catch any errors during the process and return a proper error response
        return res.status(400).json(new ApiErrors(400, error.message || "Something went wrong while fetching subjects"));
    }
});

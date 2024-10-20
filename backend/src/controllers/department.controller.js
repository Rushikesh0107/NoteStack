import { ApiResponse } from "../utils/ApiResponseHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { Department } from "../models/Department.model.js";

export const getDepartments = asyncHandler(async (req, res) => {
    try {
        // Fetch all departments
        const departments = await Department.find({});

        // Check if departments were found
        if (!departments || departments.length === 0) {
            return res.status(404).json(new ApiResponse(404, {}, "No departments found"));
        }

        // Return the departments in the response
        return res.status(200).json(new ApiResponse(200, departments, "Departments found successfully"));
    } catch (error) {
        // Catch any errors during the process and return a proper error response
        return res.status(400).json(new ApiErrors(400, error.message || "Something went wrong while fetching departments"));
    }
});

export const getNumberOfDepartments = asyncHandler(async(req, res) => {
    try {
        // Fetch all departments
        const departments = await Department.find({});

        // Check if departments were found
        if (!departments) {
            return res.status(404).json(new ApiResponse(404, {}, "No departments found"));
        }

        // Calculate the number of departments
        const numberOfDepartments = departments.length;

        // Return the number of departments in the response
        return res.status(200).json(new ApiResponse(200, {numberOfDepartments}, "Number of departments found successfully"));
    } catch (error) {
        // Catch any errors during the process and return a proper error response
        return res.status(400).json(new ApiErrors(400, error.message || "Something went wrong while fetching departments"));
    }
})
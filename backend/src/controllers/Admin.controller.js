import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponseHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Pyq } from "../models/Pyq.model.js";
import { Subject } from "../models/Subject.model.js";
import { Department } from "../models/Department.model.js";
import {Notes} from "../models/Notes.model.js"
import { User } from "../models/User.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {generateAccessAndRefreshToken} from "../controllers/User.controller.js"

export const uploadPyq = asyncHandler(async (req, res) => {
    try {
        const {year, semester, subject, department} = req.body;

        if(!(year, semester && subject && department)) {
            throw new ApiResponse(400, {}, "All fields are required")
        }

        const pyqLocalPath = req.files?.fileUrl[0]?.path;

        if(!pyqLocalPath){
            throw new ApiResponse(400, {}, "File not uploaded")
        }

        const pyqCloudinaryPath = await uploadOnCloudinary(pyqLocalPath, "pyq");

        const pyq = await Pyq.create({
            year,
            fileUrl: pyqCloudinaryPath.url,
            semester,
            subject,
            department,
        })

        if(!pyq){
            throw new ApiResponse(400, {}, "Pyq not created try again")
        }

        return res
        .status(201)
        .json(new ApiResponse(201, pyq, "Pyq created successfully"))

    } catch (error) {
        throw new ApiErrors(400, error || "Something went wrong while creating pyq")
    }
})

export const addSubjects = asyncHandler(async (req, res) => {
    try {
        const {name, department, semester} = req.body;

        if(!(name && department && semester)) {
            throw new ApiResponse(400, {}, "Subject is required")
        }

        const subject = await Subject.findOne({
            $or: [{name}]
        })

        if(subject){
            return res
            .status(400)
            .json(
                new ApiResponse(
                    400,
                    {},
                    "Subject already exists"
                )
            )
        }

        const subjects = await Subject.create({
            name,
            department,
            semester
        })

        if(!subjects){
            throw new ApiResponse(400, {}, "Subject not created try again")
        }

        return res
        .status(201)
        .json(new ApiResponse(201, subjects, "Subject created successfully"))

    } catch (error) {
        throw new ApiErrors(400, error || "Something went wrong while creating subject")
    }
})

export const removeSubject = asyncHandler(async (req, res) => {
    try {
        const {name} = req.body;

        if(!(name)) {
            throw new ApiResponse(400, {}, "Subject is required")
        }

        const subject = await Subject.findOneAndDelete({
            $or: [{name}]
        })

        if(!subject){
            throw new ApiResponse(400, {}, "Subject not deleted try again")
        }

        return res
        .status(201)
        .json(new ApiResponse(201, subject, "Subject deleted successfully"))

    } catch (error) {
        throw new ApiErrors(400, error || "Something went wrong while deleting subject")
    }
})

export const addDepartment = asyncHandler(async (req, res) => {
    try {
        const {departmentName} = req.body;

        if(!(departmentName)) {
            throw new ApiResponse(400, {}, "Department Name is required")
        }

        const department = await Department.findOne({
            $or: [{departmentName}]
        })

        if(department){
            return res
            .status(400)
            .json(
                new ApiResponse(
                    400,
                    {},
                    "Department already exists"
                )
            )
        }

        const newlyCreatedDepartment = await Department.create({
            departmentName
        })

        if(!newlyCreatedDepartment){
            throw new ApiResponse(400, {}, "Department not created try again")
        }

        return res
        .status(201)
        .json(new ApiResponse(201, newlyCreatedDepartment, "Department created successfully"))

    } catch (error) {
        throw new ApiErrors(400, error || "Something went wrong while creating department")
    }
})

export const removeDepartment = asyncHandler(async (req, res) => {
    try {
        const {departmentName} = req.body;

        if(!(departmentName)) {
            throw new ApiResponse(400, {}, "Department Name is required")
        }

        const department = await Department.findOneAndDelete({
            $or: [{departmentName}]
        })

        if(!department){
            throw new ApiResponse(400, {}, "Department not deleted try again")
        }

        return res
        .status(201)
        .json(new ApiResponse(201, department, "Department deleted successfully"))

    } catch (error) {
        throw new ApiErrors(400, error || "Something went wrong while deleting department")
    }
})

export const verifyNotes = asyncHandler(async (req, res) => {
    try {
        
        const notesId = req.params._id;
        
        if(!notesId){
            throw new ApiResponse(400, {}, "Notes not found")
        }

        const notes = await Notes.findByIdAndUpdate(
            notesId,
            {verified: true},
            {new: true}
        )

        if(!notes){
            throw new ApiResponse(400, {}, "Notes not found")
        }

        return res
        .status(200)
        .json(new ApiResponse(200, notes, "Notes verified successfully"))

    } catch (error) {
        throw new ApiErrors(400, error || "Something went wrong while verifying notes")
    }
})

export const adminLogin = asyncHandler(async (req, res) => {
    try {
        const {username, password} = req.body;

        if(!(username && password)){
            throw new ApiResponse(400, {}, "All fields are required")
        }

        const user = await User.findOne({
            $or: [{username}]
        })

        if(!user){
            throw new ApiResponse(400, {}, "User not found")
        }

        if(user.role !== "admin"){
            throw new ApiResponse(400, {}, "You are not an admin")
        }

        if(user.isAdmin === false){
            throw new ApiResponse(400, {}, "You are not an admin")
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);

        if(!isPasswordCorrect){
            throw new ApiResponse(400, {}, "Invalid credentials")
        }

        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const option = {
            httpOnly: true,
        }

        return res
        .status(200)
        .cookie("refreshToken", refreshToken, option)
        .cookie("accessToken", accessToken, option)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken
                },
                "Login successfull"
            )
        )

    } catch (error) {
        throw new ApiErrors(400, error || "Something went wrong while logging in")
    }
})


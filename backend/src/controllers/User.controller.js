import { ApiErrors } from "../utils/ApiErrors.js";
import { User } from "../models/User.model.js";
import { ApiResponse } from "../utils/ApiResponseHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (id) => {
    try {
        const user = await User.findById(id)
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiErrors(400, "Something went wrong while generating tokens")
    }
}

export const registerUser = asyncHandler(async (req, res) => {
    console.log("REGISTER USER API", req.body);
    try {
        const {fullname, username, email, password} = req.body;
    
        if(!(fullname && username && email && password)) {
            throw new ApiErrors(400, "All input is required")
        }
    
        const existedUser = await User.findOne({
            $or: [{username}, {email}]
        })
    
        if(existedUser){
            throw new ApiErrors(400, "User already existed")
        }
    
        //console.log(req);
    
        const user = await User.create({
            fullname,
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password,
        })
    
        const createdUser = await User.findById(user._id).select("-password -refreshToken");
    
        if(!createdUser){
            throw new ApiErrors(400, "User not found")
        }
    
        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)
    
        const option = {
            httpOnly: true,
            secure: true
        }
    
        return res
        .status(201)
        .cookie("refreshToken", refreshToken, option)
        .cookie("accessToken", accessToken, option)
        .json(
            new ApiResponse(
                201,
                {
                    createdUser,
                    accessToken
                },
                "User created successfully"
            )
        )
    } catch (error) {
        console.log("ERROR OCCURED AT REGISTER USER API", error);
        throw new ApiErrors(400, error || "Something went wrong while creating user")
    }
})
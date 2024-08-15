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
            throw new ApiResponse(400, {}, "All fields are required")
        }
    
        const existedUser = await User.findOne({
            $or: [{username}, {email}]
        })
    
        if(existedUser){
            throw new ApiResponse(400, {}, "User already existed")
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
            throw new ApiResponse(400, {}, "User not created try again")
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

export const loginUser = asyncHandler (async (req, res) => {
    const {username, password} = req.body;
    
    if(!(username)){
        throw new ApiResponse(400, {}, "Username is required")
    }
    
    if(!password){
        throw new ApiErrors(400, "Password is required")
    }

    const user = await User.findOne({
        $or: [{username}]
    })

    if(!user){
        return res
        .status(400)
        .json(
            new ApiResponse(
                400,
                {},
                "User not found"
            )
        )
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    //console.log(isPasswordCorrect);

    if(!isPasswordCorrect){
        //throw new ApiErrors(400, "Password is not correct")
        return res
        .status(400)
        .json(
            new ApiResponse(
                400,
                {},
                "Password is not correct"
            )
        )
    }


    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)
    
    const logedInUser = await User.findById(user._id).select("-password -refreshToken");

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
                user: logedInUser,
                accessToken
            },
            "User loged in successfully"
        )
    )
})

export const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id, 
        {
            $set: {
                refreshToken: ""
            }
        },
        {
            new: true,
        }
    );

    const option = {
        httpOnly: true,
    }

    return res
    .status(200)
    .clearCookie("refreshToken", option)
    .clearCookie("accessToken", option)
    .json(
        new ApiResponse(
            200,
            {},
            "User loged out successfully"
        )
    )
})

export const refreshAccessToken = asyncHandler(async (req, res) => {
    
    const incommingUserId = req.user._id;

    // console.log("INCOMMING USER ID", incommingUserId);

    if(!incommingUserId){
        throw new ApiErrors(400, "id is required")
    }

    const user = await User.findById(incommingUserId)

    if(!user){
        throw new ApiErrors(404, "User not found")
    }

    const incomingRefreshToken = user.refreshToken


    if (!incomingRefreshToken) {
        throw new ApiErrors(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiErrors(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiResponse(401, {}, "Session expired")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiErrors(401, error?.message || "Invalid refresh token")
    }

})

export const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})

import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.model.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.headers["authorization"]?.replace("Bearer ", "");
        //console.log(token);

        if(!token){
            throw new ApiErrors(401, "Unauthorized access")
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded._id);

        if(!user){
            throw new ApiErrors(401, "Access Denied")
        }

        req.user = user;
        next();
    } catch (error) {
        if(error.message === "jwt expired"){
            return res
            .status(401)
            .json({
                success: false,
                message: "Access token expired"
            })
        }
        throw new ApiErrors(400, error || "Invalid token")
    }
})  

export { verifyJWT }
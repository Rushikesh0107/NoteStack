import { asyncHandler } from "../utils/asyncHandler.js"

const verifyAdmin = asyncHandler(async (req, res, next) => {

    if(req.user.role !== "admin"){
        return res.status(403)
        .json({
            status: 403,
            message: "You are not authorized to access this route"
        })
    }

    next()
});

export { verifyAdmin }
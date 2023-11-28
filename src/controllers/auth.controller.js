import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const login = asyncHandler(async(req,res) => {
    const {username , password} = req.body;
    const checkUser = await User.findOne({"username" : username})
    

    if (checkUser.isPasswordCorrect(password)) {
        const accessToken = await checkUser.generateAccessToken();
        const refreshtoken = await checkUser.generateRefreshToken();
        res.cookie("ACCESS_TOKEN" , accessToken ,  { httpOnly: true });
        checkUser.refreshtoken = refreshtoken;
        await checkUser.save();
        res.status(200).json(
            new ApiResponse(200,username,"User logged in successfully")
        )
    } else {
        throw new ApiError(400,"User not found please enter correct credentials")
    }
})

const logout = asyncHandler(async(req,res) => {
    const access = req.cookies["ACCESS_TOKEN"];
    res.clearCookie("ACCESS_TOKEN")
    res.status(200).json(new ApiResponse(200,"logout", "Logged out successfully"))
})

export {login , logout}
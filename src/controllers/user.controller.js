import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async(req,res) => {
    const {username , password} = req.body

    const usernameExsists = await User.findOne({"username" : username})
    if(usernameExsists){
        throw new ApiError(409 , "User with same username exsists")
    }

    const user = await User.create({
        username , password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshtoken")
    if (!createdUser) {
        throw new ApiError(500 , "Something went wrong while registering the user")
    } else {
        res.status(200).json(
            new ApiResponse(200 , createdUser , "User created Successfully")
        )
    }

})


const loginUser = asyncHandler(async (req,res) => {
    
})

export {registerUser}

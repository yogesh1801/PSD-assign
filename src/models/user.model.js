import mongoose , {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchema =  new Schema({
    username : {
        type : String,
        required : [true , "Username is required"],
        unique : true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String,
        required : [true,"password is required"]

    },
    refreshtoken : {
        type : String
    }
},{timestamps : true})

// it is a middleware type thing

userSchema.pre("save" , async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function() {
    return jwt.sign({
        _id : this._id,
        username : this.username
    }, process.env.ACCESS_TOKEN_KEY , {expiresIn : process.env.ACCESS_TOKEN_EXPIRY})
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign ( {
        _id : this._id,
    } , process.env.REFRESH_TOKEN_KEY,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
}

export const User = mongoose.model("User" , userSchema);
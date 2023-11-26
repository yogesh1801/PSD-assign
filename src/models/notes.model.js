import mongoose ,{ Schema } from "mongoose";

const noteSchema = new Schema({
    title : {
        type : String,
        required : true,
        trim : true
    } ,
    content : {
        type : String,
        required : true,
        trim : true
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
}, {
    timestamps : true
})

export const Notes = mongoose.model("Notes" , noteSchema)

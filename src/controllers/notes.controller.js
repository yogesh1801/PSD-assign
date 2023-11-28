import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Notes } from "../models/notes.model.js";

const createNote = asyncHandler(async(req,res) => {
    const note = req.body;
    const newNote = await Notes.create({
        title : note.title,
        content : note.content,
        tags : note.tags,
    })
    await newNote.save();
    if(newNote){
        res.status(200).json(
            new ApiResponse(200,req.title,"Note created successfully")
        )
    } else {
        res.status(400).json(
            new ApiError(400,"Note creation failed")
        )
    }
})

export {createNote}
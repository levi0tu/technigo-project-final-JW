import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120,
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000,
    },
})

export const Lesson = mongoose.model("Lesson", lessonSchema)
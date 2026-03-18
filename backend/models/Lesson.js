import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
})

export const Lesson = mongoose.model("Lesson", lessonSchema)
import mongoose from "mongoose";

const debtSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },

    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },

    monthlyPayment: {
        type: Number,
        required: true,
        min: 0,
    },

    interestRate: {
        type: Number,
        required: true,
        min: 0,
    },
})
export const Debt = mongoose.model("Debt", debtSchema)

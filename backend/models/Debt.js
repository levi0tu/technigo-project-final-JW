import mongoose from "mongoose";

const debtSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String },
    totalAmount: { type: Number },
    monthlyPayment: { type: Number },
    interestRate: { type: Number },
})
export const Debt = mongoose.model("Debt", debtSchema)

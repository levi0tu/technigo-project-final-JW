import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    debtId: { type: mongoose.Schema.Types.ObjectId, ref: "Debt" },
    amount: { type: Number },
    paymentDate: { type: String },
})

export const Payment = mongoose.model("Payment", paymentSchema)
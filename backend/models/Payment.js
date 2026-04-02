import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    debtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Debt",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
})

export const Payment = mongoose.model("Payment", paymentSchema)
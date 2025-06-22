import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        issuedBy: String,
        issuedto: String,
        issueDate: Date,
        returned: Boolean,
        returnDate: Date,
        bookName: String,
    }
)

export const transactionModel = mongoose.model("transaction", transactionSchema)
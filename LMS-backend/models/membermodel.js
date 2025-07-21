
import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    members: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }
})

export const MemberModel = mongoose.model("members", memberSchema);
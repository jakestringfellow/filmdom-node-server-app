import mongoose from "mongoose";
const followsSchema = mongoose.Schema(
    {
        follower: { type: mongoose.Schema.Types.ObjectId, ref: "Users"},
        followed: { type: mongoose.Schema.Types.ObjectId, ref: "Users"},
    }, 
    { collection: "follows"}
);

export default mongoose.model("Follows", followsSchema);
import mongoose from "mongoose";
const likesSchema = mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie"},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users"}
}, { collection: "likes" }
); 
export default mongoose.model("Likes", likesSchema);
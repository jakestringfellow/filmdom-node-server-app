import mongoose from "mongoose";
const reviewsSchema = mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie"},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users"},
    review: {type: String},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0}
    
}, { collection: "reviews" }
); 
export default mongoose.model("Reviews", reviewsSchema);
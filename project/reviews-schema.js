import mongoose from "mongoose";
const reviewsSchema = mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie"},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users"},
    review: {type: String}
}, { collection: "reviews" }
); 
export default mongoose.model("Reviews", reviewsSchema);
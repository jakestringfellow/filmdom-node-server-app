import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
    title: String,
    imbdId: String,
    released: Date,
    genre: String,
    likes: {type: Number, default: 0}
    },
    { collection: "movies" }
);

export default mongoose.model("Movie", movieSchema);
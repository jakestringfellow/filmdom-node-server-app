import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
    title: String,
    imdbId: String,
    released: Date,
    genre: String,
    image: String,
    likes: {type: Number, default: 0}
    },
    { collection: "movies" }
);

export default mongoose.model("Movie", movieSchema);
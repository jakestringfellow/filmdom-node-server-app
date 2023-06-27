import movieModel from "./movie-schema.js";
import likesModel from "./likes-schema.js";

export const findAllMovies = () => movieModel.find();
export const findMovieById = (id) => movieModel.findById(id);
export const findMovieByMovieId = (movieId) => movieModel.findOne({ movieId })
export const createMovie = (movie) => movieModel.create(movie);

export const createLike = (id, userId) => likesModel.create({movie: id, user: userId });

export const findLikesForUser = (userId) => 
    likesModel.find({ user: userId }).populate("movie").exec();
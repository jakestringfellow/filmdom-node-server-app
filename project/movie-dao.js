import movieModel from "./movie-schema.js";

export const findAllMovies = () => movieModel.find();
export const findMovieById = (id) => movieModel.findById(id);
export const findMovieByMovieId = (movieId) => movieModel.findOne({ movieId })
export const createMovie = (movie) => movieModel.create(movie);
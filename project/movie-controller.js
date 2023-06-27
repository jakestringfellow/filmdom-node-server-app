import * as dao from "./movie-dao.js";

export default function MovieController(app) {

    const findAllMovies = async (req, res) => {
        const movies = await dao.findAllMovies()
        res.json(movies)
    }

    const findMovieById = async (req, res) => {
        const id = req.params.id
        const movie = await dao.findMovieById(id)
        res.json(movie)
    }

    const findMovieByMovieId = async (req, res) => {
        const movieId = req.params.movieId
        const movie = await dao.findMovieByMovieId(movieId)
        res.json(movie)
    }

    const createMovie = async (req, res) => {
        const movie = req.body
        const newMovie = await dao.createMovie(movie)
        res.json(newMovie)
    }

    const likeMovie = async (req, res) => {
        const movieId = req.params.movieId;
        const movie = await dao.findMovieByMovieId(movieId);
        if (movie) {
            movie.likes = movie.likes + 1;
            await movie.save();
            res.json(movie);
        } else {
            const newMovie = await dao.createAlbum({...req.body, imdbId, likes: 1});
            res.json(newMovie);
        }
    }

    app.get("/api/movies", findAllMovies);
    app.get("/api/movies/:id", findMovieById);
    app.get("/api/movies/movieId/:movieId", findMovieByMovieId);
    app.post("/api/movies", createMovie);
    app.post("/api/movies/movieId/:movieId/like", likeMovie);
}
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
        const movie = req.body;
        const newMovie = await dao.createMovie(movie);
        res.json(newMovie);
    }

    const likeMovie = async (req, res) => {
        const movieId = req.params.movieId;
        const movie = await dao.findMovieByMovieId(movieId);
        let tempMovie = null;
        if (movie) {
            movie.likes = movie.likes + 1;
            await movie.save();
            tempMovie = movie;   //res.json(movie);
        } else {
            const newMovie = await dao.createMovie({...req.body, likes: 1});
            tempMovie = newMovie; //res.json(newMovie);
        }
        const currentUser = req.session["currentUser"];
        console.log("req.session", req.session);
        const userId = currentUser._id;
        await dao.createLike(tempMovie._id, userId);
        res.json(tempMovie);
    }

    const findMoviesILike = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const userId = currentUser._id;
        const likes = await dao.findLikesForUser(userId);
        const movies = likes.map((like) => like.movie);
        res.json(movies);
    };

    const findLikesForMovie = async (req, res) => {
        const id = req.params.id;
        console.log("id", id);
        const actualMovie = await dao.findMovieByMovieId(id);
        if (actualMovie) {
            console.log("actualMovie", actualMovie);
            const likes = await dao.findLikesForMovie(actualMovie._id);
            const users = likes.map((like) => like.user);
            res.json(users);
            return;
        }
        
        res.json([]);
    };

    app.get("/api/movies", findAllMovies);
    app.get("/api/movies/:id", findMovieById);
    app.get("/api/movies/movieId/:movieId", findMovieByMovieId);
    app.post("/api/movies", createMovie);
    app.post("/api/movies/movieId/:movieId/like", likeMovie);
    app.get("/api/movies/i/like", findMoviesILike);
    app.get("/api/movies/movieId/:id/likes", findLikesForMovie);
}
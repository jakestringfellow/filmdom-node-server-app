import * as reviewsDao from "./reviews-dao.js";
import * as movieDao from "./movie-dao.js";
import * as followsDao from "./follows-dao.js";

export default function ReviewsController(app) {

    const reviewMovie = async (req, res) => {
        console.log("reviewMovie called")
        const movieId = req.params.movieId;
        const newReview = req.body.reviewString;
        console.log("Movie arg: ", req.body.movie);
        console.log("reviewString", newReview);
        const movie = await movieDao.findMovieByMovieId(movieId);
        let tempMovie = null;
        if (movie) {
            console.log("found movie")
            //movie.reviews = movie.reviews + 1;
            //await movie.save();
            tempMovie = movie;   //res.json(movie);
        } else {
            console.log("creates a new movie to review")
            const newMovie = await movieDao.createMovie(req.body.movie)//, reviews: 1});
            tempMovie = newMovie; //res.json(newMovie);
        }
        const currentUser = req.session["currentUser"];
        console.log("req.session", req.session);
        const userId = currentUser._id;
        const insertedReview = await reviewsDao.createReview(tempMovie._id, userId, newReview);
        res.json(insertedReview);
    }

    const findReviews = async (req, res) => {
        const reviews = await reviewsDao.findReviews();
        res.json(reviews);
    }

    const findMyReviews = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const userId = currentUser._id;
        const reviews = await reviewsDao.findReviewsForUser(userId);
        console.log("REVIEWS: ", reviews);
        //const movies = reviews.map((review) => review.movie);
        // res.json(movies);
        res.json(reviews);
    };

    const findReviewsForMovie = async (req, res) => {
        const id = req.params.id;
        console.log("id", id);
        const actualMovie = await movieDao.findMovieByMovieId(id);
        if (actualMovie) {
            console.log("actualMovie", actualMovie);
            const reviews = await reviewsDao.findReviewsForMovie(actualMovie._id);
            //const users = reviews.map((review) => review.user);
            res.json(reviews);
            return;
        }
        
        res.json([]);
    };

    const findUserReviews = async (req, res) => {
        const id = req.params.id;
        const reviews = await reviewsDao.findReviewsForUser(id);
        //console.log("REVIEWS: ", reviews);
        //const movies = reviews.map((review) => review.movie);
        // res.json(movies);
        res.json(reviews);
    }

    const findFollowingReviews = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const follower = currentUser._id;
        const allReviews = await reviewsDao.findReviews();
        console.log("ALL REVIEWS", allReviews);
        const follows = await followsDao.findFollowsByFollower(follower);
        const followsIds = follows.map((follow) => JSON.stringify(follow.followed._id));
        const followingReviews = allReviews.filter(review => followsIds.includes(JSON.stringify(review.user._id)));
        console.log("USER RESULTS: ", allReviews.map((review) => review.user));
        console.log("FOLLOWS ID RESULTS: ", followsIds);


        // const people = follows.map((follow) => follow.followed);
        // const reviews = people.map((person) => person = reviewsDao.findReviewsForUser(person._id));
        console.log("FOLLOWED REVIEWS: ", followingReviews);
        res.json(followingReviews);

    }

    const deleteReview = async (req, res) => {
        const reviewIdToDelete = req.params.id;
        const status = await reviewsDao.deleteReview(reviewIdToDelete);
        console.log("DELETE STATUS: ", status);
        res.json(status);
    }

    const updateReview = async (req, res) => {
        const reviewIdToUpdate = req.params.id;                           
        const updates = req.body;                                  
        const status = await reviewsDao.updateReview(reviewIdToUpdate, updates); 
        res.json(status);                                                 
    }

    // const findReviewsFromFollowing = async (req, res) => {
    //     const currentUser = req.session["currentUser"];
    //     const userId = currentUser._id;
    //     const reviews = await reviewsDao.findReviewsForUser(userId);
    //     //console.log("REVIEWS: ", reviews);
    //     //const reviews = follows.map((follow) => follow.reviews);
    //     // res.json(movies);
    //     res.json(reviews);
        
    // }

    app.post("/api/movies/movieId/:movieId/review", reviewMovie);
    app.get('/api/reviews', findReviews);
    app.get("/api/movies/i/review", findMyReviews);
    app.get("/api/movies/movieId/:id/reviews", findReviewsForMovie);
    app.get("/api/movies/user/:id/review", findUserReviews);
    app.get("/api/movies/following/review", findFollowingReviews);
    app.delete("/api/reviews/:id", deleteReview);
    app.put('/api/reviews/:id', updateReview);

};

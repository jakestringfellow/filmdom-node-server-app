import reviewsModel from "./reviews-schema.js";

export const findReviews = () => reviewsModel.find().populate("movie").populate("user");

export const createReview = (id, userId, reviewString) => 
    reviewsModel.create({movie: id, user: userId,  review: reviewString});

export const findReviewsForUser = (userId) => 
    reviewsModel.find({ user: userId }).populate("movie").populate("user").exec();
    

export const findReviewsForMovie = (imdbId) => 
    reviewsModel.find({ movie: imdbId }).populate("user").populate("movie").exec();

export const deleteReview = (id) => reviewsModel.deleteOne({_id: id});

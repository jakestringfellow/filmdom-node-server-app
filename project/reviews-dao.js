import reviewsModel from "./reviews-schema.js";

export const findReviews = () => reviewsModel.find();

export const createReview = (id, userId, reviewString) => 
    reviewsModel.create({movie: id, user: userId,  review: reviewString});

export const findReviewsForUser = (userId) => 
    likesModel.find({ user: userId }).populate("review").exec();

export const findReviewsForMovie = (imdbId) => 
    likesModel.find({ movie: imdbId }).populate("review").exec();
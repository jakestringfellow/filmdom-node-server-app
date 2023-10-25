import dotenv from 'dotenv';
dotenv.config();



import express from 'express';
import cors from 'cors';
import session from "express-session";
import mongoose from "mongoose";    // Load the mongoose library

import AuthController from './users/auth-controller.js';
import UserController from './users/users-controller.js';
import TuitsController from "./tuits/tuits-controller.js"
import MovieController from './project/movie-controller.js';
import FollowsController from './project/follows-controller.js';
import ReviewsController from './project/reviews-controller.js';

//const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/tuiter';//process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter';
const CONNECTION_STRING = process.env.MONGO_URI;
const conn = mongoose.connect(CONNECTION_STRING);

//mongoose.connect("mongodb://127.0.0.1:27012/tuiter"); // connect to the tuiter database



const app = express();

const allowedOrigins = ["http://localhost:3000", "https://filmdom.netlify.app"];

app.use(
    cors({                           // restrict cross origin resource sharing 
        origin: function(origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS polciy for this site does not allow access from the specified origin: ${origin}';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,           // to the react application
        methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
        preflightContinue: false, 
        optionsSuccessStatus: 204,
        //origin: "http://localhost:3000", 
    })
);

app.use(express.json());

app.use(
    session({                       // Configure server session
        secret: "any string",
        resave: false,
        saveUninitialized: false,
    })
);

app.get('/', (req, res) => {
    res.send('Server running');
});

AuthController(app);
UserController(app);
TuitsController(app);
MovieController(app);
FollowsController(app);
ReviewsController(app);

const port = process.env.PORT || 4000;
app.listen(port), () => {
    console.log('Server started on port ${port}');
};


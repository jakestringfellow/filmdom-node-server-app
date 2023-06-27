import express from 'express';
import cors from 'cors';
import HelloController from "./controllers/hello-controller.js"
import UserController from './users/users-controller.js';
import TuitsController from "./tuits/tuits-controller.js"
import session from "express-session";
import AuthController from './users/auth-controller.js';
import mongoose from "mongoose";    // Load the mongoose library
import MovieController from './project/movie-controller.js';
import FollowsController from './project/follows-controller.js';
import ReviewsController from './project/reviews-controller.js';

const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/tuiter';//process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter';
const conn = mongoose.connect(CONNECTION_STRING);

//mongoose.connect("mongodb://127.0.0.1:27012/tuiter"); // connect to the tuiter database


const app = express();
app.use(
    session({                       // Configure server session
        secret: "any string",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(
    cors({                           // restrict cross origin resource sharing 
        credentials: true,           // to the react application
        origin: "http://localhost:3000", 
    })
);
app.use(express.json());

AuthController(app);
UserController(app);
TuitsController(app);
MovieController(app);
FollowsController(app);
ReviewsController(app);

const port = process.env.PORT || 4000;
app.listen(port);

//app.use(cors());
//app.use(express.json());

//HelloController(app);

//app.listen(4000);
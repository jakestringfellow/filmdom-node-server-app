import * as dao from "./follows-dao.js";

export default function FollowsController(app) {
    
    const findAllFollows = async (req, res) => {
        const follows = await dao.findAllFollows();
        res.json(follows);
    }

    const findFollowsByFollower = async (req, res) => {
        const follower = req.params.follower;
        const follows = await dao.findFollowsByFollower(follower);
        res.json(follows);
    }

    const findFollowsByFollowed = async (req, res) => {
        const followed = req.params.followed;
        const follows = await dao.findFollowsByFollowed(followed);
        console.log("follows", follows);
        res.json(follows);
    }

    const createFollow = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const follower = currentUser._id;
        const followed = req.params.followed;
        const newFollow = await dao.createFollow({
            follower,
            followed,
        });
        res.json(newFollow);
    }

    const deleteFollow = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const follower = currentUser._id;
        const followed = req.params.followed;
        const newFollow = await dao.deleteFollow({
            follower,
            followed,
        });
        res.json(newFollow);
    }

    const findPeopleIFollowed = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const follower = currentUser._id;
        const follows = await dao.findFollowsByFollower(follower);
        const people = follows.map((follow) => follow.followed);
        res.json(people);
    };

    const findPeopleWhoFollowedMe = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const followed = currentUser._id;
        const follows = await dao.findFollowsByFollowed(followed);
        console.log("FOLLOWS: ", follows)
        const people = follows.map((follow) => follow.follower);
        res.json(people);
    };

    app.get("/api/follows", findAllFollows);
    app.get("/api/follows/follower/:follower", findFollowsByFollower);
    app.get("/api/follows/followed/:followed", findFollowsByFollowed);
    app.post("/api/follows/followed/:followed", createFollow);
    app.delete("/api/follows/followed/:followed", deleteFollow);
    app.get("/api/follows/i/followed", findPeopleIFollowed);
    app.get("/api/follows/i/followed/me", findPeopleWhoFollowedMe);
}

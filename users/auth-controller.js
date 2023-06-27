import * as usersDao from "./users-dao.js";

const AuthController = (app) => {

    const register = async (req, res) => {
        const user = await usersDao.findUserByUsername(req.body.username);
        console.log(user);
        if (user) {
            res.sendStatus(409);
            return;
        }
        const newUser = await usersDao.createUser(req.body);
        req.session["currentUser"] = newUser;
        console.log(req.session["currentUser"]);
        res.json(newUser);
    };

    const login = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            const user = await usersDao.findUserByCredentials(username, password);
            console.log(user);
            if (user) {
                req.session["currentUser"] = user;
                res.json(user);
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(403);
        }
    };

    const profile = (req, res) => {
        const currentUser = req.session["currentUser"];
        console.log(currentUser);
        if (currentUser) {
            res.json(currentUser);
        } else {
            res.sendStatus(403);
        }
    };

    const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };


    app.post("/api/users/register", register);
    app.post("/api/users/login",    login);
    app.post("/api/users/profile",  profile);
    app.post("/api/users/logout",   logout);
    
};
export default AuthController;
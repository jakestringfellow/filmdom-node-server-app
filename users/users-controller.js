import * as usersDao from "./users-dao.js";

const UserController = (app) => {               // use express instance app to declare HTTP GET

    const findAllUsers = async (req, res) => {
        const username = req.query.username;
        const password = req.query.password;
        if (username && password) {
            const user = await usersDao.findUserByCredentials(username, password);
            console.log(username);
            console.log(password);
            if (user) {
                res.json(user);
            }
            else {
                res.sendStatus(404);
            }
        } else if (username) {
            const user = await usersDao.findUserByUsername(username);
            if (user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        } else {
            const users = await usersDao.findAllUsers();
            res.json(users);
        }
    };

    const findUserByID = async (req, res) => {
        const id = req.params.uid;
        const user =  await usersDao.findUserById(id);
        res.json(user);
    };

    const createUser = async (req, res) => {              // function invoked if URL matches pattern
        const newUser = await usersDao.createUser(req.body); //req.body;                   // extract new user from BODY in request
        res.json(newUser);                          // respond with new user to client
    };

    const deleteUser = async (req, res) => {
        const id = req.params.uid;                  // get user ID from path parameter uid filter out the user
        const status = await usersDao.deleteUser(id);
        res.json(status);
    };

    const updateUser = async (req, res) => {                      // handle PUT /api/users/:uid
        const id = req.params.uid;                   // get user ID from path
        const status = await usersDao.updateUser(id, req.body);
        const user = await usersDao.findUserById(id);
        req.session["current user"] = user;
        res.json(status);
    };


    app.get('/api/users', findAllUsers)            // request pattern /api/users to call a function
    app.get('/api/users/:uid', findUserByID);
    app.post('/api/users', createUser);         // map URL pattern to handler function
    app.delete('/api/users/:uid', deleteUser);  
    app.put('/api/users/:uid', updateUser);
};

export default UserController                   // exports so app.js can import
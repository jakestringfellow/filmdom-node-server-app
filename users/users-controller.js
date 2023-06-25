// import people from './users.js'                 // import the array of users. Include the extension
// let users = people   
import * as usersDao from "./users-dao.js";

const UserController = (app) => {               // use express instance app to declare HTTP GET
    app.get('/api/users', findAllUsers)            // request pattern /api/users to call a function
    app.get('/api/users/:uid', findUserByID);
    app.post('/api/users', createUser);         // map URL pattern to handler function
    app.delete('/api/users/:uid', deleteUser);  
    app.put('/api/users/:uid', updateUser);
}


const updateUser = async (req, res) => {                      // handle PUT /api/users/:uid
    const userId = req.params['uid'];                   // get user ID from path
    //const updates = req.body;                           // BODY includes updated fields
    //users = users.map((usr) =>                          // create a new array of users
    //    usr._id === userId ?                            // if current user's ID matches the ID we want to update
    //    {...usr, ...updates} :                          // merge old usr with new updates
    //    usr                                             // otherwise keep old user
    //);
    //res.sendStatus(200);
    const status = await usersDao.updateUser(userId, req.body);
    const user = await usersDao.findUserById(id);
    req.session["current user"] = user;
    res.json(status);
};

const deleteUser = async (req, res) => {
    const userId = req.params['uid'];                  // get user ID from path parameter uid filter out the user
    //users = users.filter(usr => usr._id !== userId);   // whose ID is the ID of the user we want to remove
    const status = await usersDao.deleteUser(userId);
    //res.sendStatus(200);                               // respond with success code
    res.json(status);
};

const createUser = async (req, res) => {              // function invoked if URL matches pattern
    const newUser = await usersDao.createUser(req.body); //req.body;                   // extract new user from BODY in request
    //newUser._id = (new Date()).getTime() + '';  // add an _id property with unique timestamp
    //users.push(newUser);                        // append new user to users array
    res.json(newUser);                          // respond with new user to client
}

const findUserByID = async (req, res) => {
    const userId = req.params.uid;
    const user =  await usersDao.findUserById(userId);
    //users.find(u => u._id === userId);
    res.json(user);
}

//const findUsers = (req, res) => {               // function runs when /api/users requested
//    const type = req.query.type
//    if(type) {
//        const userOfType = users.filter(u => u.type === type) 
//        res.json(userOfType)
//        return
//    }
//
//    res.json(users)                             // responds with JSON array of users
//}
const findAllUsers = async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    if (username && password) {
        const user = await usersDao.findUserByCredentials(username, password);
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

export default UserController                   // exports so app.js can import
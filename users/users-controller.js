import people from './users.js'                 // import the array of users. Include the extension

let users = people                      
const UserController = (app) => {               // use express instance app to declare HTTP GET
    app.get('/api/users', findUsers)            // request pattern /api/users to call a function
    app.get('/api/users/:uid', findUserByID);
    app.post('/api/users', createUser);         // map URL pattern to handler function
    app.delete('/api/users/:uid', deleteUser);  
    app.put('/api/users/:uid', updateUser);
}


const updateUser = (req, res) => {                      // handle PUT /api/users/:uid
    const userId = req.params['uid'];                   // get user ID from path
    const updates = req.body;                           // BODY includes updated fields
    users = users.map((usr) =>                          // create a new array of users
        usr._id === userId ?                            // if current user's ID matches the ID we want to update
        {...usr, ...updates} :                          // merge old usr with new updates
        usr                                             // otherwise keep old user
    );
    res.sendStatus(200);
}
const deleteUser = (req, res) => {
    const userId = req.params['uid'];                  // get user ID from path parameter uid filter out the user
    users = users.filter(usr => usr._id !== userId);   // whose ID is the ID of the user we want to remove
    res.sendStatus(200);                               // respond with success code
}

const createUser = (req, res) => {              // function invoked if URL matches pattern
    const newUser = req.body;                   // extract new user from BODY in request
    newUser._id = (new Date()).getTime() + '';  // add an _id property with unique timestamp
    users.push(newUser);                        // append new user to users array
    res.json(newUser);                          // respond with new user to client
}

const findUserByID = (req, res) => {
    const userId = req.params.uid;
    const user = users.find(u => u._id === userId);
    res.json(user);
}

const findUsers = (req, res) => {               // function runs when /api/users requested
    const type = req.query.type
    if(type) {
        const userOfType = users.filter(u => u.type === type) 
        res.json(userOfType)
        return
    }

    res.json(users)                             // responds with JSON array of users
}
export default UserController                   // exports so app.js can import
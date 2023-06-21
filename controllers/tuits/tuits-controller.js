//import posts from "./tuits.js";
//let tuits = posts;
import * as tuitsDao from '../tuits/tuits-dao.js'         // import the dao

const createTuit = async (req, res) => {
    const newTuit = req.body;                       // retrieve data from HTTP body
    //newTuit._id = (new Date()).getTime() + '';      // add _id field as a time stamp
    newTuit.likes = 0;                              // initialize likes counter
    newTuit.liked = false;                          // initialize liked flag
    //tuits.push(newTuit);                            // append new tuit to tuits array
    const insertedTuit = await tuitsDao.createTuit(newTuit);    // actual tuit inserted in database with dao's createtuit
    res.json(insertedTuit);                              // respond with new tuit
}

const findTuits  = async (req, res) => {            // retrieve tuits from database
    const tuits = await tuitsDao.findTuits();   
    res.json(tuits);
}

const updateTuit = async (req, res) => {
    const tuitIdToUpdate = req.params.tid;                              // get ID of tuit to update from path
    const updates = req.body;                                   // get updates from HTTP body
    //const tuitIndex = tuits.findIndex((t)=> t._id === tuitId)    // find index of tuit to update in the tuits array
    //tuits[tuitIndex] = {...tuits[tuitIndex], ...updates};       // update the element in tuits array merging old tuit
    //res.sendStatus(200);                                        // with updates and respond with success
    const status = await tuitsDao.updateTuit(tuitIdToUpdate, updates); // status reports success/failure
    res.json(status);                                                  // to update doc in database
}

const deleteTuit = async (req, res) => {
    const tuitIdToDelete = req.params.tid;      // retrieve the ID of the tuit we want to remove
    const status = await tuitsDao.deleteTuit(tuitIdToDelete);   // success/failure status deleting record from db
    //tuits = tuits.filter((t) =>                 // filter out the tuit from the tuits array
    //    t._id !== tuitIdToDelete);
    //res.sendStatus(200);                        // respond with success
    res.json(status);
}

export default (app) => {
 app.post('/api/tuits', createTuit);
 app.get('/api/tuits', findTuits);
 app.put('/api/tuits/:tid', updateTuit);
 app.delete('/api/tuits/:tid', deleteTuit);
}

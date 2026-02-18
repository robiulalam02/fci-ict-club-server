const { MongoClient, ServerApiVersion } = require('mongodb');

// Internal helper to get connection variables
const getUri = () => {
    if (!process.env.MONGODB_URI) {
        require('dotenv').config();
    }
    return process.env.MONGODB_URI;
};

const client = new MongoClient(getUri() || "", {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000
});

// We do NOT call client.db() at the top level. 
// We export a function that controllers will call.
const getDB = () => client.db();

const collections = {
    get users() { return getDB().collection("users") },
    get certificates() { return getDB().collection("certificates") },
    get reviews() { return getDB().collection("reviews") },
    get notices() { return getDB().collection("notices") },
    get mentors() { return getDB().collection("mentors") },
};

module.exports = { client, collections };
const { MongoClient, ServerApiVersion } = require('mongodb');

// Only load dotenv if MONGODB_URI isn't already in the environment
if (!process.env.MONGODB_URI) {
    require('dotenv').config();
}

const client = new MongoClient(process.env.MONGODB_URI || "", {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    },
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000
});

const db = client.db();

const collections = {
    users: db.collection("users"),
    certificates: db.collection("certificates"),
    reviews: db.collection("reviews"),
    notices: db.collection("notices"),
    mentors: db.collection("mentors"),
};

module.exports = { client, collections };
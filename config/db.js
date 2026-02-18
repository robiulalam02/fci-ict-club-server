const { MongoClient, ServerApiVersion } = require('mongodb');

// Ensure variables are loaded if we are not on the cPanel server
if (!process.env.MONGODB_URI) {
    require('dotenv').config();
}

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error("❌ MONGODB_URI is not defined. Check your .env file or cPanel variables.");
}

const client = new MongoClient(uri || "", {
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
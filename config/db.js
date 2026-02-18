const { MongoClient, ServerApiVersion } = require('mongodb');

// Add this at the very top of db.js
if (!process.env.MONGODB_URI) {
    require('dotenv').config();
}

const uri = process.env.MONGODB_URI;

// Safety check to prevent the 'startsWith' crash
if (!uri) {
    throw new Error("❌ MONGODB_URI is not defined in environment variables");
}

const client = new MongoClient(uri, {
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
const { MongoClient } = require('mongodb');

// Function to get collections only when called
const getCollections = () => {
    if (!process.env.MONGODB_URI) {
        require('dotenv').config();
    }
    const client = new MongoClient(process.env.MONGODB_URI || "");
    const db = client.db();
    return {
        users: db.collection("users"),
        certificates: db.collection("certificates"),
        reviews: db.collection("reviews"),
        notices: db.collection("notices"),
        mentors: db.collection("mentors"),
    };
};

module.exports = { getCollections };
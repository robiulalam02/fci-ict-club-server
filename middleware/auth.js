const jwt = require('jsonwebtoken');
const { collections } = require('../config/db');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'unauthorized access' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(401).send({ message: 'unauthorized access' });
        req.decoded = decoded;
        next();
    });
};

const verifyAdmin = async (req, res, next) => {
    const user = await collections.users.findOne({ email: req.decoded.email });
    if (user?.role !== 'admin') return res.status(403).send({ message: 'forbidden access' });
    next();
};

const verifyMentor = async (req, res, next) => {
    const user = await collections.users.findOne({ email: req.decoded.email });
    if (user?.role !== 'mentor') return res.status(403).send({ message: 'forbidden access' });
    next();
};

module.exports = { verifyToken, verifyAdmin, verifyMentor };
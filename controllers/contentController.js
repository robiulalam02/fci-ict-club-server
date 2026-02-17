const { collections } = require('../config/db');
const { ObjectId } = require('mongodb');

// --- NOTICE LOGIC ---
const getNotices = async (req, res) => {
    const result = await collections.notices.find().sort({ createdAt: -1 }).toArray();
    res.send(result);
};

const createNotice = async (req, res) => {
    const result = await collections.notices.insertOne({ ...req.body, createdAt: new Date() });
    res.status(201).send(result);
};

const updateNotice = async (req, res) => {
    const filter = { _id: new ObjectId(req.params.id) };
    const updateDoc = { $set: { ...req.body, updatedAt: new Date() } };
    const result = await collections.notices.updateOne(filter, updateDoc);
    res.send(result);
};

const deleteNotice = async (req, res) => {
    const result = await collections.notices.deleteOne({ _id: new ObjectId(req.params.id) });
    res.send(result);
};

// --- MENTOR LOGIC ---
const getMentors = async (req, res) => {
    const result = await collections.mentors.find().sort({ createdAt: -1 }).toArray();
    res.send(result);
};

// FIX: Added missing Single Mentor Fetch for the Edit Modal
const getSingleMentor = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await collections.mentors.findOne({ _id: new ObjectId(id) });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Failed to fetch mentor details" });
    }
};

const addMentor = async (req, res) => {
    const result = await collections.mentors.insertOne({ ...req.body, createdAt: new Date(), status: 'active' });
    res.status(201).send(result);
};

const updateMentor = async (req, res) => {
    try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
            $set: {
                ...req.body,
                updatedAt: new Date()
            }
        };
        delete updatedDoc.$set._id; // Prevent immutable ID error

        const result = await collections.mentors.updateOne(filter, updatedDoc);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Failed to update mentor" });
    }
};

const deleteMentor = async (req, res) => {
    const result = await collections.mentors.deleteOne({ _id: new ObjectId(req.params.id) });
    res.send(result);
};

// --- VERIFICATION & REVIEWS ---
const verifyCertificate = async (req, res) => {
    const { search, faculty } = req.query;
    const query = {
        courseTitle: faculty,
        $or: [{ validationId: search }, { studentName: { $regex: search, $options: 'i' } }]
    };
    const result = await collections.certificates.find(query).toArray();
    res.send(result);
};

const submitReview = async (req, res) => {
    const result = await collections.reviews.insertOne({ ...req.body, submittedAt: new Date() });
    res.status(201).send(result);
};


// Added missing logic for posting certificates
const addCertificate = async (req, res) => {
    try {
        const result = await collections.certificates.insertOne(req.body);
        res.status(201).send(result);
    } catch (error) {
        console.error("Add Certificate Error:", error);
        res.status(500).send({ message: "Failed to add certificate" });
    }
};

module.exports = {
    getNotices,
    createNotice,
    updateNotice,
    deleteNotice,
    getMentors,
    getSingleMentor,
    addMentor,
    updateMentor,
    deleteMentor,
    verifyCertificate,
    submitReview,
    addCertificate,
};
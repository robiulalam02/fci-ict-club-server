const { collections } = require('../config/db');
const { ObjectId } = require('mongodb');

const upsertUser = async (req, res) => {
    const user = req.body;
    const query = { email: user.email };
    const existingUser = await collections.users.findOne(query);

    if (existingUser) {
        await collections.users.updateOne(query, { $set: { lastSignIn: new Date() } });
        return res.send({ message: 'User updated' });
    }

    const newUser = {
        ...user,
        role: 'student',
        profilePhoto: 'https://i.ibb.co.com/zhKZ1J8b/profile-icon-vector-image-can-be-used-ui-120816-260932.webp',
        createdAt: new Date(),
        lastSignIn: new Date(),
        status: 'pending'
    };
    const result = await collections.users.insertOne(newUser);
    res.send(result);
};

const getUserProfile = async (req, res) => {
    const email = req.params.email;
    if (email !== req.decoded.email) return res.status(403).send({ message: 'forbidden access' });
    const result = await collections.users.findOne({ email });
    res.send(result);
};

const updateUserProfile = async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const updatedDoc = { $set: req.body };
    delete updatedDoc.$set._id;
    const result = await collections.users.updateOne(filter, updatedDoc);
    res.send(result);
};

const getUserRole = async (req, res) => {
    const email = req.params.email;
    if (email !== req.decoded.email) return res.status(403).send({ message: 'forbidden' });
    const user = await collections.users.findOne({ email });
    res.send({ role: user?.role || 'student' });
};

const adminGetStudents = async (req, res) => {
    const { search, department, course, shift, status } = req.query;
    let query = { role: 'student' };

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { boardRoll: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ];
    }
    if (department) query.department = department;
    if (course) query.course = course;
    if (shift) query.shift = shift;
    if (status) query.status = status;

    const result = await collections.users.find(query).sort({ createdAt: -1 }).toArray();
    res.send(result);
};

const adminDeleteUser = async (req, res) => {
    const id = req.params.id;
    const targetUser = await collections.users.findOne({ _id: new ObjectId(id) });
    if (targetUser?.role === 'admin') return res.status(403).send({ message: 'Cannot delete admin' });

    const result = await collections.users.deleteOne({ _id: new ObjectId(id) });
    res.send(result);
};

module.exports = { upsertUser, getUserProfile, updateUserProfile, getUserRole, adminGetStudents, adminDeleteUser };
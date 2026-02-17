const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const contentCtrl = require('../controllers/contentController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Public Routes
router.post('/users', userCtrl.upsertUser);
router.get('/api/notices', contentCtrl.getNotices);
router.get('/api/mentors', contentCtrl.getMentors);
router.get('/api/verify', contentCtrl.verifyCertificate);
router.post('/api/reviews', contentCtrl.submitReview);

// Private User Routes
router.get('/user/:email', verifyToken, userCtrl.getUserProfile);
router.patch('/user/:id', verifyToken, userCtrl.updateUserProfile);
router.get('/users/role/:email', verifyToken, userCtrl.getUserRole);

// Admin Routes
router.post('/api/certificates', verifyToken, verifyAdmin, contentCtrl.addCertificate);
router.get('/api/admin/students', verifyToken, verifyAdmin, userCtrl.adminGetStudents);
router.delete('/api/admin/students/:id', verifyToken, verifyAdmin, userCtrl.adminDeleteUser);
router.post('/api/notices', verifyToken, verifyAdmin, contentCtrl.createNotice);
router.patch('/api/notices/:id', verifyToken, verifyAdmin, contentCtrl.updateNotice);
router.delete('/api/notices/:id', verifyToken, verifyAdmin, contentCtrl.deleteNotice);
router.post('/api/admin/mentors', verifyToken, verifyAdmin, contentCtrl.addMentor);
router.get('/api/admin/mentors/:id', verifyToken, verifyAdmin, contentCtrl.getSingleMentor);
router.patch('/api/admin/mentors/:id', verifyToken, verifyAdmin, contentCtrl.updateMentor);
router.delete('/api/admin/mentors/:id', verifyToken, verifyAdmin, contentCtrl.deleteMentor);

module.exports = router;
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: ['http://localhost:5173', 'https://fciictclub2026.web.app', 'https://fciictclub2026.firebaseapp.com'],
    credentials: true
}));
app.use(express.json());
app.set('trust proxy', 1);

// JWT Generation
app.post('/api/jwt', (req, res) => {
    const token = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res.send({ token });
});

app.post('/api/logout', (req, res) => res.send({ success: true }));

// Use Modular Routes
app.use(apiRoutes);

app.get('/', (req, res) => res.send('🚀 FCI ICT Club Server is flying high!'));

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => console.log(`🚀 Local Server on port ${port}`));
}

module.exports = app;
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const port = process.env.PORT || 5000;

// 1. Core Middlewares
app.use(cors({
    origin: ['http://localhost:5173', 'https://fciictclub2026.web.app', 'https://fciictclub2026.firebaseapp.com'],
    credentials: true
}));
app.use(express.json());
app.set('trust proxy', 1);

// 2. JWT Generation
app.post('/api/jwt', (req, res) => {
    // Note: Ensure ACCESS_TOKEN_SECRET is set in cPanel Environment Variables
    const token = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET || 'secret', { expiresIn: '1h' });
    res.send({ token });
});

app.post('/api/logout', (req, res) => res.send({ success: true }));

// 3. Modular Routes
app.use(apiRoutes);

// 4. Health Check
app.get('/', (req, res) => res.send('🚀 FCI ICT Club Server is flying high!'));

// 5. Conditional Listener
// In cPanel (Production), Passenger manages the startup. 
// We only run app.listen for your local development.
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    app.listen(port, () => console.log(`🚀 Local Server running on port ${port}`));
}

// 6. Export for Passenger
module.exports = app;
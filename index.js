const express = require('express');
const cors = require('cors');
const app = express();

// 1. Tell Passenger we are alive IMMEDIATELY
app.get('/', (req, res) => {
    res.status(200).send('🚀 SERVER IS LIVE - DATABASE DEFERRED');
});

app.use(cors());
app.use(express.json());

// 2. Export the app right now
module.exports = app;

// 3. ONLY load the complicated stuff after the export
const apiRoutes = require('./routes/apiRoutes');
app.use(apiRoutes);

// 4. Local listener
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5000;
    require('dotenv').config();
    app.listen(port, () => console.log(`🚀 Local on ${port}`));
}
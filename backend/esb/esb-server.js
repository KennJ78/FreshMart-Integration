require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Import routes
const productServices = require('./routes/inventory-route');
const posServices = require('./routes/pos-routes');
const authService = require('./routes/auth-routes');
const employeeServices = require('./routes/employee-routes');

// Request mapper
const mapper = '/api/v1';

// Init app
const app = express();

app.use(cors());
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path}`);
    next();
});

// Use routes
app.use(`${mapper}/inventory`, productServices);
app.use(`${mapper}/pos`, posServices);
app.use(`${mapper}/auth`, authService);
app.use(`${mapper}/employee`, employeeServices);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'No such endpoint exists' });
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
});

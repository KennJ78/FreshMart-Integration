require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/inventory-route');

// Init app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path}`);
    next();
});

// Connect to MongoDB
mongoose.connect(process.env.DB)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to database and listening on port ${process.env.PORT}`);
        });
    })
    .catch(error => {
        console.log('Database connection error:', error);
    });

// Routes
app.use('/inventory', productRoutes);

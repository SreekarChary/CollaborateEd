// server/src/app.js - Configures the Express application and middleware.

// 🛑 CRITICAL FIX: Load .env from the server/ directory first thing
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') }); 
// End CRITICAL FIX

const express = require('express');
const cors = require('cors');
const { getIO } = require('./websocket');

const app = express();

// --- Import Routes (Must be imported AFTER dotenv loads) ---
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const teamRoutes = require('./routes/teamRoutes');

// --- Middleware ---
app.use(cors({
    origin: 'http://localhost:8080', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
}));
app.use(express.json()); 

// Middleware to attach socket.io instance to request
app.use((req, res, next) => {
    req.io = getIO();
    next();
});

// --- Define Routes ---
app.get('/api/health', (req, res) => res.status(200).send({ status: 'ok', serverTime: new Date().toISOString() }));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/teams', teamRoutes);

// --- Global Error Handler ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send({
        message: err.message || "Internal Server Error",
        error: "Server Error"
    });
});

module.exports = app;
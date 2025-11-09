// server/src/routes/authRoutes.js - User authentication routes.

const express = require('express');
const router = express.Router();
const { admin } = require('../config/firebase');

// NOTE: Client-side Firebase Auth is typically used for login/register, 
// but the server is needed for custom token generation or admin tasks.

// POST /api/auth/register - (Server-side registration example)
router.post('/register', async (req, res, next) => {
    try {
        const { email, password, displayName } = req.body;
        const userRecord = await admin.auth().createUser({ email, password, displayName });
        
        // Custom logic here, e.g., creating a user profile document in Firestore
        // await db.collection('users').doc(userRecord.uid).set({ ... });

        res.status(201).json({ uid: userRecord.uid, message: 'User created successfully' });
    } catch (error) {
        next({ status: 400, message: error.message });
    }
});

module.exports = router;
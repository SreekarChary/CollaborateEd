// server/src/config/firebase.js - Initializes the Firebase Admin SDK for secure server access to Firestore.

const admin = require('firebase-admin');

// Load service account details from the .env file
const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // CRITICAL FIX: The private key is loaded as a single string from .env.
    // We must manually replace the literal \n characters (if present) with actual newlines.
    privateKey: process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        : undefined,
};

if (!admin.apps.length) {
    if (!serviceAccount.projectId || !serviceAccount.privateKey) {
        console.error("FATAL: Firebase Admin credentials missing or malformed.");
        throw new Error("Missing Firebase Admin credentials. Please check server/.env file.");
    }

    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log("Firebase Admin SDK initialized successfully.");
    } catch (e) {
        console.error("Firebase Initialization Failed:", e.message);
        throw e;
    }
}

const db = admin.firestore();

module.exports = { db, admin };
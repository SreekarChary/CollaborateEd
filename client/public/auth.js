// client/public/auth.js - Handles Firebase client-side initialization and session management.

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { alertModal } from './main.js'; // Import utility function from main.js
import * as api from './api.js'; // To call server-side user registration logic

// 🛑 IMPORTANT: REPLACE WITH YOUR LIVE FIREBASE PROJECT CONFIGURATION 🛑
const firebaseConfig = {
    apiKey: "YOUR_CLIENT_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    appId: "YOUR_APP_ID"
};
// ----------------------------------------------------------------------

export let db;
export let auth;
export let currentUserId = null;

// Initialize Firebase
try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUserId = user.uid;
            // The browser will be redirected to the dashboard after a real sign-in/sign-up
            document.getElementById('profile-id-display').textContent = `ID: ${currentUserId}`;
            document.dispatchEvent(new Event('authReady'));
        } else {
            currentUserId = null;
        }
    });
} catch (error) {
    console.error("Firebase Initialization Error:", error);
}

// --- NEW REAL AUTHENTICATION FUNCTIONS ---
export const handleRegistration = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Optionally register user details on the backend (e.g., to create a Firestore user profile)
        // await api.registerUser({ uid: user.uid, email: user.email });

        alertModal('Success', 'Registration successful! You are now logged in.');
        window.location.reload(); // Reloads to show dashboard
    } catch (error) {
        alertModal('Registration Failed', error.message);
    }
};

export const handleLogin = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        // On successful login, onAuthStateChanged handles session update and navigation
    } catch (error) {
        alertModal('Login Failed', error.message);
    }
};

export const handleLogout = async () => {
    // ... (Your existing logout logic remains the same)
};

// ... (Your existing setupDashboardListeners logic remains the same)
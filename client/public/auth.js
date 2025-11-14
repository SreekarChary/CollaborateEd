// client/public/auth.js - Handles Firebase client-side initialization and session management.

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { alertModal } from './main.js'; // Import utility function from main.js

// 🛑 IMPORTANT: REPLACE WITH YOUR LIVE FIREBASE PROJECT CONFIGURATION 🛑
// Get these values from your Firebase Project Settings -> Web App Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKnV15THAo1Q4NFJBGvTi5f8Du1YWxYvY",
  authDomain: "collaborateed-6cac6.firebaseapp.com",
  projectId: "collaborateed-6cac6",
  storageBucket: "collaborateed-6cac6.firebasestorage.app",
  messagingSenderId: "319921793333",
  appId: "1:319921793333:web:67d78b0fa8190e8656447c",
  measurementId: "G-3YDN92R8VK"
};
// ----------------------------------------------------------------------

export let db;
export let auth;
export let currentUserId = null;

// Initialize Firebase
try {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    db = getFirestore(app);
    auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUserId = user.uid;
            // On successful auth, redirect/show dashboard
            const profileDisplay = document.getElementById('profile-id-display');
            if (profileDisplay) profileDisplay.textContent = `ID: ${currentUserId}`;
            
            // Show the main application shell
            document.getElementById('login-register-page').classList.add('hidden');
            document.getElementById('main-app-shell').classList.remove('hidden');
            
            // Dispatch event to main.js to load the dashboard content
            document.dispatchEvent(new Event('authReady'));
        } else {
            // User is logged out or session expired
            currentUserId = null;
            document.getElementById('main-app-shell').classList.add('hidden');
            document.getElementById('login-register-page').classList.remove('hidden');
        }
    });
} catch (error) {
    console.error("Firebase Initialization Error:", error);
}

// --- NEW REAL AUTHENTICATION FUNCTIONS ---
export const handleRegistration = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        // Auth state change listener handles UI navigation upon successful sign-up
    } catch (error) {
        alertModal('Registration Failed', error.message);
    }
};

export const handleLogin = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        // Auth state change listener handles UI navigation upon successful sign-in
    } catch (error) {
        alertModal('Login Failed', error.message);
    }
};

export const handleLogout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        alertModal('Logout Failed', 'Could not log out.');
    }
};

export const setupDashboardListeners = (updateCountCallback) => {
    if (!db || !currentUserId) return () => {};

    // This query path assumes you have a 'tasks' collection in your Firestore root
    const tasksCollection = collection(db, 'tasks'); 
    
    // Query tasks assigned to the current user that are 'in_progress'
    const q = query(tasksCollection, where("status", "==", "in_progress"), where("assigneeId", "==", currentUserId)); 

    return onSnapshot(q, (snapshot) => {
        let ongoingCount = snapshot.docs.length;
        updateCountCallback(ongoingCount);
    }, (error) => {
        console.error("Error fetching ongoing tasks:", error);
    });
};
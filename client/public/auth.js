// client/src/auth.js - Handles Firebase client-side initialization and session management.

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { alertModal } from './main.js'; // Import utility function from main.js

// Global instances
export let db;
export let auth;
export let currentUserId = null;
export let appId = 'default-app-id';

// Global variables provided by the canvas environment
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
const canvasAppId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

setLogLevel('Debug');

if (firebaseConfig) {
    try {
        appId = canvasAppId;
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);

        const signIn = async () => {
            try {
                if (initialAuthToken) {
                    await signInWithCustomToken(auth, initialAuthToken);
                } else {
                    await signInAnonymously(auth);
                }
            } catch (error) {
                console.error("Firebase Auth Error:", error);
            }
        };

        onAuthStateChanged(auth, (user) => {
            if (user) {
                currentUserId = user.uid;
            } else {
                currentUserId = crypto.randomUUID(); // Fallback ID
            }
            document.getElementById('profile-id-display').textContent = `ID: ${currentUserId}`;
            
            document.dispatchEvent(new Event('authReady'));
        });

        signIn();

    } catch (error) {
        console.error("Firebase Initialization Error:", error);
    }
} else {
     console.error("Firebase config not found. Running in mock mode.");
}

export const handleLogout = async () => {
    try {
        await signOut(auth);
        document.getElementById('login-register-page').classList.remove('hidden');
        document.getElementById('main-app-shell').classList.add('hidden');
        alertModal('Logged Out', 'You have been successfully logged out.');
    } catch (error) {
        console.error("Logout Error:", error);
        alertModal('Logout Failed', 'Could not log out. Please check your connection.');
    }
};

export const setupDashboardListeners = (updateCountCallback) => {
    if (!db || !currentUserId) return;

    const publicDataPath = `/artifacts/${appId}/public/data/tasks`;
    // Query to count tasks assigned to the current user that are 'in_progress'
    const q = query(collection(db, publicDataPath), where("status", "==", "in_progress"), where("assigneeId", "==", currentUserId)); 

    return onSnapshot(q, (snapshot) => {
        let ongoingCount = snapshot.docs.length;
        updateCountCallback(ongoingCount);
    }, (error) => {
        console.error("Error fetching ongoing tasks:", error);
    });
};
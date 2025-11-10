// client/public/api.js - Centralized module for making all HTTP requests to the backend server.

// 🛑 IMPORTANT: CHANGE THIS URL TO YOUR LIVE, PUBLIC BACKEND ADDRESS 🛑
// If you host your Express server on Render, Heroku, or Google Cloud Run, use that URL here.
const BASE_URL = 'https://your-public-backend-url.com/api'; 
// Until deployed, keep this as localhost:3000 to test the server:
// const BASE_URL = 'http://localhost:3000/api'; 

async function request(endpoint, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add session token for real auth
        },
        ...options,
    };
    
    if (options.body && typeof options.body !== 'string') {
        defaultOptions.body = JSON.stringify(options.body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, defaultOptions);

    if (!response.ok) {
        let errorData = {};
        try {
            errorData = await response.json();
        } catch (e) {
            throw new Error(`Server responded with status ${response.status}`);
        }
        throw new Error(errorData.message || 'API request failed');
    }

    return response.json();
}

// --- Dashboard Endpoints ---
export const getDashboardData = (userId) => request(`/tasks/dashboard?userId=${userId}`, { method: 'GET' });

// --- Task Endpoints ---
export const getTasksGrouped = (userId) => request(`/tasks?userId=${userId}`, { method: 'GET' });

export const updateTaskStatus = (taskId, newStatus, userId) => request(`/tasks/${taskId}/status`, {
    method: 'PUT',
    body: { status: newStatus, userId: userId },
});

// --- Team Endpoints ---
export const getTeamsData = (userId) => request(`/teams?userId=${userId}`, { method: 'GET' });

export const createTeam = (teamData) => request('/teams', {
    method: 'POST',
    body: teamData,
});
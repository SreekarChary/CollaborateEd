// client/public/api.js - Centralized module for making all HTTP requests to the backend server.

// 🛑 IMPORTANT: CHANGE THIS URL TO YOUR PUBLIC BACKEND ADDRESS 🛑
const BASE_URL = 'http://localhost:3000/api'; 
// Example Public URL: const BASE_URL = 'https://collaborateed-api.com/api';

async function request(endpoint, options = {}) {
    // ... (rest of the request function remains the same)
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`, 
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
export const getDashboardData = () => request('/tasks/dashboard', { method: 'GET' });

// --- Task Endpoints ---
export const getTasksGrouped = () => request('/tasks', { method: 'GET' });

export const updateTaskStatus = (taskId, newStatus) => request(`/tasks/${taskId}/status`, {
    method: 'PUT',
    body: { status: newStatus },
});

// --- Team Endpoints ---
export const getTeamsData = () => request('/teams', { method: 'GET' });

export const createTeam = (teamData) => request('/teams', {
    method: 'POST',
    body: teamData,
});
// client/src/main.js - Contains core UI logic, routing, rendering, and state management.

import { setupDashboardListeners, handleLogout } from './auth.js'; 
import * as api from './api.js'; 
import * as socket from './socket.js';

// --- State Management ---
let currentPage = 'dashboard';
let isChatOpen = false;
let currentTheme = localStorage.getItem('theme') || 'light';
let dashboardUnsubscribe = null; 

// --- Expose Global Functions for HTML onClick Events ---
window.simulateLogin = simulateLogin;
window.navigate = navigate;
window.toggleChatPanel = toggleChatPanel;
window.switchChat = switchChat;
window.toggleProfileMenu = toggleProfileMenu;
window.closeAlertModal = closeAlertModal;
window.toggleTheme = toggleTheme;
window.handleLogoutClick = handleLogout; // Direct call to auth.js's handleLogout
window.allowDrop = allowDrop;
window.drag = drag;
window.drop = drop;


// --- Utility Functions ---

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.documentElement.classList.add('dark');
    } else {
        document.body.classList.remove('dark-mode');
        document.documentElement.classList.remove('dark');
    }
}

function updateThemeIcon(theme) {
    const iconEl = document.getElementById('theme-toggle-icon');
    if (iconEl) {
        if (theme === 'dark') {
            iconEl.innerHTML = lucide.createIcons()['sun'].toSvg();
        } else {
            iconEl.innerHTML = lucide.createIcons()['moon'].toSvg();
        }
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
    updateThemeIcon(currentTheme);
}

export function alertModal(title, message) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').textContent = message;
    document.getElementById('alert-modal').classList.remove('hidden');
    document.getElementById('alert-modal').classList.add('flex');
}

function closeAlertModal() {
    document.getElementById('alert-modal').classList.add('hidden');
    document.getElementById('alert-modal').classList.remove('flex');
}

function simulateLogin() {
    document.getElementById('login-register-page').classList.add('hidden');
    document.getElementById('main-app-shell').classList.remove('hidden');
    applyTheme(currentTheme);
    navigate('dashboard');
    socket.initSocket(); // Initialize real-time connection on login
}

function toggleProfileMenu() {
    const menu = document.getElementById('profile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

function toggleChatPanel() {
    const panel = document.getElementById('chat-panel');
    const button = document.getElementById('chat-toggle-button');

    isChatOpen = !isChatOpen;
    panel.classList.toggle('open', isChatOpen);
    button.style.right = isChatOpen ? '20rem' : '1rem'; 
    button.innerHTML = isChatOpen 
        ? '<i data-lucide="x" class="w-6 h-6 inline mr-2"></i> Close Chat'
        : '<i data-lucide="message-circle" class="w-6 h-6 inline mr-2"></i> Chat';
    lucide.createIcons();
}

function switchChat(type) {
    // Logic to switch chat tabs: private vs team
    const privateContent = document.getElementById('chat-content-private');
    const teamContent = document.getElementById('chat-content-team');
    // ... update tab classes
    if (type === 'private') {
        privateContent.classList.remove('hidden');
        teamContent.classList.add('hidden');
    } else {
        privateContent.classList.add('hidden');
        teamContent.classList.remove('hidden');
    }
}

function navigate(pageId) {
    currentPage = pageId;

    if (pageId !== 'dashboard' && dashboardUnsubscribe) {
        dashboardUnsubscribe();
        dashboardUnsubscribe = null;
    }

    document.querySelectorAll('[id^="page-"]').forEach(p => p.classList.add('hidden'));

    const targetPageEl = document.getElementById(`page-${pageId}`);
    if (targetPageEl) {
        targetPageEl.classList.remove('hidden');
        renderPage(pageId);
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('bg-primary-color', 'text-white', 'active-link');
        link.classList.add('text-text-color');
    });

    const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('bg-primary-color', 'text-white', 'active-link');
        activeLink.classList.remove('text-text-color');
    }
}

async function renderPage(pageId) {
    const targetEl = document.getElementById(`page-${pageId}`);
    if (!targetEl) return;

    let content = '';

    switch (pageId) {
        case 'dashboard':
            content = await renderDashboard();
            dashboardUnsubscribe = setupDashboardListeners((count) => {
                const ongoingTasksEl = document.getElementById('ongoing-tasks-count');
                if (ongoingTasksEl) ongoingTasksEl.textContent = count;
            });
            break;
        case 'tasks':
            content = await renderTasks();
            break;
        case 'teams':
            content = await renderTeams();
            break;
        case 'settings':
            content = renderSettings();
            break;
    }
    targetEl.innerHTML = content;
    lucide.createIcons();
}


// --- Rendering Logic (Fetches data from API) ---

async function renderDashboard() {
    // Fetch data for deadline tasks and updates from server
    try {
        const dashboardData = await api.getDashboardData();
        const { ongoingCount, deadlineTasks, pinnedTasks, pinnedTeams, latestUpdates } = dashboardData;

        const formatTimeRemaining = (ms) => {
            const diff = ms;
            if (diff < 0) return 'Overdue';
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            return `${days}d ${hours}h`;
        };

        return `
            <h1 class="text-3xl font-extrabold mb-6 text-text-color">Dashboard</h1>
            <p class="mb-8 text-gray-500 dark:text-gray-400">Welcome back! Here is your project overview.</p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div class="bg-bg-color-light p-6 rounded-xl shadow-lg border border-border-color cursor-pointer" onclick="navigate('tasks')">
                    <span class="text-sm font-medium text-gray-500">Ongoing Tasks (Live)</span>
                    <p id="ongoing-tasks-count" class="text-4xl font-bold mt-2 text-text-color">${ongoingCount}</p>
                </div>
                <div class="bg-bg-color-light p-6 rounded-xl shadow-lg border border-border-color">
                    <span class="text-sm font-medium text-gray-500">Upcoming Deadlines (> 36h)</span>
                    <p class="text-4xl font-bold mt-2 text-text-color">${deadlineTasks.length}</p>
                </div>
                <div class="bg-bg-color-light p-6 rounded-xl shadow-lg border border-border-color">
                    <span class="text-sm font-medium text-gray-500">New Updates</span>
                    <p class="text-4xl font-bold mt-2 text-text-color">${latestUpdates.length}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 bg-bg-color-light p-6 rounded-xl shadow-lg border border-border-color">
                    <h2 class="text-xl font-semibold mb-4">Latest Team Activity</h2>
                    <ul class="space-y-3 max-h-96 overflow-y-auto">
                        ${latestUpdates.map(u => `<li class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm border-l-4 border-accent-color">
                            <span class="font-medium">${u.user}</span> ${u.message} in ${u.team}. <span class="text-xs text-gray-500 float-right">${u.time}</span>
                        </li>`).join('')}
                    </ul>
                </div>

                <div class="space-y-6">
                    <div class="bg-bg-color-light p-6 rounded-xl shadow-lg border border-border-color">
                        <h2 class="text-lg font-semibold mb-4">Pinned Tasks (Max 3)</h2>
                        <ul class="space-y-2">
                            ${pinnedTasks.map(t => `<li class="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">${t.title} - ${t.team}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="bg-bg-color-light p-6 rounded-xl shadow-lg border border-border-color">
                        <h2 class="text-lg font-semibold mb-4">Pinned Teams (Max 2)</h2>
                        <ul class="space-y-2">
                            ${pinnedTeams.map(t => `<li class="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">${t.name} (${t.members} Members)</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Failed to load dashboard data:", error);
        return `<p class="text-red-500">Error loading dashboard data. Please check server connection.</p>`;
    }
}

async function renderTasks() {
    // Fetches all tasks, grouped by status
    try {
        const tasks = await api.getTasksGrouped();
        
        const renderTaskCard = (task) => `
            <div id="task-${task.id}" draggable="true" ondragstart="drag(event)" class="task-card p-3 mb-3 bg-bg-color-light border border-border-color rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <p class="font-medium text-text-color">${task.title}</p>
                <div class="flex justify-between items-center text-xs mt-1 text-gray-500">
                    <span>${task.team}</span>
                    <span>${task.priority}</span>
                </div>
            </div>
        `;

        const renderTaskColumn = (status, title, taskList) => `
            <div class="task-column flex flex-col p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-inner border border-border-color">
                <h2 class="text-lg font-semibold mb-4 text-text-color flex items-center justify-between border-b pb-2 border-border-color">
                    ${title} <span class="text-sm font-normal text-gray-500">${taskList.length}</span>
                </h2>
                <div id="tasks-${status}" class="flex-1 overflow-y-auto min-h-20"
                    ondrop="drop(event, '${status}')" ondragover="allowDrop(event)">
                    ${taskList.map(renderTaskCard).join('')}
                </div>
                <button class="mt-4 p-2 bg-primary-color/10 text-primary-color rounded-lg hover:bg-primary-color/20 text-sm transition-colors">
                    <i data-lucide="plus" class="w-4 h-4 inline mr-1"></i> Add Task
                </button>
            </div>
        `;

        return `
            <h1 class="text-3xl font-extrabold mb-6 text-text-color">Tasks Management (Kanban)</h1>
            <p class="mb-8 text-gray-500 dark:text-gray-400">Drag and drop tasks between columns to update their status.</p>

            <div class="flex space-x-6 overflow-x-auto pb-4">
                ${renderTaskColumn('created', 'Created Tasks', tasks.created)}
                ${renderTaskColumn('in_progress', 'In Progress Tasks', tasks.in_progress)}
                ${renderTaskColumn('completed', 'Completed Tasks', tasks.completed)}
                ${renderTaskColumn('collaborated', 'Collaborated Tasks', tasks.collaborated)}
            </div>
        `;
    } catch (error) {
        return `<p class="text-red-500">Error loading tasks: ${error.message}</p>`;
    }
}

async function renderTeams() {
    try {
        const { pinned, latest } = await api.getTeamsData();

        const renderTeamCard = (team) => `
            <div class="p-4 bg-bg-color-light rounded-lg shadow-md border border-border-color flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                <div>
                    <p class="font-semibold text-text-color">${team.name}</p>
                    <p class="text-xs text-gray-500">Leader: ${team.leader}</p>
                </div>
                <span class="text-xs font-medium px-2 py-1 rounded-full ${team.status === 'Active' ? 'bg-accent-color/20 text-accent-color' : 'bg-gray-400/20 text-gray-600'}">
                    ${team.status}
                </span>
            </div>
        `;

        return `
            <h1 class="text-3xl font-extrabold mb-6 text-text-color">Teams Hub</h1>
            <p class="mb-8 text-gray-500 dark:text-gray-400">Manage your project teams, create new ones, or join existing groups.</p>

            <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-10 p-6 bg-primary-color/10 rounded-xl border border-primary-color/30">
                <button onclick="alertModal('Feature', 'Create New Team Form')" class="flex-1 p-3 bg-primary-color text-white rounded-lg font-semibold hover:bg-secondary-color">
                    <i data-lucide="plus-circle" class="w-5 h-5 inline mr-2"></i> Create New Team
                </button>
                <div class="flex-1 flex space-x-2">
                    <input type="text" placeholder="Enter URL / Team Code" class="flex-1 p-3 border border-border-color rounded-lg bg-white dark:bg-gray-700 dark:text-white">
                    <button onclick="alertModal('Feature', 'Joining team via code')" class="p-3 bg-accent-color text-white rounded-lg font-semibold hover:bg-accent-color-hover">
                         <i data-lucide="log-in" class="w-5 h-5 inline"></i> Join
                    </button>
                </div>
            </div>

            <h2 class="text-2xl font-bold mb-4 text-text-color">Pinned Teams</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                ${pinned.map(renderTeamCard).join('')}
            </div>

            <h2 class="text-2xl font-bold mb-4 text-text-color">Other Teams (Latest First)</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${latest.map(renderTeamCard).join('')}
            </div>
        `;
    } catch (error) {
        return `<p class="text-red-500">Error loading teams: ${error.message}</p>`;
    }
}

function renderSettings() {
    const isDark = currentTheme === 'dark';
    return `
        <h1 class="text-3xl font-extrabold mb-8 text-text-color">Settings</h1>

        <div class="bg-bg-color-light p-8 rounded-xl shadow-lg border border-border-color space-y-6 max-w-lg">
            <div class="flex justify-between items-center pb-4 border-b border-border-color">
                 <button onclick="toggleTheme()" class="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg">Toggle Theme (${isDark ? 'Dark' : 'Light'})</button>
            </div>
            <div class="flex justify-between items-center pb-4 border-b border-border-color">
                 <button onclick="alertModal('Feature', 'Password Change Modal')" class="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg">Change Password</button>
            </div>
            <div class="flex justify-between items-center">
                 <button onclick="handleLogoutClick()" class="px-4 py-2 text-sm bg-red-500 text-white rounded-lg">Log Out</button>
            </div>
        </div>
    `;
}

// --- Drag and Drop Logic (Interacts with API) ---
function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }

async function drop(ev, newStatus) {
    ev.preventDefault();
    const taskId = ev.dataTransfer.getData("text").split('-')[1]; 
    const taskElement = document.getElementById(`task-${taskId}`);

    try {
        await api.updateTaskStatus(taskId, newStatus);
        
        const targetContainer = document.getElementById(`tasks-${newStatus}`);
        if (taskElement && targetContainer) {
            targetContainer.appendChild(taskElement);
            // Broadcast update via WebSocket to other users
            socket.sendTaskUpdate(taskId, newStatus);
        }
    } catch (error) {
        alertModal('Update Failed', `Could not update task status: ${error.message}`);
        // Do not move the element if the API call fails
    }
}


// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    lucide.createIcons();
});

document.addEventListener('authReady', () => {
    if (!document.getElementById('main-app-shell').classList.contains('hidden')) {
        navigate('dashboard');
    }
});
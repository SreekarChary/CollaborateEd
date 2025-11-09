// client/src/socket.js - Socket.IO client logic for real-time chat/updates.
// NOTE: Requires including the Socket.IO client library in index.html for a full setup.
// Example: <script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>

// Placeholder for the client's Socket.IO instance
let socket;

export const initSocket = () => {
    // Check if the socket is already initialized or running in a non-browser environment
    if (typeof io === 'undefined') {
        console.warn("Socket.IO client library not loaded. Real-time features disabled.");
        return;
    }
    
    // Initialize the socket connection
    socket = io('http://localhost:3000', {
        // Add authentication headers if necessary
        // auth: { token: localStorage.getItem('token') }
    }); 

    socket.on('connect', () => {
        console.log('Connected to real-time server.');
    });

    socket.on('task_status_changed', (data) => {
        // Find the task element and move it on the Kanban board
        console.log('Live task update received:', data);
        const taskElement = document.getElementById(`task-${data.taskId}`);
        const targetContainer = document.getElementById(`tasks-${data.newStatus}`);
        
        if (taskElement && targetContainer) {
            targetContainer.appendChild(taskElement);
        }
    });

    socket.on('new_chat_message', (message) => {
        console.log('New chat message received:', message);
        // Logic to append the message to the appropriate chat panel
    });

    return socket;
};

export const sendTaskUpdate = (taskId, newStatus) => {
    if (socket) {
        socket.emit('update_task_status', { taskId, newStatus });
    }
};
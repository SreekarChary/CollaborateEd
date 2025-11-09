// server/src/server.js - Entry file for the server.

const http = require('http');
const app = require('./app');
const { initWebSocket } = require('./websocket'); 

// The dotenv configuration is now managed inside app.js 
// to ensure it runs before any module is loaded.

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
initWebSocket(server); 

server.listen(PORT, () => {
    console.log(`CollaborateEd Backend Server running on port ${PORT}`);
});

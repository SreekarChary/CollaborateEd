// server/src/routes/taskRoutes.js - Defines API routes for task management.

const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService');

// POST /api/tasks - Create a new task
router.post('/', async (req, res, next) => {
    try {
        const newTask = await taskService.createTask(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
});

// GET /api/tasks - Get all tasks, grouped by status (for Kanban board)
router.get('/', async (req, res, next) => {
    try {
        const tasks = await taskService.getTasksGrouped(req.query.userId); // Use query for filtering
        res.json(tasks);
    } catch (error) {
        next(error);
    }
});

// PUT /api/tasks/:id/status - Update task status (drag and drop)
router.put('/:id/status', async (req, res, next) => {
    try {
        const updatedTask = await taskService.updateTaskStatus(req.params.id, req.body.status, req.body.userId);
        res.json(updatedTask);
    } catch (error) {
        next(error);
    }
});

// GET /api/tasks/dashboard - Get tasks filtered for the dashboard view
router.get('/dashboard', async (req, res, next) => {
    try {
        const dashboardData = await taskService.getDashboardData();
        res.json(dashboardData);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
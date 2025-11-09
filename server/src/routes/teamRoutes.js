// server/src/routes/teamRoutes.js - Defines API routes for team management.

const express = require('express');
const router = express.Router();
const teamService = require('../services/teamService');

// POST /api/teams - Create a new team
router.post('/', async (req, res, next) => {
    try {
        const newTeam = await teamService.createTeam(req.body);
        res.status(201).json(newTeam);
    } catch (error) {
        next(error);
    }
});

// GET /api/teams - Get all teams (for Teams Hub)
router.get('/', async (req, res, next) => {
    try {
        const teamsData = await teamService.getTeamsData(req.query.userId);
        res.json(teamsData);
    } catch (error) {
        next(error);
    }
});

// PUT /api/teams/:id/member - Add or remove member (Leader permission needed)
router.put('/:id/member', async (req, res, next) => {
    try {
        const updatedTeam = await teamService.updateTeamMembership(req.params.id, req.body.memberId, req.body.action);
        res.json(updatedTeam);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { registerTeam, getTeams } = require('../controllers/teamController');

router.post('/register', registerTeam);
router.get('/', getTeams);

module.exports = router;
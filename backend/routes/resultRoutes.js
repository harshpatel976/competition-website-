const express = require('express');
const router = express.Router();
const { updateResult, getResults, getMedalTally } = require('../controllers/resultController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, updateResult);
router.get('/', getResults);
router.get('/medals', getMedalTally);

module.exports = router;
const express = require('express');
const router = express.Router();
const { registerCoach, getCoaches } = require('../controllers/coachController');
const upload = require('../middleware/uploadMiddleware');

router.post('/register', upload.single('documentFile'), registerCoach);
router.get('/', getCoaches);

module.exports = router;
const express = require('express');
const router = express.Router();
const { registerParticipant, getParticipants } = require('../controllers/participantController');
const upload = require('../middleware/uploadMiddleware');

router.post('/register', upload.single('documentFile'), registerParticipant);
router.get('/', getParticipants);

module.exports = router;
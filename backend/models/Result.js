const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    participantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant', required: true },
    time: { type: Number, required: true },
    position: { type: Number, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
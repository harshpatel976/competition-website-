const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    documentType: { type: String, enum: ['Aadhaar', 'College ID', 'Government ID'], required: true },
    documentUrl: { type: String, required: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
}, { timestamps: true });

module.exports = mongoose.model('Participant', participantSchema);
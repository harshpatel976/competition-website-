const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({
    name: { type: String, required: true },
    documentType: { type: String, enum: ['Aadhaar', 'Government ID'], required: true },
    documentUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Coach', coachSchema);
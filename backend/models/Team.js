const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    coachId: { type: mongoose.Schema.Types.ObjectId, ref: 'Coach', default: null },
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
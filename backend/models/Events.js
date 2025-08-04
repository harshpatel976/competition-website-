const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, enum: ['Men', 'Women', 'Mixed'], required: true },
    record: { type: Number, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
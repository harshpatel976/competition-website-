const Event = require('../models/Event');
const { validateEvent } = require('../utils/validate');

exports.createEvent = async (req, res, next) => {
    try {
        const { name, date, category, record } = req.body;

        const validationError = validateEvent({ name, date, category });
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        const event = new Event({
            name,
            date,
            category,
            record: record || null,
        });

        await event.save();
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        next(error);
    }
};

exports.getEvents = async (req, res, next) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        next(error);
    }
};
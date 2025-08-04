const Result = require('../models/Result');
const Event = require('../models/Event');
const io = require('../config/socket');

exports.updateResult = async (req, res, next) => {
    try {
        const { eventId, participantId, time, position } = req.body;

        if (!time || isNaN(time) || time <= 0) {
            return res.status(400).json({ message: 'Invalid result time' });
        }

        const result = new Result({
            eventId,
            participantId,
            time,
            position: position || null,
        });

        await result.save();

        // Update event record if necessary
        const event = await Event.findById(eventId);
        if (!event.record || time < event.record) {
            event.record = time;
            await event.save();
        }

        // Emit live update
        io.emit('resultUpdate', { eventId, participantId, time, position });

        // Update medal tally
        const medalTally = await calculateMedalTally();
        io.emit('medalTallyUpdate', medalTally);

        res.json({ message: 'Result updated successfully', result });
    } catch (error) {
        next(error);
    }
};

exports.getResults = async (req, res, next) => {
    try {
        const results = await Result.find()
            .populate('eventId')
            .populate('participantId')
            .sort({ time: 1 });
        res.json(results);
    } catch (error) {
        next(error);
    }
};

exports.getMedalTally = async (req, res, next) => {
    try {
        const medalTally = await calculateMedalTally();
        res.json(medalTally);
    } catch (error) {
        next(error);
    }
};

const calculateMedalTally = async () => {
    const results = await Result.find().populate('participantId');
    const tally = {};

    results.forEach(result => {
        const teamId = result.participantId.teamId?.toString() || 'Independent';
        if (!tally[teamId]) {
            tally[teamId] = { gold: 0, silver: 0, bronze: 0 };
        }
        if (result.position === 1) tally[teamId].gold += 1;
        else if (result.position === 2) tally[teamId].silver += 1;
        else if (result.position === 3) tally[teamId].bronze += 1;
    });

    return tally;
};
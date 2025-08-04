const Team = require('../models/Team');
const { validateTeam } = require('../utils/validate');

exports.registerTeam = async (req, res, next) => {
    try {
        const { name, coachId } = req.body;

        const validationError = validateTeam({ name });
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        const team = new Team({
            name,
            coachId: coachId || null,
        });

        await team.save();
        res.status(201).json({ message: 'Team registered successfully', team });
    } catch (error) {
        next(error);
    }
};

exports.getTeams = async (req, res, next) => {
    try {
        const teams = await Team.find().populate('coachId');
        res.json(teams);
    } catch (error) {
        next(error);
    }
};
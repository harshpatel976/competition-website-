const Participant = require('../models/Participant');
const { uploadToCloudinary } = require('../utils/cloudinaryUpload');
const { validateParticipant } = require('../utils/validate');

exports.registerParticipant = async (req, res, next) => {
    try {
        const { name, age, gender, documentType, teamId } = req.body;
        const documentFile = req.file;

        const validationError = validateParticipant({ name, age, gender, documentType });
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        const documentUrl = await uploadToCloudinary(documentFile);

        const participant = new Participant({
            name,
            age,
            gender,
            documentType,
            documentUrl,
            teamId: teamId || null,
        });

        await participant.save();
        res.status(201).json({ message: 'Participant registered successfully', participant });
    } catch (error) {
        next(error);
    }
};

exports.getParticipants = async (req, res, next) => {
    try {
        const participants = await Participant.find().populate('teamId');
        res.json(participants);
    } catch (error) {
        next(error);
    }
};
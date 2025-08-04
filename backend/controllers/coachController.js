const Coach = require('../models/Coach');
const { uploadToCloudinary } = require('../utils/cloudinaryUpload');
const { validateCoach } = require('../utils/validate');

exports.registerCoach = async (req, res, next) => {
    try {
        const { name, documentType } = req.body;
        const documentFile = req.file;

        const validationError = validateCoach({ name, documentType });
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        const documentUrl = await uploadToCloudinary(documentFile);

        const coach = new Coach({
            name,
            documentType,
            documentUrl,
        });

        await coach.save();
        res.status(201).json({ message: 'Coach registered successfully', coach });
    } catch (error) {
        next(error);
    }
};

exports.getCoaches = async (req, res, next) => {
    try {
        const coaches = await Coach.find();
        res.json(coaches);
    } catch (error) {
        next(error);
    }
};
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { JWT_SECRET } = require('../config/env');

exports.loginAdmin = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (!admin || admin.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        next(error);
    }
};
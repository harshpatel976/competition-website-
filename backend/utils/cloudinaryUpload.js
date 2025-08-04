const cloudinary = require('../config/cloudinary');

exports.uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload_stream({
            folder: 'swimming_competition',
            resource_type: 'auto',
        }).end(file.buffer);
        return result.secure_url;
    } catch (error) {
        throw new Error('Failed to upload to Cloudinary');
    }
};
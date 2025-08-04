exports.validateParticipant = ({ name, age, gender, documentType }) => {
    if (!name || name.trim().length < 2) {
        return 'Name must be at least 2 characters';
    }
    if (!age || age < 10 || age > 100) {
        return 'Age must be between 10 and 100';
    }
    if (!['Male', 'Female', 'Other'].includes(gender)) {
        return 'Invalid gender';
    }
    if (!['Aadhaar', 'College ID', 'Government ID'].includes(documentType)) {
        return 'Invalid document type';
    }
    return null;
};

exports.validateTeam = ({ name }) => {
    if (!name || name.trim().length < 2) {
        return 'Team name must be at least 2 characters';
    }
    return null;
};

exports.validateCoach = ({ name, documentType }) => {
    if (!name || name.trim().length < 2) {
        return 'Name must be at least 2 characters';
    }
    if (!['Aadhaar', 'Government ID'].includes(documentType)) {
        return 'Invalid document type';
    }
    return null;
};

exports.validateEvent = ({ name, date, category }) => {
    if (!name || name.trim().length < 2) {
        return 'Event name must be at least 2 characters';
    }
    if (!date || isNaN(new Date(date).getTime())) {
        return 'Invalid date';
    }
    if (!['Men', 'Women', 'Mixed'].includes(category)) {
        return 'Invalid category';
    }
    return null;
};
import { useState } from 'react';
import { registerCoach } from '../utils/api';

const CoachForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        documentType: 'Aadhaar',
        documentFile: null,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key]) data.append(key, formData[key]);
            });
            await registerCoach(data);
            setSuccess('Coach registered successfully');
            setFormData({ name: '', documentType: 'Aadhaar', documentFile: null });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="form-container">
            <h2>Register Coach</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Document Type</label>
                    <select
                        name="documentType"
                        value={formData.documentType}
                        onChange={handleChange}
                    >
                        <option value="Aadhaar">Aadhaar</option>
                        <option value="Government ID">Government ID</option>
                    </select>
                </div>
                <div>
                    <label>Document File</label>
                    <input
                        type="file"
                        name="documentFile"
                        onChange={handleChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default CoachForm;
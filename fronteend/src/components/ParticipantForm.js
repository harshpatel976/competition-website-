import { useState, useEffect } from 'react';
import { registerParticipant, getTeams } from '../utils/api';

const ParticipantForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'Male',
        documentType: 'Aadhaar',
        teamId: '',
        documentFile: null,
    });
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await getTeams();
                setTeams(response.data);
            } catch (err) {
                setError('Failed to fetch teams');
            }
        };
        fetchTeams();
    }, []);

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
            await registerParticipant(data);
            setSuccess('Participant registered successfully');
            setFormData({ name: '', age: '', gender: 'Male', documentType: 'Aadhaar', teamId: '', documentFile: null });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="form-container">
            <h2>Register Participant</h2>
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
                    <label>Age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label>Document Type</label>
                    <select
                        name="documentType"
                        value={formData.documentType}
                        onChange={handleChange}
                    >
                        <option value="Aadhaar">Aadhaar</option>
                        <option value="College ID">College ID</option>
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
                <div>
                    <label>Team (Optional)</label>
                    <select
                        name="teamId"
                        value={formData.teamId}
                        onChange={handleChange}
                    >
                        <option value="">None</option>
                        {teams.map(team => (
                            <option key={team._id} value={team._id}>{team.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default ParticipantForm;
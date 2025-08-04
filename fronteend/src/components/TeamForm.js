import { useState, useEffect } from 'react';
import { registerTeam, getCoaches } from '../utils/api';

const TeamForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        coachId: '',
    });
    const [coaches, setCoaches] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchCoaches = async () => {
            try {
                const response = await getCoaches();
                setCoaches(response.data);
            } catch (err) {
                setError('Failed to fetch coaches');
            }
        };
        fetchCoaches();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await registerTeam(formData);
            setSuccess('Team registered successfully');
            setFormData({ name: '', coachId: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="form-container">
            <h2>Register Team</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Team Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Coach (Optional)</label>
                    <select
                        name="coachId"
                        value={formData.coachId}
                        onChange={handleChange}
                    >
                        <option value="">None</option>
                        {coaches.map(coach => (
                            <option key={coach._id} value={coach._id}>{coach.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default TeamForm;
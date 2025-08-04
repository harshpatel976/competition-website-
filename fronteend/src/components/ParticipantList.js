import { useState, useEffect } from 'react';
import { getParticipants, getTeams, updateParticipant, deleteParticipant } from '../utils/api';

const ParticipantList = ({ isAuthenticated }) => {
    const [participants, setParticipants] = useState([]);
    const [teams, setTeams] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        age: '',
        gender: 'Male',
        documentType: 'Aadhaar',
        teamId: '',
        documentFile: null,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!isAuthenticated) return;
        const fetchData = async () => {
            try {
                const [participantRes, teamRes] = await Promise.all([getParticipants(), getTeams()]);
                setParticipants(participantRes.data);
                setTeams(teamRes.data);
            } catch (err) {
                setError('Failed to fetch data');
            }
        };
        fetchData();
    }, [isAuthenticated]);

    const handleEdit = (participant) => {
        setEditingId(participant._id);
        setEditForm({
            name: participant.name,
            age: participant.age,
            gender: participant.gender,
            documentType: participant.documentType,
            teamId: participant.teamId?._id || '',
            documentFile: null,
        });
    };

    const handleEditChange = (e) => {
        const { name, value, files } = e.target;
        setEditForm({
            ...editForm,
            [name]: files ? files[0] : value,
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const data = new FormData();
            Object.keys(editForm).forEach(key => {
                if (editForm[key]) data.append(key, editForm[key]);
            });
            await updateParticipant(editingId, data);
            setSuccess('Participant updated successfully');
            setEditingId(null);
            setEditForm({ name: '', age: '', gender: 'Male', documentType: 'Aadhaar', teamId: '', documentFile: null });
            const response = await getParticipants();
            setParticipants(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Update failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this participant?')) return;
        try {
            await deleteParticipant(id);
            setSuccess('Participant deleted successfully');
            setParticipants(participants.filter(p => p._id !== id));
        } catch (err) {
            setError(err.response?.data?.message || 'Deletion failed');
        }
    };

    return (
        <div className="section-container">
            <h2>Manage Participants</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            {participants.length === 0 ? (
                <p className="no-data">No participants registered</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Team</th>
                            <th>Document</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map(participant => (
                            <tr key={participant._id}>
                                <td>{participant.name}</td>
                                <td>{participant.age}</td>
                                <td>{participant.gender}</td>
                                <td>{participant.teamId?.name || 'None'}</td>
                                <td>
                                    <a href={participant.documentUrl} target="_blank" rel="noopener noreferrer">View</a>
                                </td>
                                <td>
                                    <button className="edit" onClick={() => handleEdit(participant)}>Edit</button>
                                    <button className="delete" onClick={() => handleDelete(participant._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {editingId && (
                <div className="form-container">
                    <h3>Edit Participant</h3>
                    <form onSubmit={handleEditSubmit}>
                        <div>
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={editForm.name}
                                onChange={handleEditChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Age</label>
                            <input
                                type="number"
                                name="age"
                                value={editForm.age}
                                onChange={handleEditChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Gender</label>
                            <select
                                name="gender"
                                value={editForm.gender}
                                onChange={handleEditChange}
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
                                value={editForm.documentType}
                                onChange={handleEditChange}
                            >
                                <option value="Aadhaar">Aadhaar</option>
                                <option value="College ID">College ID</option>
                                <option value="Government ID">Government ID</option>
                            </select>
                        </div>
                        <div>
                            <label>Document File (Optional)</label>
                            <input
                                type="file"
                                name="documentFile"
                                onChange={handleEditChange}
                                accept=".pdf,.jpg,.jpeg,.png"
                            />
                        </div>
                        <div>
                            <label>Team (Optional)</label>
                            <select
                                name="teamId"
                                value={editForm.teamId}
                                onChange={handleEditChange}
                            >
                                <option value="">None</option>
                                {teams.map(team => (
                                    <option key={team._id} value={team._id}>{team.name}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit">Save Changes</button>
                        <button type="button" className="cancel" onClick={() => setEditingId(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ParticipantList;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent, updateResult, getEvents, getParticipants } from '../utils/api';

const AdminDashboard = ({ isAuthenticated }) => {
    const [eventForm, setEventForm] = useState({ name: '', date: '', category: 'Men', record: '' });
    const [resultForm, setResultForm] = useState({ eventId: '', participantId: '', time: '', position: '' });
    const [events, setEvents] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/admin');
        }
        const fetchData = async () => {
            try {
                const [eventRes, participantRes] = await Promise.all([getEvents(), getParticipants()]);
                setEvents(eventRes.data);
                setParticipants(participantRes.data);
            } catch (err) {
                setError('Failed to fetch data');
            }
        };
        fetchData();
    }, [isAuthenticated, navigate]);

    const handleEventChange = (e) => {
        setEventForm({ ...eventForm, [e.target.name]: e.target.value });
    };

    const handleResultChange = (e) => {
        setResultForm({ ...resultForm, [e.target.name]: e.target.value });
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await createEvent(eventForm);
            setSuccess('Event created successfully');
            setEventForm({ name: '', date: '', category: 'Men', record: '' });
            const response = await getEvents();
            setEvents(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create event');
        }
    };

    const handleResultSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await updateResult(resultForm);
            setSuccess('Result updated successfully');
            setResultForm({ eventId: '', participantId: '', time: '', position: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update result');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Create Event</h3>
                    <form onSubmit={handleEventSubmit} className="space-y-4">
                        <div>
                            <label className="block">Event Name</label>
                            <input
                                type="text"
                                name="name"
                                value={eventForm.name}
                                onChange={handleEventChange}
                                className="w-full border p-2 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={eventForm.date}
                                onChange={handleEventChange}
                                className="w-full border p-2 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block">Category</label>
                            <select
                                name="category"
                                value={eventForm.category}
                                onChange={handleEventChange}
                                className="w-full border p-2 rounded"
                            >
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Mixed">Mixed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block">Record Time (seconds, optional)</label>
                            <input
                                type="number"
                                name="record"
                                value={eventForm.record}
                                onChange={handleEventChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">Create Event</button>
                    </form>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Update Result</h3>
                    <form onSubmit={handleResultSubmit} className="space-y-4">
                        <div>
                            <label className="block">Event</label>
                            <select
                                name="eventId"
                                value={resultForm.eventId}
                                onChange={handleResultChange}
                                className="w-full border p-2 rounded"
                                required
                            >
                                <option value="">Select Event</option>
                                {events.map(event => (
                                    <option key={event._id} value={event._id}>{event.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block">Participant</label>
                            <select
                                name="participantId"
                                value={resultForm.participantId}
                                onChange={handleResultChange}
                                className="w-full border p-2 rounded"
                                required
                            >
                                <option value="">Select Participant</option>
                                {participants.map(participant => (
                                    <option key={participant._id} value={participant._id}>{participant.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block">Time (seconds)</label>
                            <input
                                type="number"
                                name="time"
                                value={resultForm.time}
                                onChange={handleResultChange}
                                className="w-full border p-2 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block">Position (optional)</label>
                            <input
                                type="number"
                                name="position"
                                value={resultForm.position}
                                onChange={handleResultChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">Update Result</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
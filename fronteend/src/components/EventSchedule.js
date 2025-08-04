import { useState, useEffect } from 'react';
import { getEvents } from '../utils/api';

const EventSchedule = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEvents();
                setEvents(response.data);
            } catch (err) {
                setError('Failed to fetch events');
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="section-container">
            <h2>Event Schedule</h2>
            {error && <p className="error">{error}</p>}
            {events.length === 0 ? (
                <p className="no-data">No events available</p>
            ) : (
                <div className="grid">
                    {events.map(event => (
                        <div key={event._id} className="card">
                            <h3>{event.name}</h3>
                            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                            <p>Category: {event.category}</p>
                            <p>Record: {event.record ? `${event.record} seconds` : 'N/A'}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventSchedule;
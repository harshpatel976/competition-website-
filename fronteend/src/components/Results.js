import { useState, useEffect } from 'react';
import { getResults } from '../utils/api';
import { subscribeToResults } from '../utils/socket';

const Results = () => {
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await getResults();
                setResults(response.data);
            } catch (err) {
                setError('Failed to fetch results');
            }
        };
        fetchResults();

        const unsubscribe = subscribeToResults((data) => {
            setResults(prev => [...prev, data]);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="section-container">
            <h2>Results</h2>
            {error && <p className="error">{error}</p>}
            {results.length === 0 ? (
                <p className="no-data">No results available</p>
            ) : (
                <div className="grid">
                    {results.map(result => (
                        <div key={result._id} className="card">
                            <h3>{result.eventId?.name}</h3>
                            <p>Participant: {result.participantId?.name}</p>
                            <p>Time: {result.time} seconds</p>
                            <p>Position: {result.position || 'N/A'}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Results;
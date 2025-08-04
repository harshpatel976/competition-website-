import { useState, useEffect } from 'react';
import { getMedalTally } from '../utils/api';
import { subscribeToMedalTally } from '../utils/socket';

const MedalTally = () => {
    const [tally, setTally] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTally = async () => {
            try {
                const response = await getMedalTally();
                setTally(response.data);
            } catch (err) {
                setError('Failed to fetch medal tally');
            }
        };
        fetchTally();

        const unsubscribe = subscribeToMedalTally((newTally) => {
            setTally(newTally);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="section-container">
            <h2>Medal Tally</h2>
            {error && <p className="error">{error}</p>}
            {Object.keys(tally).length === 0 ? (
                <p className="no-data">No medals awarded yet</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Team</th>
                            <th>Gold</th>
                            <th>Silver</th>
                            <th>Bronze</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(tally).map(([teamId, medals]) => (
                            <tr key={teamId}>
                                <td>{teamId === 'Independent' ? 'Independent' : teamId}</td>
                                <td>{medals.gold}</td>
                                <td>{medals.silver}</td>
                                <td>{medals.bronze}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MedalTally;
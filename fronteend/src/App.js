import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TeamRegistration from './pages/TeamRegistration';
import CoachRegistration from './pages/CoachRegistration';
import Events from './pages/Events';
import ResultsPage from './pages/ResultPage';
import MedalTallyPage from './pages/MedalTallyPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import ParticipantRegistration from './pages/ParticipantRegistraion';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/participants" element={<ParticipantRegistration />} />
                    <Route path="/teams" element={<TeamRegistration />} />
                    <Route path="/coaches" element={<CoachRegistration />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path="/medals" element={<MedalTallyPage />} />
                    <Route path="/admin" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard isAuthenticated={isAuthenticated} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
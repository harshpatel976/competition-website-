import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <nav>
            <div className="container">
                <Link to="/">Swimming Competition</Link>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/participants">Register Participant</Link>
                    <Link to="/teams">Register Team</Link>
                    <Link to="/coaches">Register Coach</Link>
                    <Link to="/events">Events</Link>
                    <Link to="/results">Results</Link>
                    <Link to="/medals">Medal Tally</Link>
                    {isAuthenticated ? (
                        <>
                            <Link to="/admin/dashboard">Admin Dashboard</Link>
                            <Link to="/admin/participants">Manage Participants</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <Link to="/admin">Admin Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
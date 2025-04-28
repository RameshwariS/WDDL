import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './Navbar.css'

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',
      backgroundColor: '#f0f0f0',
      borderBottom: '1px solid #ddd'
    }}>
      <div>
        <Link to="/upload" style={{ marginRight: '1rem' }}>Upload</Link>
        {user && <Link to="/dashboard">Dashboard</Link>}
      </div>
      <div>
        {user ? (
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
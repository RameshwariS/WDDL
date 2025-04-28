import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div className="space-x-4">
        <Link to="/">Home</Link>
        {user && <Link to="/upload">Upload</Link>}
        {user && <Link to="/dashboard">Dashboard</Link>}
      </div>
      <div>
        {user ? (
          <button onClick={logout} className="bg-red-500 px-4 py-1 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

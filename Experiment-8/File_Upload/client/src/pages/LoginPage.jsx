// client/src/pages/LoginPage.jsx
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/auth.css';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(formData);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Login</h1>
      {error && <div className="error-message">{error}</div>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
      <div className="auth-link">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default LoginPage;
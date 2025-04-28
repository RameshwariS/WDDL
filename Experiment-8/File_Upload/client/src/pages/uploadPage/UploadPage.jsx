import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './upload.css';

function UploadPage() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      const response = await axios.post('/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Explicitly add token
        },
        withCredentials: true // Important for cookies
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Upload error:', error);
      setError(error.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload File</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="file" onChange={handleFileChange} required />
        </div>
        <button type="submit" disabled={isUploading || !file}>
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}

export default UploadPage;
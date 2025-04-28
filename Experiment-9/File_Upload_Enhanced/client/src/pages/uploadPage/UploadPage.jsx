// src/pages/UploadPage.jsx
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './upload.css'

function UploadPage() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  // src/pages/UploadPage.jsx
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      await axios.post('/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Upload failed');
    }
  };
  
  return (
    <div className="upload-container">
      <h1>Upload File</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}

export default UploadPage;
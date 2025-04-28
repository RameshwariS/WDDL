import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './dashboard.css';

export default function DashboardPage() {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('/api/files/myfiles');
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchFiles();
  }, [user]);

  const handleDelete = async (fileId) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await axios.delete(`/api/files/${fileId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFiles(files.filter((file) => file._id !== fileId));
        alert('File deleted successfully');
      } catch (error) {
        console.error('Error deleting file:', error);
        alert('Failed to delete file');
      }
    }
  };

  const groupFilesByOriginalName = () => {
    const grouped = {};
    files.forEach((file) => {
      if (!grouped[file.originalname]) {
        grouped[file.originalname] = [];
      }
      grouped[file.originalname].push(file);
    });

    // Sort versions by upload time (older versions first)
    Object.values(grouped).forEach((versions) =>
      versions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    );

    return grouped;
  };

  if (!user) return <div>Please login to view files</div>;

  const groupedFiles = groupFilesByOriginalName();

  return (
    <div className="dashboard">
      <h1>Your Uploaded Files</h1>

      {loading ? (
        <p>Loading files...</p>
      ) : files.length === 0 ? (
        <p>No files uploaded yet</p>
      ) : (
        Object.entries(groupedFiles).map(([originalname, versions]) => (
          <div key={originalname} className="file-group">
            <h2>{originalname}</h2>
            {versions.map((file, index) => (
              <div key={file._id} className="file-card">
                <div className="file-info">
                  <h4>Version v{index + 1}</h4>
                  <p>Type: {file.mimetype}</p>
                  <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                  <p>Uploaded: {new Date(file.createdAt).toLocaleString()}</p>
                </div>
                <div className="file-actions">
                  <a
                    href={`${axios.defaults.baseURL}/api/files/${file._id}/download`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download-btn"
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        const response = await axios.get(`/api/files/${file._id}/download`, {
                          responseType: 'blob',
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                          },
                        });

                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', file.originalname);
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                      } catch (error) {
                        console.error('Download failed:', error);
                        alert('Failed to download file');
                      }
                    }}
                  >
                    Download
                  </a>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(file._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

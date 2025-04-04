// src/components/FileList/FileUploadModal.js
import React, { useState } from 'react';
import { FaTimes, FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import './FileUploadModal.css';

const FileUploadModal = ({ onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [category, setCategory] = useState('general');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file || !fileName) {
      setError('Please fill all fields');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', fileName);
      formData.append('category', category);

      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials: true
      });

      if (response.data.success) {
        onSuccess(response.data.file);
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        
        <h2>Upload New File</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>File Name</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="general">General</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
              <option value="document">Document</option>
            </select>
          </div>
          
          <div className="file-upload">
            <label>
              <FaCloudUploadAlt className="upload-icon" />
              <span>{file ? file.name : 'Choose File'}</span>
              <input
                type="file"
                onChange={handleFileChange}
                required
                hidden
              />
            </label>
          </div>
          
          <button
            type="submit"
            className="upload-button"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload File'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileUploadModal;
import React, { useState } from 'react';
import axios from 'axios';
import App1 from './App.css'

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreviewUrl('');
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        setUploadStatus('Uploading...');
        const formData = new FormData();
        formData.append('file', selectedFile);
        const response = await axios.post('/api/upload', formData);
        setUploadStatus(response.data.status);
      } catch (error) {
        setUploadStatus('Upload failed');
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Upload e-bill PDF</h1>
      <div className="upload-btn-wrapper">
        <button className="btn">Upload a file</button>
        <input type="file" accept="application/pdf" onChange={handleFileSelect} />
      </div>
      {previewUrl && (
        <div className="preview">
          <h2>Preview</h2>
          <div className="pdf-preview">
            <embed className="embed-pdf" src={previewUrl} type="application/pdf" />
          </div>
        </div>
      )}
      <button className="button" onClick={handleFileUpload}>Upload</button>
      {uploadStatus && <p className="status">Status: {uploadStatus}</p>}
    </div>
  );
};

export default App;

import { useState } from 'react';
import axios from 'axios';

const ImageUploadModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (endpoint) => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/${endpoint}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error uploading file:', error);
      setResult('Error processing the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <button style={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 style={styles.title}>Upload Image for Analysis</h2>
        <div style={styles.uploadSection}>
          <label htmlFor="file-upload" style={styles.uploadLabel}>
            Choose Image
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            style={styles.fileInput}
            accept="image/*"
          />
          {imagePreview && (
            <div style={styles.imagePreviewContainer}>
              <img src={imagePreview} alt="Preview" style={styles.imagePreview} />
            </div>
          )}
        </div>
        <div style={styles.buttonContainer}>
          <button
            style={styles.analyzeButton}
            onClick={() => handleSubmit('detect_eye_redness')}
            disabled={loading || !file}
          >
            {loading ? 'Processing...' : 'Detect Eye Redness'}
          </button>
          <button
            style={styles.analyzeButton}
            onClick={() => handleSubmit('detect_yellowish_percentage')}
            disabled={loading || !file}
          >
            {loading ? 'Processing...' : 'Detect Yellowish Skin'}
          </button>
        </div>
        {result && (
          <div style={styles.resultContainer}>
            <h3 style={styles.resultTitle}>Analysis Result</h3>
            <p style={styles.resultText}>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    width: '450px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333',
  },
  uploadSection: {
    marginBottom: '20px',
  },
  uploadLabel: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: '#fff',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  uploadLabelHover: {
    backgroundColor: '#005bb5',
  },
  fileInput: {
    display: 'none',
  },
  imagePreviewContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '200px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
  },
  analyzeButton: {
    padding: '12px 24px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  analyzeButtonHover: {
    backgroundColor: '#005bb5',
  },
  analyzeButtonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  resultContainer: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #eee',
  },
  resultTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#333',
  },
  resultText: {
    fontSize: '16px',
    color: '#555',
  },
};

export default ImageUploadModal;
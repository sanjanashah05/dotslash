import { useState } from 'react';
import axios from 'axios';

const ImageUploadModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/detect_eye_redness', formData, {
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
        <h2>Upload Image for Eye Redness Detection</h2>
        <input type="file" onChange={handleFileChange} />
        <button
          style={styles.analyzeButton}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Analyze Image'}
        </button>
        {result && <div style={styles.result}>{result}</div>}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  analyzeButton: {
    margin: '5px',
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  result: {
    marginTop: '20px',
    fontSize: '18px',
    color: '#333',
  },
};

export default ImageUploadModal;
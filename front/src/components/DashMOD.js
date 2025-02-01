import { useState } from 'react';
import ImageUploadModal from '@/components/Imageuploadmodal';

export default function DashboardPagee() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={styles.container}>
      <h1>Welcome to HealthCheck</h1>
      <button style={styles.bookButton} onClick={openModal}>
        Book Appointment
      </button>
      {isModalOpen && <ImageUploadModal onClose={closeModal} />}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  bookButton: {
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
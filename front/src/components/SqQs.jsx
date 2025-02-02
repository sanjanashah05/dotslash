import { useState } from 'react';
import ImageUploadModal from '@/components/Imageuploadmodal';
import DynamicQuestions from '@/components/DynamicQuestions';

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={styles.container}>
      <h1>Welcome to HealthCheck</h1>
      <button style={styles.bookButton} onClick={openModal}>
        Test
      </button>
      {isModalOpen && <ImageUploadModal onClose={closeModal} />}

      {/* Add Dynamic Questions Section */}
      <div style={styles.section}>
        <h2>Health Questionnaire</h2>
        <DynamicQuestions />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    padding: '20px',
  },
  bookButton: {
    padding: '15px 30px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '600',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  section: {
    marginTop: '40px',
    width: '100%',
    maxWidth: '800px',
  },
};
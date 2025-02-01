import { useState } from 'react';
import ImageUploadModal from '@/components/Imageuploadmodal';

export default function DashboardPagee() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={styles.container}>
      <div style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Welcome to HealthCheck</h1>
        <p style={styles.heroSubtitle}>
          Your AI-powered health assistant for quick and accurate analysis of eye redness and skin conditions.
        </p>
        <button style={styles.bookButton} onClick={openModal}>
          Book Appointment
        </button>
      </div>

      <div style={styles.featuresSection}>
        <h2 style={styles.featuresTitle}>What We Offer</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <img
              src="https://media.istockphoto.com/id/1647878132/photo/red-eye-suffering-from-allergy.jpg?s=612x612&w=0&k=20&c=SpFQLXzKBZ0ADPSD0BfntA5r1xpQxWfAmVPUkVcFGk4=" // Replace with your image path
              alt="Eye Redness Detection"
              style={styles.featureImage}
            />
            <h3 style={styles.featureTitle}>Eye Redness Detection</h3>
            <p style={styles.featureDescription}>
              Detect eye redness in seconds with our advanced AI-powered analysis.
            </p>
          </div>
          <div style={styles.featureCard}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/19/Jaundice08.jpg" // Replace with your image path
              alt="Skin Analysis"
              style={styles.featureImage}
            />
            <h3 style={styles.featureTitle}>Skin Analysis</h3>
            <p style={styles.featureDescription}>
              Analyze your skin for yellowish tones and get instant results.
            </p>
          </div>
        </div>
      </div>

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
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    padding: '20px',
  },
  heroSection: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '20px',
  },
  heroSubtitle: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '30px',
    maxWidth: '600px',
    lineHeight: '1.6',
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
  bookButtonHover: {
    backgroundColor: '#005bb5',
    transform: 'scale(1.05)',
  },
  featuresSection: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  featuresTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: '40px',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  },
  featureCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  featureCardHover: {
    transform: 'translateY(-10px)',
  },
  featureImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  featureTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
  },
  featureDescription: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6',
  },
};

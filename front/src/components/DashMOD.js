import { useState } from 'react';
import ImageUploadModal from '@/components/Imageuploadmodal';

export default function DashboardPagee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Welcome to NidaanAI</h1>
        <p style={styles.heroSubtitle}>
          Your AI-powered health assistant for quick and accurate analysis of eye redness and skin conditions.
        </p>
        <button style={styles.bookButton} onClick={openModal}>
          Test
        </button>
      </div>

      {/* Features Section */}
      <div style={styles.featuresSection}>
        <h2 style={styles.featuresTitle}>What We Offer</h2>
        <div style={styles.featuresGrid}>
          {/* Feature Card 1 */}
          <div style={styles.featureCard}>
            <img
              src="https://media.istockphoto.com/id/1647878132/photo/red-eye-suffering-from-allergy.jpg?s=612x612&w=0&k=20&c=SpFQLXzKBZ0ADPSD0BfntA5r1xpQxWfAmVPUkVcFGk4="
              alt="Eye Redness Detection"
              style={styles.featureImage}
            />
            <h3 style={styles.featureTitle}>Eye Redness Detection</h3>
            <p style={styles.featureDescription}>
              Detect eye redness in seconds with our advanced AI-powered analysis.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div style={styles.featureCard}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/19/Jaundice08.jpg"
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

      {/* Modal */}
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
    backgroundColor: '#f5f8ff', // Soft blue background for a calm, medical feel
    padding: '20px',
    fontFamily: "'Poppins', sans-serif", // Modern font
  },
  heroSection: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#2c3e50', // Deep blue for contrast
    marginBottom: '20px',
    letterSpacing: '1px',
  },
  heroSubtitle: {
    fontSize: '18px',
    color: '#7f8c8d', // Gray for subtlety
    marginBottom: '30px',
    maxWidth: '600px',
    lineHeight: '1.6',
  },
  bookButton: {
    padding: '15px 30px',
    backgroundColor: '#4CAF50', // Green for a positive, medical vibe
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '600',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  bookButtonHover: {
    backgroundColor: '#3e8e41', // Darker green on hover
    transform: 'scale(1.05)',
  },
  featuresSection: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    backgroundColor: '#ffffff', // Clean white background
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
  },
  featuresTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#2c3e50', // Consistent deep blue
    textAlign: 'center',
    marginBottom: '40px',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  },
  featureCard: {
    backgroundColor: '#ecf0f1', // Light gray for cards
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  featureCardHover: {
    transform: 'translateY(-10px)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)', // Enhanced shadow on hover
  },
  featureImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '20px',
    transition: 'transform 0.3s ease',
  },
  featureImageHover: {
    transform: 'scale(1.05)', // Slight zoom effect on hover
  },
  featureTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '10px',
  },
  featureDescription: {
    fontSize: '16px',
    color: '#7f8c8d',
    lineHeight: '1.6',
  },
};
import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [response, setResponse] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [miraResponse, setMiraResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { age, gender, response, symptoms };

    try {
      // Send the form data to the Flask backend
      const res = await axios.post('http://localhost:5000/generate_prescription', data);
      // Get the Mira API response and set it
      setMiraResponse(res.data.result); 
    } catch (err) {
      setError('Error communicating with Mira API');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: 'black' }}>Mira API Response</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <label style={{ color: 'black', display: 'block', marginBottom: '10px' }}>
          Age:
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
          />
        </label>

        <label style={{ color: 'black', display: 'block', marginBottom: '10px' }}>
          Gender:
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
          />
        </label>

        <label style={{ color: 'black', display: 'block', marginBottom: '10px' }}>
          Response (yes/no):
          <input
            type="text"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
          />
        </label>

        <label style={{ color: 'black', display: 'block', marginBottom: '10px' }}>
          Symptoms:
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px', height: '100px' }}
          />
        </label>

        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px' }}>
          Submit
        </button>
      </form>

      {miraResponse && (
        <div style={{ marginTop: '20px' }}>
          <h2 style={{ color: 'black' }}>Mira's Response</h2>
          <p style={{ color: 'black' }}>{miraResponse}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Home;

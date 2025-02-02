
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/dashboard';
import PatientForm from './components/PatientForm';
import PatientDetail from './components/PatientDetail'; 
import UpdatePatientForm from './components/UpdatePatientForm'; 
import RegisterPage from './components/RegisterPage';
import VerifyOTP from './components/VerifyOTP';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedLoginState = sessionStorage.getItem('isLoggedIn');
    if (storedLoginState === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogin = (username) => {
    setUsername(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
    setUsername('');
  };

  return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage onLoginSuccess={handleLoginSuccess} onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
          <Route
            path="/verify-otp"
            element={localStorage.getItem('isRegistering') === 'true' ? <VerifyOTP /> : <Navigate to="/" />}
          />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard username={username} onLogout={handleLogout} /> : <Navigate to="/" />}
          />
          <Route
            path="/patientform"
            element={isLoggedIn ? <PatientForm /> : <Navigate to="/" />}
          />
          <Route
            path="/patients/:id"
            element={isLoggedIn ? <PatientDetail /> : <Navigate to="/" />} // Patient detail route
          />
          <Route path="/patient/:patientId" element={<PatientDetail />} />
          <Route
            path="/patient/edit/:id"
            element={isLoggedIn ? <UpdatePatientForm /> : <Navigate to="/" />} // Update patient route
          />
        
        </Routes>
      </Router>
  );
}

export default App;

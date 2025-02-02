import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setisRegistering] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/verify-email', {
        email,
      });

      if (response.data.success) {
        setSuccess('Email verified! OTP sent to your email.');
        setError('');
        localStorage.setItem('isRegistering', 'true');
        setTimeout(() => navigate('/verify-otp', { state: { email, username, password } }), 2000);
      } else {
        setError(response.data.message || 'Email verification failed.');
      }
    } catch (error) {
      console.error('Error during email verification:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg p-8 bg-transparent rounded-lg mx-4 sm:mx-6 md:mx-8">
        <h2 className="text-center text-white text-xl font-semibold mb-6">Register as a New Doctor</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-semibold text-white">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 mb-5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-white">Username</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 mb-5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-white">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 mb-5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-white">Confirm Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 mb-5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg shadow-lg hover:from-indigo-700 hover:to-indigo-600 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Proceed
          </button>
        </form>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate('/')}
            className="text-indigo-500 hover:text-indigo-600 focus:outline-none"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;

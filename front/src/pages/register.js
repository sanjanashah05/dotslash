'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const RegisterUser = () => {
  // State variables
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Router for navigation
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // API request to verify email
      const response = await axios.post('http://localhost:5000/api/verify-email', { email });

      if (response.data.success) {
        setSuccess('Email verified! OTP sent to your email.');
        setError('');
        localStorage.setItem('isRegistering', 'true');

        // Navigate after a short delay
        setTimeout(() => {
            router.push({
              pathname: '/verify-otp',
              query: { email, username, password }, // Pass the necessary data
            });
          }, 1000);
      } else {
        setError(response.data.message || 'Email verification failed.');
      }
    } catch (error) {
      console.error('Error during email verification:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-white via-cyan-100 to-white">
      <div className="w-full max-w-md p-8 bg-transparent rounded-lg">
      <h2 className="text-center text-cyan-600 text-3xl font-semibold mb-1">NidaanAI</h2>
        <h2 className="text-center text-black text-xl font-semibold mb-6">Register as a New User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-lg font-semibold text-black">Email</label>
            <input
              type="email"
              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Username Input */}
          <div>
            <label className="block text-lg font-semibold text-black">Username</label>
            <input
              type="text"
              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-lg font-medium text-black">Password</label>
            <input
              type="password"
              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-lg font-medium text-black">Confirm Password</label>
            <input
              type="password"
              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Error & Success Messages */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg shadow-lg hover:from-indigo-700 hover:to-indigo-600"
          >
            Proceed
          </button>
        </form>

        {/* Back to Login */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => router.push('/login')}
            className="text-indigo-500 hover:text-indigo-600"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;

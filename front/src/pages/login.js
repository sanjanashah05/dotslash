'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (captchaInput !== captcha) {
      setError('Invalid CAPTCHA');
      generateCaptcha();
      setCaptchaInput('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      if (response.data.success) {
        localStorage.setItem('accessToken', response.data.accessToken);
        router.push('/dashboard');
      } else {
        setError('Invalid login credentials');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-white via-cyan-100 to-white">
      <div className="w-full max-w-md p-8 bg-transparent rounded-lg">
      <h2 className="text-center text-cyan-600 text-3xl font-semibold mb-1">NidaanAI</h2>
        <h2 className="text-center text-black text-xl font-semibold mb-6">Dashboard Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-semibold text-black">Username</label>
            <input type="text" className="text-black w-full p-2 border rounded-md" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label className="block text-lg font-medium text-black">Password</label>
            <input type="password" className="text-black w-full p-2 border rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div>
            <label className="block text-lg font-medium text-black mb-2">CAPTCHA verification</label>
            <div className="flex items-center space-x-3 mb-4">
              <div className="px-4 py-2 bg-gray-800 text-white font-mono rounded-md">{captcha}</div>
              <button type="button" className="px-3 py-1 bg-indigo-600 text-white rounded-md" onClick={generateCaptcha}>Refresh</button>
            </div>
            <input type="text" className="text-black w-full p-2 border rounded-md" placeholder="Enter CAPTCHA" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} required />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button type="submit" className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg">Log in</button>
        </form>
        <div className="flex justify-center mt-4">
          <button onClick={() => router.push('/register')} className="text-indigo-500 hover:text-indigo-600">Register as a user</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const VerifyOTP = () => {
  const router = useRouter();
  const { query } = router;  // Access query parameters
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Destructure email, username, password from the query parameters (set on the previous page)
  const { email, username, password } = query;

  // Handle OTP input change
  const handleChange = (value, index) => {
    if (isNaN(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to the next input
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 6) {
      setError('Please enter a 6-digit OTP.');
      return;
    }

    try {
        const response = await axios.post('http://localhost:5000/api/verify-otp', {
            email: email,
            otp: enteredOtp,
          });
          

      if (response.data.success) {
        setSuccess('OTP verified successfully!');
        setError('');

        // If OTP verification is successful, proceed with registration
        await axios.post('http://localhost:5000/api/register', {
          username,
          password,
        });

        // Redirect after 1 second
        setTimeout(() => router.push('/login'), 1000); 
      } else {
        setError(response.data.message || 'Invalid OTP.');
      }
    } catch (err) {
      console.error('Error during OTP verification:', err);
      setError('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    // Make sure that email, username, and password are passed via query
    if (!email || !username || !password) {
      setError('Missing required data. Please try again.');
    }
  }, [email, username, password]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-white via-cyan-100 to-white">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg p-8 bg-transparent rounded-lg mx-4 sm:mx-6 md:mx-8">
      <h2 className="text-center text-cyan-600 text-3xl font-semibold mb-1">NidaanAI</h2>
        <h2 className="text-center text-black text-xl font-semibold mb-6">Verify OTP</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-center text-black mb-4">Enter the 6-digit OTP sent to your email:</p>
          <div className="flex justify-center space-x-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
                    document.getElementById(`otp-input-${index - 1}`).focus();
                  }
                }}
                autoComplete="off"
                className="w-12 h-12 text-center text-lg font-bold text-black border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg shadow-lg hover:from-indigo-700 hover:to-indigo-600 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Verify OTP
          </button>
        </form>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => router.push('/register')}
            className="text-indigo-500 hover:text-indigo-600 focus:outline-none"
          >
            Back to Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;

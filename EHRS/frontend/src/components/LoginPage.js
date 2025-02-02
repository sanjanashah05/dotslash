// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import bharatlogo from '../assets/bharatlogo.svg';

// const LoginPage = ({ onLoginSuccess, onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [captcha, setCaptcha] = useState('');
//   const [captchaInput, setCaptchaInput] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const generateCaptcha = () => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
//     for (let i = 0; i < 6; i++) {
//       result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     setCaptcha(result);
//     console.log("Generated CAPTCHA:", result); 
//   };

//   useEffect(() => {
//     generateCaptcha();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submitting Login:", username, password, captchaInput);

//     if (captchaInput !== captcha) {
//       setError('Invalid CAPTCHA');
//       generateCaptcha();
//       setCaptchaInput('');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/login', {
//         username,
//         password,
//         captchaInput,
//       });

//       if (response.data.success) {
//         localStorage.setItem('accessToken', response.data.accessToken);
//         onLoginSuccess();
//         onLogin(username);
//         navigate('/dashboard');
//       } else {
//         setError('Invalid login credentials');
//       }
//     } catch (error) {
//       console.error('There was an error!', error);
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-slate-900 via-purple-900 to-slate-900">
//       <div className="w-full max-w-sm sm:max-w-md md:max-w-lg p-8 bg-transparent rounded-lg mx-4 sm:mx-6 md:mx-8">
//         <img src={bharatlogo} alt="Bharatai logo" className="w-35 h-35 mx-auto mb-4" /> 
//         <h2 className="text-center text-white text-xl font-semibold mb-6">CMS Dashboard Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-lg font-semibold text-white">Username</label>
//             <input
//               type="text"
//               className="mt-1 block w-full px-3 py-2 mb-5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-lg font-medium text-white">Password</label>
//             <input
//               type="password"
//               className="mt-1 block w-full px-3 py-2 mb-5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-lg font-medium text-white mb-2">CAPTCHA verification</label>
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="px-4 py-2 bg-gray-800 text-white font-mono rounded-md shadow">
//                 {captcha}
//               </div>
//               <button
//                 type="button"
//                 className="px-3 py-1 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700"
//                 onClick={generateCaptcha}
//               >
//                 Refresh
//               </button>
//             </div>
//             <input
//               type="text"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-3"
//               placeholder="Enter CAPTCHA"
//               value={captchaInput}
//               onChange={(e) => setCaptchaInput(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//           <button
//             type="submit"
//             className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg shadow-lg hover:from-indigo-700 hover:to-indigo-600 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           >
//             Log in
//           </button>
//         </form>
//         <div className="flex justify-center mt-4">
//           <button
//             onClick={() => navigate('/register')}
//             className="text-indigo-500 hover:text-indigo-600 focus:outline-none"
//           >
//             Register as a user
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLoginSuccess, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
        onLoginSuccess();
        onLogin(username);
        navigate('/dashboard');
      } else {
        setError('Invalid login credentials');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg p-8 bg-transparent rounded-lg mx-4 sm:mx-6 md:mx-8">
        <h2 className="text-center text-white text-xl font-semibold mb-6">Electronic Health Record System</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-semibold text-white">Username</label>
            <input type="text" className="mt-1 block w-full px-3 py-2 mb-5 border border-gray-300 rounded-md shadow-sm" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label className="block text-lg font-medium text-white">Password</label>
            <input type="password" className="mt-1 block w-full px-3 py-2 mb-5 border border-gray-300 rounded-md shadow-sm" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div>
            <label className="block text-lg font-medium text-white mb-2">CAPTCHA verification</label>
            <div className="flex items-center space-x-3 mb-4">
              <div className="px-4 py-2 bg-gray-800 text-white font-mono rounded-md shadow">{captcha}</div>
              <button type="button" className="px-3 py-1 bg-indigo-600 text-white rounded-md shadow" onClick={generateCaptcha}>Refresh</button>
            </div>
            <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-3" placeholder="Enter CAPTCHA" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} required />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button type="submit" className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg shadow-lg">Log in</button>
        </form>
        <div className="flex justify-center mt-4">
          <button onClick={() => navigate('/register')} className="text-indigo-500 hover:text-indigo-600">Register as a user</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

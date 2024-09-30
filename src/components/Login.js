import React, { useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { setToken, getToken } from '../services/auth';
import { FaUser, FaLock } from 'react-icons/fa'; 

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login(username, password);
      setToken(data.data.token);
      var Token1 = getToken();
      console.log(Token1);
  
      setIsAuthenticated(true);
  
      const userRole = data.data.role.name;
  
      if (userRole === 'admins') {
        navigate('/adminDashboard');  
      } else if (userRole === 'super_admins') {
        navigate('/dashboard');  
      } else {
        setError("Role not recognized");  
      }
  
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
      <div className="bg-white bg-opacity-30 backdrop-blur-md p-8 rounded-lg shadow-xl max-w-lg w-full transition-all ">
        <h2 className="text-4xl text-white font-bold text-center mb-6 tracking-wider">Welcome Back!</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-white text-sm font-bold mb-2">Username</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-600" />
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-10 py-2 border border-gray-300 rounded-lg bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                required
              />
            </div>
          </div>
          <div className="mb-6 relative">
            <label className="block text-white text-sm font-bold mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-600" />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-10 py-2 border border-gray-300 rounded-lg bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-lg hover:bg-opacity-90 hover:shadow-lg transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

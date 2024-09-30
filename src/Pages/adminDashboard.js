import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeAdminTokenAndClinicId } from '../services/auth';
import {FaUsers, FaSignOutAlt } from 'react-icons/fa'; 

function Dashboard({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAdminTokenAndClinicId();
    setIsAuthenticated(false);
    navigate('/');
  };


  const goToShowClinic = () => {
    navigate('/show-clinic');
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="w-full md:w-1/6 bg-gradient-to-b from-teal-500 to-blue-600 text-white flex flex-col justify-between p-6 shadow-lg">
        <div>
          <h2 className="text-3xl font-bold mb-10 text-center tracking-wider">Admin Dashboard</h2>
          <ul>
            <li className="mb-6">
              <button onClick={goToShowClinic} className="flex items-center gap-4 text-white hover:text-gray-200 transition-all duration-300">
                <FaUsers className="text-xl" /> Show Clinic
              </button>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2 transition-all duration-300"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex items-center justify-center bg-gradient-to-r from-teal-100 to-cyan-100 p-10">
        <div className="bg-white bg-opacity-30 backdrop-blur-md p-8 rounded-lg shadow-xl text-center transition-all duration-300">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">Welcome Back Admin</h1>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

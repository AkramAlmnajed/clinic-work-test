import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  getToken, removeToken } from '../services/auth';  
import { FaClinicMedical, FaUserShield, FaUsers, FaSignOutAlt } from 'react-icons/fa'; 

function Admins({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    city_id: '',
    role_id: '2',  
    name_ar: '',
    name_en: '',
    phone_number: '',
    email: '',
    gender: '',
    birth_date: '',
    clinic_id: '',
    specialization_id: '',
    description: '',
  });
  const [successMessage, setSuccessMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleLogout = () => {
    removeToken();
    setIsAuthenticated(false);
    navigate('/');
  };

  const goToMedicalClinic = () => {
    navigate('/medical-clinic');
  };

  const goToAdmins = () => {
    navigate('/add-admin');
  };

  const goToShowAdmins = () => {
    navigate('/showAllAdmins');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://medical-clinic.serv00.net/api/actor', formData, {
        headers: {
          'Authorization': `Bearer ${getToken()}` 
        }
      });
      console.log('Admin added successfully:', response.data);

      setSuccessMessage(`Admin added successfully his ID is ${response.data.data.id}`);
      setErrorMessage('');

      setFormData({
        username: '',
        password: '',
        city_id: '',
        role_id: '2', 
        name_ar: '',
        name_en: '',
        phone_number: '',
        email: '',
        gender: '',
        birth_date: '',
        clinic_id: '',
        specialization_id: '',
        description: '',
      });


    } catch (error) {
      console.error('Error adding admin:', error);
      setErrorMessage('Failed to add admin. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="w-full md:w-1/6 bg-gradient-to-b from-teal-500 to-blue-600 text-white flex flex-col justify-between p-6 shadow-lg">
        <div>
          <h2 className="text-3xl font-bold mb-10 text-center tracking-wider">Super Admin Dashboard</h2>
          <ul>
            <li className="mb-6">
              <button onClick={goToMedicalClinic} className="flex items-center gap-4 text-white hover:text-gray-200 transition-all duration-300">
                <FaClinicMedical className="text-xl" /> Medical Clinic
              </button>
            </li>
            <li className="mb-6">
              <button onClick={goToAdmins} className="flex items-center gap-4 text-white hover:text-gray-200 transition-all duration-300">
                <FaUserShield className="text-xl" /> Admins
              </button>
            </li>
            <li className="mb-6">
              <button onClick={goToShowAdmins} className="flex items-center gap-4 text-white hover:text-gray-200 transition-all duration-300">
                <FaUsers className="text-xl" /> Show All Admins
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
  <div className="bg-white bg-opacity-30 backdrop-blur-md p-8 rounded-lg shadow-xl text-center w-full max-w-2xl transition-all duration-300">
    <button
      onClick={() => setFormVisible(!formVisible)}
      className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 mb-4 transition-all duration-300 flex items-center justify-center gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
      Add Admin
    </button>

    {successMessage && (
      <div className="bg-green-500 text-white px-4 py-2 mb-4 rounded-lg flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        {successMessage}
      </div>
    )}
    {errorMessage && (
      <div className="bg-red-500 text-white px-4 py-2 mb-4 rounded-lg flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        {errorMessage}
      </div>
    )}

    {formVisible && (
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-40 p-6 rounded-lg shadow-md w-full transition-all duration-300"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">City ID</label>
          <input
            type="text"
            name="city_id"
            value={formData.city_id}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Role ID (1 for Super Admin, 2 for Admin)</label>
          <input
            type="text"
            name="role_id"
            value={formData.role_id}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Name (Arabic)</label>
          <input
            type="text"
            name="name_ar"
            value={formData.name_ar}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Name (English)</label>
          <input
            type="text"
            name="name_en"
            value={formData.name_en}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          >
            <option value="">Select Gender</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Birth Date</label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Clinic ID</label>
          <input
            type="text"
            name="clinic_id"
            value={formData.clinic_id}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Specialization ID</label>
          <input
            type="text"
            name="specialization_id"
            value={formData.specialization_id}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Add Admin
        </button>
      </form>
    )}
  </div>
</main>
    </div>
  );
}

export default Admins;

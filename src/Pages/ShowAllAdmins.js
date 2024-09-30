import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../services/auth";
import Permissions from "./permisons"; 
import { FaClinicMedical, FaUserShield, FaUsers, FaSignOutAlt } from 'react-icons/fa'; 

function ShowAllAdmins({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState(null);
  const [showPermissions, setShowPermissions] = useState(false); 

  const token = getToken();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://medical-clinic.serv00.net/api/actor/${searchId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAdminData(response.data.data);
      setError(null);
      setShowPermissions(false);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setError("Failed to fetch admin data. Please try again.");
      setAdminData(null);
    }
  };

  const handleLogout = () => {
    removeToken();
    setIsAuthenticated(false);
    navigate("/");
  };

  const goToMedicalClinic = () => {
    navigate("/medical-clinic");
  };

  const goToAdmins = () => {
    navigate("/add-admin");
  };

  const goToShowAdmins = () => {
    navigate("/showAllAdmins");
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

        {/* Logout Button */}
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
    <h1 className="text-2xl font-bold mb-6">Search Admin by ID</h1>
    <div className="mb-6">
      <input
        type="text"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        placeholder="Enter Admin ID"
        className="p-2 border border-gray-300 rounded-md bg-white bg-opacity-50 w-full mb-4"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300"
      >
        Search
      </button>
    </div>

    {error && (
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
        {error}
      </div>
    )}

    {adminData && (
      <div className="bg-white bg-opacity-40 p-6 rounded-lg shadow-md transition-all duration-300">
        <h2 className="text-xl font-bold mb-4">Admin Details</h2>
        <p>
          <strong>ID:</strong> {adminData.id}
        </p>
        <p>
          <strong>Username:</strong> {adminData.username}
        </p>
        <p>
          <strong>City:</strong> {adminData.city.name}
        </p>
        <p>
          <strong>Role:</strong> {adminData.role.name}
        </p>

        <h3 className="text-lg font-semibold mt-4">Details</h3>
        <p>
          <strong>Name:</strong> {adminData.details.name}
        </p>
        <p>
          <strong>Phone Number:</strong> {adminData.details.phone_number}
        </p>
        <p>
          <strong>Email:</strong> {adminData.details.email}
        </p>
        <p>
          <strong>Gender:</strong> {adminData.details.gender}
        </p>
        <p>
          <strong>Birth Date:</strong> {adminData.details.birth_date}
        </p>
        <p>
          <strong>Clinic ID:</strong> {adminData.details.clinic_id}
        </p>

        <h3 className="text-lg font-semibold mt-4">Permissions</h3>
        {adminData.permissions && adminData.permissions.length > 0 ? (
          <ul className="list-disc pl-5">
            {adminData.permissions.map((permission) => (
              <li key={permission.id}>
                <p>
                  <strong>Name (EN):</strong> {permission.name_en}
                </p>
                <p>
                  <strong>Name (AR):</strong> {permission.name_ar}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No permissions available.</p>
        )}

        <button
          onClick={() => setShowPermissions(!showPermissions)}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
        >
          Give Permission
        </button>

        {showPermissions && <Permissions actorId={adminData.id} />}
      </div>
    )}
  </div>
</main>
    </div>
  );
}

export default ShowAllAdmins;

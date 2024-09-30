import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {  getToken, removeToken } from "../services/auth"; 
import { FaClinicMedical, FaUserShield, FaUsers, FaSignOutAlt } from 'react-icons/fa'; 

function MedicalClinic({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    city_id: "",
    address_ar: "",
    address_en: "",
    url_name: "",
    color: "",
    logo: null, 
    requirements: ["", "", ""],
    contactInfos: ["", "", ""],
  });
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(''); 


  const handleLogout = () => {
    removeToken();
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

    // دالة التنقل لصفحة Medical Clinic
    const goToMedicalClinic = () => {
        navigate('/medical-clinic');
      };
    
      const goToAdmins = () => {
        navigate('/add-admin');
      };

      const goToShowAdmins = () => {
        navigate('/showAllAdmins');
      };
  const handleFileChange = (e) => {
    setFormData({ ...formData, logo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name_ar", formData.name_ar);
    formDataToSend.append("name_en", formData.name_en);
    formDataToSend.append("city_id", formData.city_id);
    formDataToSend.append("address_ar", formData.address_ar);
    formDataToSend.append("address_en", formData.address_en);
    formDataToSend.append("url_name", formData.url_name);
    formDataToSend.append("color", formData.color);
    formDataToSend.append("logo", formData.logo);
    formDataToSend.append("requirements[0]", formData.requirements[0]);
    formDataToSend.append("requirements[1]", formData.requirements[1]);
    formDataToSend.append("requirements[2]", formData.requirements[2]);
    formDataToSend.append("contactInfos[1][value]", formData.contactInfos[0]);
    formDataToSend.append("contactInfos[2][value]", formData.contactInfos[1]);
    formDataToSend.append("contactInfos[3][value]", formData.contactInfos[2]);

    try {
      const response = await axios.post(
        "https://medical-clinic.serv00.net/api/clinic",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getToken()}`, 
          },
        }
      );
      console.log("Clinic added successfully:", response.data);

      setSuccessMessage("Clinic added successfully!");
      setErrorMessage('');


      setFormData({
        name_ar: "",
        name_en: "",
        city_id: "",
        address_ar: "",
        address_en: "",
        url_name: "",
        color: "",
        logo: null,
        requirements: ["", "", ""],
        contactInfos: ["", "", ""],
      });

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error adding clinic:", error);
      setErrorMessage('Failed to add clinic. Please try again.');

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
      Add Medical Clinic
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
          <label className="block text-gray-700">Address (Arabic)</label>
          <input
            type="text"
            name="address_ar"
            value={formData.address_ar}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Address (English)</label>
          <input
            type="text"
            name="address_en"
            value={formData.address_en}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">URL Name</label>
          <input
            type="text"
            name="url_name"
            value={formData.url_name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Color</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Logo</label>
          <input
            type="file"
            name="logo"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Requirements</label>
          <input
            type="text"
            name="requirements[0]"
            value={formData.requirements[0]}
            onChange={(e) =>
              setFormData({
                ...formData,
                requirements: [
                  e.target.value,
                  formData.requirements[1],
                  formData.requirements[2],
                ],
              })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          />
          <input
            type="text"
            name="requirements[1]"
            value={formData.requirements[1]}
            onChange={(e) =>
              setFormData({
                ...formData,
                requirements: [
                  formData.requirements[0],
                  e.target.value,
                  formData.requirements[2],
                ],
              })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          />
          <input
            type="text"
            name="requirements[2]"
            value={formData.requirements[2]}
            onChange={(e) =>
              setFormData({
                ...formData,
                requirements: [
                  formData.requirements[0],
                  formData.requirements[1],
                  e.target.value,
                ],
              })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Contact Infos</label>
          <input
            type="text"
            name="contactInfos[1][value]"
            value={formData.contactInfos[0]}
            onChange={(e) =>
              setFormData({
                ...formData,
                contactInfos: [
                  e.target.value,
                  formData.contactInfos[1],
                  formData.contactInfos[2],
                ],
              })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          />
          <input
            type="text"
            name="contactInfos[2][value]"
            value={formData.contactInfos[1]}
            onChange={(e) =>
              setFormData({
                ...formData,
                contactInfos: [
                  formData.contactInfos[0],
                  e.target.value,
                  formData.contactInfos[2],
                ],
              })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
          />
          <input
            type="text"
            name="contactInfos[3][value]"
            value={formData.contactInfos[2]}
            onChange={(e) =>
              setFormData({
                ...formData,
                contactInfos: [
                  formData.contactInfos[0],
                  formData.contactInfos[1],
                  e.target.value,
                ],
              })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-50"
            required
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
          Add Clinic
        </button>
      </form>
    )}
  </div>
</main>
    </div>
  );
}

export default MedicalClinic;

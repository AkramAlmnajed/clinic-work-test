import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { removeToken, getToken } from '../services/auth'; 

function ShowAndUpdate({ setIsAuthenticated }) {
    const [clinicData, setClinicData] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        setIsAuthenticated(false);
        navigate('/');
    };

    const goToShowClinic = () => {
        navigate('/show-clinic');
    };

    useEffect(() => {
        const fetchClinicData = async () => {
            const token = getToken(); 
            try {
                const response = await axios.get('https://medical-clinic.serv00.net/api/clinic/98', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setClinicData(response.data.data); 
            } catch (err) {
                console.log('Error fetching clinic data');
            }
        };

        fetchClinicData();
    }, []);

    useEffect(() => {
        if (clinicData) {
            console.log(clinicData);
        }
    }, [clinicData]);

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
                    {clinicData ? (
                        <div className="p-6 bg-white shadow-lg rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">{clinicData.name}</h2>
                            <p><strong>Address:</strong> {clinicData.address || 'N/A'}</p>
                            <p><strong>City:</strong> {clinicData.city_id?.name || 'Unknown'}</p>
                            <p><strong>Phone:</strong> {clinicData.phone_number || 'N/A'}</p>
                            <p><strong>Telephone:</strong> {clinicData.telephone || 'N/A'}</p>
                            <p><strong>Color:</strong> <span style={{ color: clinicData.color }}>{clinicData.color || 'N/A'}</span></p>
                            <p><strong>Active Status:</strong> {clinicData.is_active ? 'Active' : 'Inactive'}</p>
                            <p><strong>Created By:</strong> {clinicData.created_by || 'N/A'}</p>
    
                            <p><strong>Contact Information:</strong> {clinicData.contact_information.length ? (
                                clinicData.contact_information.map((info, index) => (
                                    <span key={index}>
                                        {info.value}{index !== clinicData.contact_information.length - 1 ? ', ' : ''}
                                    </span>
                                ))
                            ) : 'No contact info'}</p>
    
                            <p><strong>Requirements:</strong> {clinicData.requirements.length ? (
                                clinicData.requirements.map((req, index) => (
                                    <span key={index}>
                                        {req.name}{index !== clinicData.requirements.length - 1 ? ', ' : ''}
                                    </span>
                                ))
                            ) : 'No requirements'}</p>
                        </div>
                    ) : (
                        <div>Fetching clinic data...</div>
                    )}
                </div>
            </main>
        </div>
    );
    
}

export default ShowAndUpdate;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { removeAdminTokenAndClinicId, getAdminToken, getAdminClinicId } from '../services/auth'; 

function ShowAndUpdate({ setIsAuthenticated }) {
    const [clinicData, setClinicData] = useState(null);
    const [updateResponse, setUpdateResponse] = useState('');
    const [isEditing, setIsEditing] = useState(false); 
    const [editedData, setEditedData] = useState({}); 
    const navigate = useNavigate();

    const handleLogout = () => {
        removeAdminTokenAndClinicId();
        setIsAuthenticated(false);
        navigate('/');
    };

    const goToShowClinic = () => {
        navigate('/show-clinic');
    };

    const handleSaveClinic = async () => {
        const token = getAdminToken();  
        const clinicId = getAdminClinicId();  

       
        const finalData = {
            ...editedData,
            city_id: editedData.city_id?.id || editedData.city_id, 
        };

        try {
            const response = await axios.put(
                `https://medical-clinic.serv00.net/api/clinic/${clinicId}`,
                finalData, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setUpdateResponse(JSON.stringify(response.data, null, 2)); 
            setIsEditing(false); 
        } catch (err) {
            setUpdateResponse('Error: Could not update clinic');
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchClinicData = async () => {
            const token = getAdminToken();  
            const clinicId = getAdminClinicId();  
            try {
                const response = await axios.get(`https://medical-clinic.serv00.net/api/clinic/${clinicId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setClinicData(response.data.data); 
                setEditedData(response.data.data); 
            } catch (err) {
                console.log('Error fetching clinic data');
            }
        };

        fetchClinicData();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true); 
    };

    const handleInputChange = (e) => {
        setEditedData({
            ...editedData,
            [e.target.name]: e.target.value,
        });
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
                    {clinicData ? (
                        <div className="p-6 bg-white shadow-lg rounded-lg">
                            {!isEditing ? (
                                <>
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

                                    <button
                                        onClick={handleEditClick}
                                        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300"
                                    >
                                        Edit Clinic
                                    </button>
                                </>
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        name="name_ar"
                                        value={editedData.name_ar || ''}
                                        onChange={handleInputChange}
                                        className="mb-2 p-2 border rounded"
                                        placeholder="name_arabic"
                                    />
                                    <input
                                        type="text"
                                        name="name_en"
                                        value={editedData.name_en || ''}
                                        onChange={handleInputChange}
                                        className="mb-2 p-2 border rounded"
                                        placeholder="name_english"
                                    />
                                    <input
                                        type="number"
                                        name="city_id"
                                        value={editedData.city_id?.id || editedData.city_id || ''}
                                        onChange={handleInputChange}
                                        className="mb-2 p-2 border rounded"
                                        placeholder="City id"
                                    />

                                    <button
                                        onClick={handleSaveClinic}
                                        className="mt-6 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all duration-300"
                                    >
                                        Save
                                    </button>
                                </>
                            )}

                            {updateResponse && (
                                <pre className="mt-4 bg-gray-100 p-4 rounded-lg text-left">{updateResponse}</pre>
                            )}
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

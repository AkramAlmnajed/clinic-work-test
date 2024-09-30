import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../services/auth"; // استيراد getToken

function Permissions({ actorId }) {
  const [permissions, setPermissions] = useState([
    { id: 5, name: "Create Clinic", value: 5, isChecked: false },
    { id: 6, name: "Update Clinic", value: 6, isChecked: false },
    { id: 7, name: "Delete Clinic", value: 7, isChecked: false },
    { id: 8, name: "Show Clinic", value: 8, isChecked: false },
  ]);

  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleCheckboxChange = (index) => {
    const newPermissions = [...permissions];
    newPermissions[index].isChecked = !newPermissions[index].isChecked;
    setPermissions(newPermissions);
  };

  const handleGivePermission = async () => {
    const selectedPermissions = permissions
      .filter((permission) => permission.isChecked)
      .map((permission) => permission.value);
  
    const token = getToken(); 
  
    try {
      await axios.post(
        `https://medical-clinic.serv00.net/api/actor_permissions/${actorId}`,
        {
          permissions: selectedPermissions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      setSuccessMessage("Permissions granted successfully!");
      setErrorMessage(""); 
    } catch (error) {
      console.error("Error giving permissions:", error);
      setErrorMessage("Failed to give permissions.");
      setSuccessMessage(""); 
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Assign Clinic Permission</h2>

      {successMessage && (
        <div className="bg-green-500 text-white px-4 py-2 mb-4 rounded-lg">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-500 text-white px-4 py-2 mb-4 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="mb-4">
        {permissions.map((permission, index) => (
          <div key={permission.id} className="mb-2">
            <label>
              <input
                type="checkbox"
                checked={permission.isChecked}
                onChange={() => handleCheckboxChange(index)}
              />
              <span className="ml-2">{permission.name}</span>
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={handleGivePermission}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Give Permission
      </button>
    </div>
  );
}

export default Permissions;

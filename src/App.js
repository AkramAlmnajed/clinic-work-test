    import React, { useEffect, useState } from 'react';
    import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
    import Login from './components/Login';
    import Dashboard from './Pages/Dashboard';
    import AdminDashboard from './Pages/adminDashboard';
    import MedicalClinic from './Pages/medicalClinic';
    import Admins from './Pages/addAdmins';
    import ShowAllAdmins from './Pages/ShowAllAdmins'; 
    import ShowAndUpdate from './Pages/showandUpdate'; 
    import { getToken } from './services/auth';

    function App() {
      const [isAuthenticated, setIsAuthenticated] = useState(false);

      useEffect(() => {
        const token = getToken();
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }, []);

      return (
        <Router>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
            <Route path="/adminDashboard" element={isAuthenticated ? <AdminDashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
            <Route path="/medical-clinic" element={isAuthenticated ? <MedicalClinic setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
            <Route path="/add-admin" element={isAuthenticated ? <Admins setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
            <Route path="/show-clinic" element={isAuthenticated ? <ShowAndUpdate setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
            <Route path="/showAllAdmins" element={isAuthenticated ? <ShowAllAdmins setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
          </Routes>
        </Router>
      );
    }

    export default App;

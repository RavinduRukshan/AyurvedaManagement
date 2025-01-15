import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './page/mainPage';
import SigninPage from './page/signinPage';
import AdminDashboard from './page/admin/adminDashboardPage';
import PatientsPage from './page/admin/PatientPage';
import PatientViewPage from './page/admin/PatientViewPage';
import UsersPage from './page/admin/UsersPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={< MainPage/>} />
        <Route path="/login" element={<SigninPage/>} />

        {/* Admin-Side Routes */}
        <Route path="/admin-Dashboard" element={<AdminDashboard/>} />
        <Route path="/patient-page" element={<PatientsPage/>} />
        <Route path="/patientView-page" element={<PatientViewPage/>} />
        <Route path="/users-page" element={<UsersPage/>} />


      </Routes>
    </Router>
  );
}

export default App;

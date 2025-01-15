import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './page/mainPage';
import SigninPage from './page/signinPage';
import AdminDashboard from './page/admin/adminDashboardPage';
import PatientsPage from './page/admin/PatientPage';
import PatientViewPage from './page/admin/PatientViewPage';
function App() {
  return (
    <Router>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={< MainPage/>} />
        <Route path="/login" element={<SigninPage/>} />

        {/* Admin-Side Routes */}
        <Route path="/admin-Dashboard" element={<AdminDashboard/>} />
        <Route path="/Patient-page" element={<PatientsPage/>} />
        <Route path="/PatientView-page" element={<PatientViewPage/>} />


      </Routes>
    </Router>
  );
}

export default App;

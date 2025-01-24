import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './page/mainPage';
import SigninPage from './page/signinPage';
import AdminDashboard from './page/admin/adminDashboardPage';
import PatientsPage from './page/admin/PatientPage';
import PatientViewPage from './page/admin/PatientViewPage';
import UsersPage from './page/admin/UsersPage';
import Staffpage from './page/admin/Staffpage';


function App() {
  return (
    <Router>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={< MainPage/>} />
        <Route path="/login" element={<SigninPage/>} />

        {/* Admin-Side Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/patient-page" element={<PatientsPage/>} />
        <Route path="/patient-view-page/:id" element={<PatientViewPage />} />
        <Route path="/users-page" element={<UsersPage/>} />
        <Route path="/staff-page" element={<Staffpage/>} />
        


      </Routes>
    </Router>
  );
}

export default App;

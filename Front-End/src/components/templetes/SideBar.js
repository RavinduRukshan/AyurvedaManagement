import React from 'react';
import '../../css/Sidebar.css';
import Patients from '../../assets/Patients.png';
import Dashboard from '../../assets/Dashboard.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><a href="admin-Dashboard"><img src={Dashboard} alt="Dashboard" style={{ width: '25px', marginRight: '10px' }} /><span>Dashboard</span></a></li>
        <li><a href="Patient-page"><img src={Patients} alt="Patients" style={{ width: '25px', marginRight: '10px' }} /><span>Patients</span></a></li>
        <li><a href="users-page"><img src={Patients} alt="Users" style={{ width: '25px', marginRight: '10px' }} /><span>Users</span></a></li>
      </ul>
    </div>
  );
};

export default Sidebar;

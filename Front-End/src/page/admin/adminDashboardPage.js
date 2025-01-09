import React, { useState } from 'react';
import Navbar from '../../components/templetes/Navbar';
import Sidebar from '../../components/templetes/SideBar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../css/admin/AdminDashboard.css';

function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Mock data for the table
  const tableData = [
    { no: 1, name: 'RK', disease: 'Diabetes', time: 'January 15, 2025', source: '$50.00' },
    { no: 2, name: 'RR', disease: 'Diabetes', time: 'January 15, 2025', source: '$60.00' },
    { no: 3, name: 'RR', disease: 'Diabetes', time: 'January 15, 2025', source: '$60.00' },
    { no: 4, name: 'RR', disease: 'Diabetes', time: 'January 15, 2025', source: '$60.00' },
    { no: 5, name: 'RR', disease: 'Diabetes', time: 'January 15, 2025', source: '$60.00' },
    { no: 6, name: 'RR', disease: 'Diabetes', time: 'January 15, 2025', source: '$60.00' },
  ];

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="flex-grow-1 d-flex">
        <Sidebar />
        <main className="content-container p-4">
          <div className="dashboard-header">
            <div className="stats-card">
              <div className="stats-icon">
                <i className="fas fa-users"></i> {/* Icon for "Today Patients" */}
              </div>
              <div className="stats-data">
                <div>
                  <h4>Today Patients</h4>
                  <p>50</p>
                </div>
              </div>
            </div>
            <div className="stats-card">
              <div className="stats-icon">
                <i className="fas fa-money-bill-alt"></i> {/* Icon for "Today Payments" */}
              </div>
              <div className="stats-data">
                <div>
                  <h4>Today Payments</h4>
                  <p>2000</p>
                </div>
              </div>
            </div>
            <div className="search-container">
              <input type="text" placeholder="Search" />
              <button className="search-btn">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          <button className="add-patient-btn" onClick={toggleModal}>
            + Add New Patient
          </button>

          <div className="table-container mt-4">
            <h5>Daily Patients: 07/01/2025</h5>
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Disease</th>
                  <th>Time</th>
                  <th>Medicine Source</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.no}>
                    <td>{row.no}</td>
                    <td>{row.name}</td>
                    <td>{row.disease}</td>
                    <td>{row.time}</td>
                    <td>{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* New Patient Form Section */}
          <div className="patient-form-container">
            <form className="patient-form">
              <div className="form-group">
                <label>Patient ID</label>
                <input type="text" placeholder="Enter Patient ID" />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Enter Name" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" placeholder="Enter Phone Number" />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input type="number" placeholder="Enter Age" />
              </div>
              <div className="form-group">
                <label>Disease</label>
                <input type="text" placeholder="Enter Disease" />
              </div>
              <div className="form-group">
                <label>Medicine</label>
                <input type="text" placeholder="Enter Medicine" />
              </div>
              <div className="form-group">
                <label>Therapy</label>
                <input type="text" placeholder="Enter Therapy" />
              </div>
              <div className="form-group">
                <label>Amount</label>
                <input type="text" placeholder="Enter Amount" />
              </div>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>

          {/* Modal for Patient Registration */}
          {showModal && (
            <div className="modal-overlay" onClick={toggleModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Patient Registration</h2>
                <form className="patient-form">
                  <div className="form-group">
                    <label>Patient ID</label>
                    <input type="text" placeholder="Enter Patient ID" />
                  </div>
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Enter Name" />
                  </div>
                  <div className="form-group">
                    <label>Age</label>
                    <input type="text" placeholder="Enter Age" />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <input type="number" placeholder="Enter Gender" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" placeholder="Enter Phone Number" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="text" placeholder="Enter Email" />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Enter Address" />
                  </div>
                  <div className="form-group">
                    <label>Registration Date</label>
                    <input type="date" className="form-control" />
                  </div>
                  <button type="submit" className="submit-btn">Submit</button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;

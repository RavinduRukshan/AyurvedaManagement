import React, { useState } from "react";
import Navbar from "../../components/templetes/Navbar"; 
import Sidebar from "../../components/templetes/SideBar"; 
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../css/admin/AdminDashboard.css"; 

const DashboardPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Open the popup
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="content">
        <div className="top-section">
          <div className="summary-cards">
            <div className="card">
              <i className="fas fa-users card-icon"></i>
              <div>
                <h3>Today Patients</h3>
                <p>50</p>
              </div>
            </div>
            <div className="card">
              <i className="fas fa-dollar-sign card-icon"></i>
              <div>
                <h3>Today Payments</h3>
                <p>2000</p>
              </div>
            </div>
          </div>
          <div className="actions-container">
            <div className="search-container">
              <input type="text" placeholder="Search" className="search-bar" />
              <i className="fas fa-search search-icon"></i>
            </div>
            <button className="add-patient-btn" onClick={openPopup}>
              <i className="fas fa-user-plus"></i> Add New Patient
            </button>
          </div>
        </div>
        <div className="main-content">
          <Sidebar />
          <div className="dashboard-content">
            <div className="layout-container">
              {/* Right Side: Form */}
              <div className="form-container">
                <form>
                  <input type="text" placeholder="Patient ID" />
                  <input type="text" placeholder="Name" />
                  <input type="number" placeholder="Phone Number" />
                  <input type="number" placeholder="Age" />
                  <input type="text" placeholder="Disease" />
                  <input type="text" placeholder="Medicine" />
                  <input type="text" placeholder="Therapy" />
                  <input type="number" placeholder="Amount" />
                  <div className="form-buttons">
                    <button type="submit" className="submit-btn">
                      Submit
                    </button>
                  </div>
                </form>
              </div>

              {/* Left Side: Patients Table */}
              <div className="patients-table">
                <h4>Daily Patients: 07/01/2025</h4>
                <table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Disease</th>
                      <th>Time</th>
                      <th>Medicine Amounts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(14)].map((_, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>Name {i + 1}</td>
                        <td>Diabetes</td>
                        <td>January 15, 2025</td>
                        <td>Paracetamol - ${5 + i}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Popup */}
              {isPopupOpen && (
                <div className="popup-overlay" onClick={closePopup}>
                  <div
                    className="popup-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3>Patient Registration</h3>
                    <form className="popup-form">
                      <div className="form-group">
                        <input type="number" placeholder=" Patient ID" />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder=" Name" />
                      </div>
                      <div className="form-group">
                        <input type="number" placeholder="Age" />
                      </div>
                      <div className="form-group">
                        <select defaultValue="">
                          <option value="" disabled>
                            Gender
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="others">Others</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input type="number" placeholder="Phone Number" />
                      </div>
                      <div className="form-group">
                        <input type="email" placeholder="Enter Email" />
                      </div>
                      <div className="form-group">
                        <textarea placeholder="Address"></textarea>
                      </div>
                      <div className="form-group">
                        <input type="date" />
                      </div>
                      <button type="submit" className="register-btn">
                        Register
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

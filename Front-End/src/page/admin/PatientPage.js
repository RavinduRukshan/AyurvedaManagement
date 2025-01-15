import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import Navbar from "../../components/templetes/Navbar"; 
import Sidebar from "../../components/templetes/SideBar"; 
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../css/admin/PatientsPage.css"; 

const PatientsPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className="patients-page-container">
      <Navbar />
      <div className="patients-content">
      <div className="breadcrumbs">
            <span>Home</span> / <span>Patients</span>
          </div>
        <div className="patients-top-section">
          <div className="patients-actions-container">
            <div className="patients-search-container">
              <input
                type="text"
                placeholder="Search for patients"
                className="patients-search-bar"
              />
              <i className="fas fa-search patients-search-icon"></i>
            </div>
            <button className="patients-add-btn" onClick={openPopup}>
              <i className="fas fa-user-plus"></i> Add New Patient
            </button>
          </div>
        </div>

        <div className="patients-main-content">
          <Sidebar />
          <div className="patients-table-container">
            <h4>Patients List</h4>
            <table className="patients-table">
              <thead>
                <tr>
                  <th>Patient Id</th>
                  <th>Patient Name</th>
                  <th>Patient Address</th>
                  <th>Register Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td> {/* Patient Id */}
                    <td>Patient {i + 1}</td> {/* Patient Name */}
                    <td>Address {i + 1}</td> {/* Patient Address */}
                    <td>{`2025-01-${String(i + 1).padStart(2, "0")}`}</td>{" "}
                    {/* Register Date */}
                    <td>
                      {/* View Button as Link */}
                      <Link
                        to={`/PatientView-page`}
                        className="btn-action btn-view"
                      >
                        View
                      </Link>
                      <button className="btn-action btn-update">Update</button>
                      <button className="btn-action btn-delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="patients-popup-overlay" onClick={closePopup}>
          <div
            className="patients-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Patient Registration </h3>
            <form className="patients-popup-form">
              <input type="number" placeholder="Patient ID" />
              <input type="text" placeholder="Name" />
              <input type="number" placeholder="Age" />
              <select defaultValue="">
                <option value="" disabled>
                  Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
              <input type="number" placeholder="Phone Number" />
              <input type="email" placeholder="Enter Email" />
              <textarea placeholder="Address"></textarea>
              <input type="date" placeholder="Register Date" />
              <button type="submit" className="patients-register-btn">
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsPage;

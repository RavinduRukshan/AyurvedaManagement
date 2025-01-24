import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/templetes/Navbar";
import Sidebar from "../../components/templetes/SideBar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../css/admin/PatientsPage.css";
import axios from "axios";

const PatientsPage = () => {
  const [patients, setPatients] = useState([]); // State to store patients data
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [patientForm, setPatientForm] = useState({
    id: '',
    name: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    address: '',
    medicalHistory: '',
    registrationDate: '',
    notes: ''
  });
  const [error, setError] = useState(null); // To handle any error from backend

  // For Delete Confirmation Dialog
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  // Fetch patients from the backend
  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:8080/patient/list");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // UseEffect to fetch data on component load
  useEffect(() => {
    fetchPatients();
  }, []);

  // Handle patient form change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle patient form submission (Create/Update)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (
      !patientForm.name ||
      !patientForm.age ||
      !patientForm.contactNumber ||
      !patientForm.email ||
      !patientForm.gender ||
      !patientForm.address ||
      !patientForm.registrationDate
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      let response;
      if (patientForm.id) {
        // Updating an existing patient (PUT request)
        response = await axios.put(`http://localhost:8080/patient/update/${patientForm.id}`, patientForm, {
          headers: {
            "Content-Type": "application/json"
          }
        });
      } else {
        // Creating a new patient (POST request)
        response = await axios.post("http://localhost:8080/patient/save", patientForm, {
          headers: {
            "Content-Type": "application/json"
          }
        });
      }

      console.log(patientForm.id ? "Patient updated:" : "Patient saved:", response.data);
      setIsCreatePopupOpen(false); // Close the popup
      setIsUpdatePopupOpen(false); // Close the update popup
      fetchPatients(); // Refresh patient list
      setError(null); // Reset error on successful form submission
      setPatientForm({
        id: '',
        name: '',
        age: '',
        gender: '',
        contactNumber: '',
        email: '',
        address: '',
        medicalHistory: '',
        registrationDate: '',
        notes: ''
      }); // Reset the form fields
    } catch (error) {
      console.error(patientForm.id ? "Error updating patient:" : "Error saving patient:", error);
      setError("Failed to save patient. Please try again.");
    }
  };

  // Open the Create popup
  const openCreatePopup = () => {
    setIsCreatePopupOpen(true);
    setPatientForm({
      id: '',
      name: '',
      age: '',
      gender: '',
      contactNumber: '',
      email: '',
      address: '',
      medicalHistory: '',
      registrationDate: '',
      notes: ''
    });
  };

  // Open the Update popup and pre-fill the form
  const openUpdatePopup = (patient) => {
    setIsUpdatePopupOpen(true);
    setPatientForm(patient);
  };

  // Close both popups
  const closePopup = () => {
    setIsCreatePopupOpen(false);
    setIsUpdatePopupOpen(false);
  };

  // Open the delete confirmation popup
  const openDeleteConfirmation = (patientId) => {
    setPatientToDelete(patientId);
    setIsDeleteConfirmationOpen(true);
  };

  // Handle delete confirmation
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/patient/delete/${patientToDelete}`);
      console.log('Patient deleted:', response.data);

      // Refresh the patient list after deleting
      fetchPatients();
      setIsDeleteConfirmationOpen(false); // Close the confirmation popup
    } catch (error) {
      console.error("Error deleting patient:", error);
      setError("Failed to delete patient. Please try again.");
      setIsDeleteConfirmationOpen(false); // Close the confirmation popup
    }
  };

  // Cancel the delete action
  const cancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  return (
    <div className="patients-page-container">
      <Navbar />
      <div className="patients-content">
        {/* <div className="breadcrumbs">
          <span>Home</span> / <span>Patients</span>
        </div> */}
        
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
            <button className="patients-add-btn" onClick={openCreatePopup}>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.id}</td>
                    <td>{patient.name}</td>
                    <td>{patient.address}</td>
                    <td>
                      <Link
                        to={`/patient-view-page/${patient.id}`}
                        className="btn-action btn-view"
                      >
                        View
                      </Link>
                      <button className="btn-action btn-update" onClick={() => openUpdatePopup(patient)}>
                        Update
                      </button>
                      <button className="btn-action btn-delete" onClick={() => openDeleteConfirmation(patient.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    
      {/* Delete confirmation popup */}
      {isDeleteConfirmationOpen && (
        <div className="patients-popup-overlay-delete" >
          <div className="patients-popup-content-delete" onClick={(e) => e.stopPropagation()}>
            <h3 className="delete-text">Are you sure you want to delete this?</h3>
            <div className="confirmation-buttons">
              <button  className="btn-action btn-view" onClick={handleDelete}>Yes, Delete</button>
              <button  className="btn-action btn-delete" onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Patient Popup */}
      {isCreatePopupOpen && (
        <div className="patients-popup-overlay" >
          <div className="patients-popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Patient Registration</h3>
            {error && <div className="error-message">{error}</div>}

            <form className="patients-popup-form" onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                value={patientForm.name}
                onChange={handleInputChange}
                placeholder="Patient Name"
                required
              />
              <input
                type="number"
                name="age"
                value={patientForm.age}
                onChange={handleInputChange}
                placeholder="Age"
                required
              />
              <select
                name="gender"
                value={patientForm.gender}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                name="contactNumber"
                value={patientForm.contactNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                required
              />
              <input
                type="email"
                name="email"
                value={patientForm.email}
                onChange={handleInputChange}
                placeholder="Enter Email"
                required
              />
              <textarea
                name="address"
                value={patientForm.address}
                onChange={handleInputChange}
                placeholder="Address"
                required
              ></textarea>
              <textarea
                name="medicalHistory"
                value={patientForm.medicalHistory}
                onChange={handleInputChange}
                placeholder="Medical History"
              ></textarea>
              <input
                type="date"
                name="registrationDate"
                value={patientForm.registrationDate}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="notes"
                value={patientForm.notes}
                onChange={handleInputChange}
                placeholder="Notes"
              ></textarea>
              <button type="submit" className="patients-register-btn">
                Register
              </button>
              <button type="submit" onClick={closePopup} className="patient-close-btn">
                Close
              </button>
              
            </form>
          </div>
        </div>
      )}

      {/* Update Patient Popup */}
      {isUpdatePopupOpen && (
        <div className="patients-popup-overlay" >
          <div className="patients-popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Update Patient</h3>
            {error && <div className="error-message">{error}</div>}

            <form className="patients-popup-form" onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                value={patientForm.name}
                onChange={handleInputChange}
                placeholder="Patient Name"
                required
              />
              <input
                type="number"
                name="age"
                value={patientForm.age}
                onChange={handleInputChange}
                placeholder="Age"
                required
              />
              <select
                name="gender"
                value={patientForm.gender}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                name="contactNumber"
                value={patientForm.contactNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                required
              />
              <input
                type="email"
                name="email"
                value={patientForm.email}
                onChange={handleInputChange}
                placeholder="Enter Email"
                required
              />
              <textarea
                name="address"
                value={patientForm.address}
                onChange={handleInputChange}
                placeholder="Address"
                required
              ></textarea>
              <textarea
                name="medicalHistory"
                value={patientForm.medicalHistory}
                onChange={handleInputChange}
                placeholder="Medical History"
              ></textarea>
              <input
                type="date"
                name="registrationDate"
                value={patientForm.registrationDate}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="notes"
                value={patientForm.notes}
                onChange={handleInputChange}
                placeholder="Notes"
              ></textarea>
              <button type="submit" className="patients-register-btn">
                Update
              </button>
              <button type="submit" onClick={closePopup} className="patient-close-btn">
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsPage;

import React, { useState, useEffect } from "react";
import Navbar from "../../components/templetes/Navbar";
import Sidebar from "../../components/templetes/SideBar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../css/admin/AdminDashboard.css";
import axios from "axios";

const DashboardPage = () => {

  const [records, setRecords] = useState([]);
  const [staff, setStaff] = useState([]);
  const [form, setForm] = useState({
    id: "",
    patient: { id: "", name: "", age: "" },
    treatmentDate: "",
    treatmentTime: "",
    sicknessDescription: "",
    medicinePrescribed: "",
    therapyGiven: "",
    treatmentAmount: "",
    staff: { id: "", name: "" },
  });




  
  const [patients, setPatients] = useState([]); // State to store patients data
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

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




  // UseEffect to fetch data on component load
  useEffect(() => {
    fetchPatients();
  }, []);

  // Handle patient form change
  const handleInputChangeP = (e) => {
    const { name, value } = e.target;
    setPatientForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle patient form submission (Create/Update)
  const handleFormSubmitP = async (e) => {
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

  // Close both popups
  const closePopup = () => {
    setIsCreatePopupOpen(false);
    
  };













  



  // Calculate total patients and total amount
const totalPatients = patients.length;
const totalAmount = records.reduce((sum, record) => sum + parseFloat(record.treatmentAmount || 0), 0).toFixed(2); // Total amount



  const [error, setError] = useState(null);
  const [staffOptions, setStaffOptions] = useState([]);
  const [patientOptions, setPatientOptions] = useState([]);

  // Fetch treatment records
  const fetchRecords = async () => {
    try {
      const response = await axios.get("http://localhost:8080/treatment/list");
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  // Fetch patients
  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:8080/patient/list");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Fetch staff members
  const fetchStaff = async () => {
    try {
      const response = await axios.get("http://localhost:8080/staff/list");
      setStaff(response.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchStaff();
    fetchRecords();
  }, []);

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "staff") {
      setForm((prevState) => ({
        ...prevState,
        staff: { id: value, name: value },
      }));
    } else if (name === "patient") {
      setForm((prevState) => ({
        ...prevState,
        patient: { id: value, name: value, age: prevState.patient.age }, // Preserve age
      }));
    } else {
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Unified search function for patient by name or contact number
  const searchPatient = async (query) => {
    if (!query.trim()) {
      setPatientOptions([]);
      return;
    }

    const isPhoneNumber = /^\d+$/.test(query); // Check if the query is a phone number

    try {
      let response;
      if (isPhoneNumber) {
        // Search by contact number
        response = await axios.post("http://localhost:8080/treatment/patient/contact-search", { query });
      } else {
        // Search by name
        response = await axios.post("http://localhost:8080/treatment/patient/name-search", { query });
      }

      setPatientOptions(response.data);
    } catch (error) {
      console.error("Error while searching for patient:", error);
    }
  };

  // Search staff by name
  const searchStaff = async (query) => {
    if (!query.trim()) {
      setStaffOptions([]);
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/user/staff/search", { query });
      setStaffOptions(response.data);
    } catch (error) {
      console.error("Error while searching for staff:", error);
    }
  };

  // Handle form submit for saving or updating treatment records
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (form.id) {
        // Update existing treatment record
        response = await axios.put(
          `http://localhost:8080/treatment/update/${form.id}`,
          form,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("Treatment updated:", response.data);
      } else {
        // Create new treatment record
        response = await axios.post("http://localhost:8080/treatment/save", form, {
          headers: { "Content-Type": "application/json" },
        });
        console.log("Treatment saved:", response.data);
      }

      // Fetch updated data
      fetchPatients();
      fetchStaff();
      fetchRecords();

      // Clear form and error
      setError(null);
      setForm({
        id: "",
        patient: { id: "", name: "", age: "" },
        treatmentDate: "",
        treatmentTime: "",
        sicknessDescription: "",
        medicinePrescribed: "",
        therapyGiven: "",
        treatmentAmount: "",
        staff: { id: "", name: "" },
      });
    } catch (error) {
      console.error(form.id ? "Error updating record:" : "Error saving record:", error);
      setError("Failed to save record.");
    }
  };

  // Handle staff selection from dropdown
  const handleStaffSelect = (staff) => {
    setForm((prevState) => ({
      ...prevState,
      staff: { id: staff.id, name: staff.name },
    }));
    setStaffOptions([]);
  };

  // Handle patient selection from dropdown
  const handlePatientSelect = (patient) => {
    setForm((prevState) => ({
      ...prevState,
      patient: { id: patient.id, name: patient.name, age: patient.age }, // Ensure age is included
    }));
    setPatientOptions([]);
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
                <span>Today Patients</span>
                <p>{totalPatients}</p>
              </div>
            </div>
            <div className="card">
              <i className="fas fa-dollar-sign card-icon"></i>
              <div>
                <span>Today Payments</span>
                <p>{totalAmount}</p>
              </div>
            </div>
          </div>
          <div className="actions-container">
            <div className="search-container">
              <input type="text" placeholder="Search" className="search-bar" />
              <i className="fas fa-search search-icon"></i>
            </div>

            <button className="patients-add-btn" onClick={openCreatePopup}>
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
              <h3>Add New Treatment</h3>
                <form onSubmit={handleFormSubmit}>
                  {/* Patient search */}
                  <div className="staff-selector-container">
                    <input
                      type="text"
                      name="patient"
                      value={form.patient.name}
                      onChange={(e) => {
                        handleInputChange(e);
                        searchPatient(e.target.value); // Search patient by name or contact
                      }}
                      placeholder="Patient Name or Contact Number"
                      required
                    />
                    {patientOptions && patientOptions.length > 0 && (
                      <ul className="staff-options">
                        {patientOptions.map((patient) => (
                          <li key={patient.id} onClick={() => handlePatientSelect(patient)}>
                            {patient.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  

                  {/* <input
                    type="text"
                    name="name"
                    value={`Patient Name: ${form.patient.name}`}
                    onChange={handleInputChange}
                    placeholder="Patient Name"
                    required
                    readOnly
                  />
                  <input
                    type="text"
                    name="age"
                    value={`Patient Age: ${form.patient.age}`}
                    onChange={handleInputChange}
                    placeholder="Patient Age"
                    required
                    readOnly
                  /> */}

                  <div className="patient-info-container">
                    <label>Patient Name : </label>
                    <span> {form.patient.name}</span>
                  </div>

                  <div className="patient-info-container">
                    <label>Patient Age : </label>
                    <span> {form.patient.age}</span>
                  </div>

                  {/* Staff search */}
                  <div className="staff-selector-container">
                    <input
                      type="text"
                      name="staff"
                      value={form.staff.name}
                      onChange={(e) => {
                        handleInputChange(e);
                        searchStaff(e.target.value); // Search staff by name
                      }}
                      placeholder="Staff Name"
                      required
                    />
                    {staffOptions && staffOptions.length > 0 && (
                      <ul className="staff-options">
                        {staffOptions.map((staff) => (
                          <li key={staff.id} onClick={() => handleStaffSelect(staff)}>
                            {staff.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Other form fields */}
                  <input
                    type="date"
                    name="treatmentDate"
                    value={form.treatmentDate}
                    onChange={handleInputChange}
                    placeholder="Treatment Date"
                    required
                  />
                  
                  <input
                    type="text"
                    name="sicknessDescription"
                    value={form.sicknessDescription}
                    onChange={handleInputChange}
                    placeholder="Sickness Description"
                    required
                  />
                  <input
                    type="text"
                    name="medicinePrescribed"
                    value={form.medicinePrescribed}
                    onChange={handleInputChange}
                    placeholder="Medicine Prescribed"
                    required
                  />
                  <input
                    type="text"
                    name="therapyGiven"
                    value={form.therapyGiven}
                    onChange={handleInputChange}
                    placeholder="Therapy Given"
                    required
                  />
                  <input
                    type="number"
                    name="treatmentAmount"
                    value={form.treatmentAmount}
                    onChange={handleInputChange}
                    placeholder="Treatment Amount"
                    required
                  />

                  <button type="submit" className="submit-btn">
                    Submit
                  </button>
                </form>
              </div>

              {/* Left Side: Treatment record Table */}
              <div className="patients-table">
                <h4>Daily Patients: 07/01/2025</h4>
                <table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      
                      <th>Disease</th>
                      <th>Treatment</th>
                      {/* <th>Time</th> */}
                      <th>Amounts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record,index) => (
                      <tr key={record.id}>
                        <td>{index + 1}</td> {/* Display row number */}
                        <td>{record.patient.name}</td>
                        
                        <td>{record.sicknessDescription}</td>
                        <td>{record.medicinePrescribed ? ` Medicine : ${record.medicinePrescribed}` : ''}{record.therapyGiven ? ` Therapy : ${record.therapyGiven}` : ''}</td>
                        {/* <td>{record.treatmentTime}</td> */}
                        
                        <td>{record.treatmentAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isCreatePopupOpen && (
        <div className="patients-popup-overlay" >
          <div className="patients-popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Patient Registration</h3>
            {error && <div className="error-message">{error}</div>}

            <form className="patients-popup-form" onSubmit={handleFormSubmitP}>
              <input
                type="text"
                name="name"
                value={patientForm.name}
                onChange={handleInputChangeP}
                placeholder="Patient Name"
                required
              />
              <input
                type="number"
                name="age"
                value={patientForm.age}
                onChange={handleInputChangeP}
                placeholder="Age"
                required
              />
              <select
                name="gender"
                value={patientForm.gender}
                onChange={handleInputChangeP}
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
                onChange={handleInputChangeP}
                placeholder="Phone Number"
                required
              />
              <input
                type="email"
                name="email"
                value={patientForm.email}
                onChange={handleInputChangeP}
                placeholder="Enter Email"
                required
              />
              <textarea
                name="address"
                value={patientForm.address}
                onChange={handleInputChangeP}
                placeholder="Address"
                required
              ></textarea>
              <textarea
                name="medicalHistory"
                value={patientForm.medicalHistory}
                onChange={handleInputChangeP}
                placeholder="Medical History"
                required
              ></textarea>
              <input
                type="date"
                name="registrationDate"
                value={patientForm.registrationDate}
                onChange={handleInputChangeP}
                required
              />
              <textarea
                name="notes"
                value={patientForm.notes}
                onChange={handleInputChangeP}
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
    </div>
  );
};

export default DashboardPage;

import React, { useState, useEffect } from "react";
import Navbar from "../../components/templetes/Navbar";
import Sidebar from "../../components/templetes/SideBar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../css/admin/AdminDashboard.css";
import axios from "axios";

const DashboardPage = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formData, setFormData] = useState({
    sicknessDescription: "",
    medicinePrescribed: "",
    therapyGiven: "",
    treatmentDate: "",
    treatmentTime: "",
    progressNotes: "",
    treatmentAmount: "",
  });
  const [submittedData, setSubmittedData] = useState([]);

  // Fetch patients and treatment records
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:8080/patient/list");
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    const fetchSubmittedData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/treatment-records/");
        setSubmittedData(response.data);
      } catch (error) {
        console.error("Error fetching treatment records:", error);
      }
    };

    fetchPatients();
    fetchSubmittedData();
  }, []);

  // Filter patients by search term
  useEffect(() => {
    if (searchTerm) {
      const results = patients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.contactNumber.includes(searchTerm)
      );
      setFilteredPatients(results);
    } else {
      setFilteredPatients([]);
    }
  }, [searchTerm, patients]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPatient) {
      alert("Please select a patient from the list.");
      return;
    }

    const recordToSubmit = {
      ...formData,
      patientId: selectedPatient.id,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/treatment-records/add",
        recordToSubmit
      );
      // Update the table with the newly created record
      setSubmittedData((prevData) => [...prevData, response.data]);

      // Reset the form
      setFormData({
        sicknessDescription: "",
        medicinePrescribed: "",
        therapyGiven: "",
        treatmentDate: "",
        treatmentTime: "",
        progressNotes: "",
        treatmentAmount: "",
      });
      setSearchTerm("");
      setSelectedPatient(null);
    } catch (error) {
      console.error("Error submitting treatment record:", error);
    }
  };

  // Handle dropdown selection
  const handleDropdownClick = (patient) => {
    setSelectedPatient(patient);
    setSearchTerm(`${patient.name} (${patient.contactNumber})`);
    setFilteredPatients([]);
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="content">
        <Sidebar />
        <div className="dashboard-content">
          <div className="layout-container">
            <div className="form-container">
              <form onSubmit={handleFormSubmit}>
                <h4 className="text-center mb-4">Treatment Record Form</h4>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Start typing Patient Name or Contact Number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {filteredPatients.length > 0 && (
                  <ul className="dropdown-list">
                    {filteredPatients.map((patient) => (
                      <li
                        key={patient.id}
                        onClick={() => handleDropdownClick(patient)}
                        className="dropdown-item"
                      >
                        {patient.name} ({patient.contactNumber})
                      </li>
                    ))}
                  </ul>
                )}
                <input
                  type="text"
                  name="sicknessDescription"
                  placeholder="Sickness Description"
                  value={formData.sicknessDescription}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="medicinePrescribed"
                  placeholder="Medicine Prescribed"
                  value={formData.medicinePrescribed}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="therapyGiven"
                  placeholder="Therapy Given"
                  value={formData.therapyGiven}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="date"
                  name="treatmentDate"
                  value={formData.treatmentDate}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="time"
                  name="treatmentTime"
                  value={formData.treatmentTime}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="progressNotes"
                  placeholder="Progress Notes"
                  value={formData.progressNotes}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  name="treatmentAmount"
                  placeholder="Treatment Amount"
                  value={formData.treatmentAmount}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="patients-table">
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Sickness Description</th>
                    <th>Time</th>
                    <th>Medicine Prescribed</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedData.map((record, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{record.patient?.name || "Unknown"}</td>
                      <td>{record.sicknessDescription}</td>
                      <td>{record.treatmentTime}</td>
                      <td>{record.medicinePrescribed}</td>
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
  );
};

export default DashboardPage;

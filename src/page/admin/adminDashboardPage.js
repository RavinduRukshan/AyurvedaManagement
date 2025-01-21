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
  const [selectedPatient, setSelectedPatient] = useState(null); // Store the selected patient object
  const [treatmentRecords, setTreatmentRecords] = useState([]);
  const [formData, setFormData] = useState({
    sicknessDescription: "",
    medicinePrescribed: "",
    therapyGiven: "",
    treatmentDate: "",
    treatmentTime: "",
    progressNotes: "",
    treatmentAmount: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editRecordId, setEditRecordId] = useState(null);

  useEffect(() => {
    fetchTreatmentRecords();
  }, []);

  const fetchTreatmentRecords = async () => {
    try {
      const response = await axios.get("http://localhost:8080/treatmentRecord/list");
      setTreatmentRecords(response.data);
    } catch (error) {
      console.error("Error fetching treatment records:", error);
    }
  };

  const searchPatients = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/patient/searchPatient?query=${query}`
      );
      setPatients(response.data);
    } catch (error) {
      console.error("Error searching patients:", error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
      searchPatients(query);
    } else {
      setPatients([]);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient) {
      alert("Please select a patient.");
      return;
    }
    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:8080/treatmentRecord/update/${editRecordId}`,
          { ...formData, patientId: selectedPatient.id }
        );
        alert("Treatment record updated successfully.");
      } else {
        await axios.post(
          `http://localhost:8080/treatmentRecord/save?patientId=${selectedPatient.id}`,
          formData
        );
        alert("Treatment record saved successfully.");
      }

      fetchTreatmentRecords();
      setFormData({
        sicknessDescription: "",
        medicinePrescribed: "",
        therapyGiven: "",
        treatmentDate: "",
        treatmentTime: "",
        progressNotes: "",
        treatmentAmount: "",
      });
      setPatients([]);
      setSearchQuery("");
      setIsEditing(false);
      setEditRecordId(null);
      setSelectedPatient(null);
    } catch (error) {
      console.error("Error saving treatment record:", error);
      alert("Error saving treatment record.");
    }
  };

  const handleEdit = (record) => {
    setFormData({
      sicknessDescription: record.sicknessDescription,
      medicinePrescribed: record.medicinePrescribed,
      therapyGiven: record.therapyGiven,
      treatmentDate: record.treatmentDate,
      treatmentTime: record.treatmentTime,
      progressNotes: record.progressNotes,
      treatmentAmount: record.treatmentAmount,
    });
    setSelectedPatient(record.patient || null);
    setIsEditing(true);
    setEditRecordId(record.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:8080/treatmentRecord/delete/${id}`);
        alert("Treatment record deleted successfully.");
        fetchTreatmentRecords();
      } catch (error) {
        console.error("Error deleting treatment record:", error);
        alert("Error deleting treatment record.");
      }
    }
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
            <button className="add-patient-btn" >
              <i className="fas fa-user-plus"></i> Add New Patient
            </button>
          </div>
          </div>

        <Sidebar />
        <div className="dashboard-content">
          <div className="layout-container">
            <div className="form-container">
              <h4 className="text-center mb-4">
                {isEditing ? "Update Treatment Record" : "Treatment Record Form"}
              </h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="patientSearch">Search Patient (Name or Contact):</label>
                  <input
                    type="text"
                    id="patientSearch"
                    className="form-control"
                    placeholder="Start typing Patient Name or Contact Number"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  {patients.length > 0 && (
                    <ul className="list-group mt-2">
                      {patients.map((patient) => (
                        <li
                          key={patient.id}
                          className="list-group-item list-group-item-action"
                          onClick={() => {
                            setSelectedPatient(patient);
                            setSearchQuery(patient.name);
                            setPatients([]);
                          }}
                        >
                          {patient.name} - {patient.contactNumber}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <input
                  type="text"
                  name="sicknessDescription"
                  placeholder="Sickness Description"
                  className="form-control mt-2"
                  value={formData.sicknessDescription}
                  onChange={handleFormChange}
                  required
                />
                <input
                  type="text"
                  name="medicinePrescribed"
                  placeholder="Medicine Prescribed"
                  className="form-control mt-2"
                  value={formData.medicinePrescribed}
                  onChange={handleFormChange}
                  required
                />
                <input
                  type="text"
                  name="therapyGiven"
                  placeholder="Therapy Given"
                  className="form-control mt-2"
                  value={formData.therapyGiven}
                  onChange={handleFormChange}
                  required
                />
                <input
                  type="date"
                  name="treatmentDate"
                  className="form-control mt-2"
                  value={formData.treatmentDate}
                  onChange={handleFormChange}
                  required
                />
                <input
                  type="time"
                  name="treatmentTime"
                  className="form-control mt-2"
                  value={formData.treatmentTime}
                  onChange={handleFormChange}
                  required
                />
                <input
                  type="text"
                  name="progressNotes"
                  placeholder="Progress Notes"
                  className="form-control mt-2"
                  value={formData.progressNotes}
                  onChange={handleFormChange}
                  required
                />
                <input
                  type="number"
                  name="treatmentAmount"
                  placeholder="Treatment Amount"
                  className="form-control mt-2"
                  value={formData.treatmentAmount}
                  onChange={handleFormChange}
                  required
                />
                <div className="form-buttons">
                <button type="submit" className="submit-btn">
                  {isEditing ? "Update" : "Submit"}
                </button>
                </div>
              </form>
            </div>
            <div className="patients-table mt-3">
              <h4>Treatment Records</h4>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Sickness Description</th>
                    <th>Time</th>
                    <th>Medicine Prescribed</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {treatmentRecords.map((record, index) => (
                    <tr key={record.id}>
                      <td>{index + 1}</td>
                      <td>{record.patient?.name }</td>
                      <td>{record.sicknessDescription}</td>
                      <td>{record.treatmentTime}</td>
                      <td>{record.medicinePrescribed}</td>
                      <td>Rs. {record.treatmentAmount}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(record)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(record.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {treatmentRecords.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No records found.
                      </td>
                    </tr>
                  )}
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

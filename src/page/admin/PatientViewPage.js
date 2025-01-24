
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/templetes/Navbar";
import Sidebar from "../../components/templetes/SideBar";
import "../../css/admin/PatientViewPage.css";
import axios from 'axios';

const PatientViewPage = () => {
  const [patientDetails, setPatientDetails] = useState({
    id: '',
    name: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    address: '',
    medicalHistory: '',
    notes: '',
  });

  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const patientId = 123; // Replace this with a dynamic ID (e.g., from route params)
  const { patientId } = useParams();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);

        // Fetch patient details
        const patientResponse = await axios.get(`http://localhost:8080/patient/${patientId}`);
        setPatientDetails(patientResponse.data);

        // Fetch medical records
        const recordsResponse = await axios.get(`http://localhost:8080/patient/${patientId}/records`);
        setMedicalRecords(recordsResponse.data);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching patient data:', err);
        setError('Failed to fetch patient data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="patient-view-page-container">
      <Navbar />
      <div className="patient-view-content">
        <Sidebar />
        <div className="patient-details-container">
          <div className="breadcrumbs">
            <span>Home</span> / <span>Patients</span> / <span>{patientDetails.id}</span>
          </div>
          <h2 className="patient-name">{patientDetails.name}'s Profile</h2>

          <div className="patient-info">
            <div className="info-item">
              <strong>ID:</strong> <span>{patientDetails.id}</span>
            </div>
            <div className="info-item">
              <strong>Age:</strong> <span>{patientDetails.age}</span>
            </div>
            <div className="info-item">
              <strong>Gender:</strong> <span>{patientDetails.gender}</span>
            </div>
            <div className="info-item">
              <strong>Contact Number:</strong> <span>{patientDetails.contactNumber}</span>
            </div>
            <div className="info-item">
              <strong>Email:</strong> <span>{patientDetails.email}</span>
            </div>
            <div className="info-item">
              <strong>Address:</strong> <span>{patientDetails.address}</span>
            </div>
            <div className="info-item">
              <strong>Medical History:</strong> <span>{patientDetails.medicalHistory}</span>
            </div>
            <div className="info-item">
              <strong>Notes:</strong> <span>{patientDetails.notes}</span>
            </div>
          </div>

          <h3 className="medical-history-title">Medical Records</h3>
          <table className="medical-history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Disease</th>
                <th>Medicines</th>
                <th>Therapy</th>
              </tr>
            </thead>
            <tbody>
              {medicalRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.treatmentDate}</td>
                  <td>{record.sicknessDescription}</td>
                  <td>{record.medicinePrescribed}</td>
                  <td>{record.therapyGiven}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientViewPage;
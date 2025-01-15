import React from "react";
import Navbar from "../../components/templetes/Navbar";
import Sidebar from "../../components/templetes/SideBar";
import "../../css/admin/PatientViewPage.css"; 

const PatientViewPage = () => {
  const patientDetails = {
    id: "001",
    name: "John Doe",
    age: 35,
    address: "123 Main Street, Springfield",
    phoneNumber: "123-456-7890",
    email: "john.doe@example.com",
    gender: "Male",
    medicalHistory: "Diabetes, Hypertension",
    registrationDate: "2025-01-10",
  };

  const medicalRecords = [
    { date: "2025-01-05", disease: "Flu", medicines: "Paracetamol", therapy: "Bed Rest" },
    { date: "2025-01-12", disease: "Diabetes Checkup", medicines: "Metformin", therapy: "Diet Control" },
  ];

  return (
    <div className="patient-view-page-container">
      <Navbar />
      <div className="patient-view-content">
        <Sidebar />
        <div className="patient-details-container">
          <div className="breadcrumbs">
            <span>Home</span> / <span>Patients</span> / <span>{patientDetails.id}</span>
          </div>
          <h2 className="patient-name">{patientDetails.name}</h2>

          <div className="patient-info">
            <div className="info-item">
              <strong>ID:</strong> <span>{patientDetails.id}</span>
            </div>
            <div className="info-item">
              <strong>Age:</strong> <span>{patientDetails.age}</span>
            </div>
            <div className="info-item">
              <strong>Address:</strong> <span>{patientDetails.address}</span>
            </div>
            <div className="info-item">
              <strong>Phone Number:</strong> <span>{patientDetails.phoneNumber}</span>
            </div>
            <div className="info-item">
              <strong>Email:</strong> <span>{patientDetails.email}</span>
            </div>
            <div className="info-item">
              <strong>Gender:</strong> <span>{patientDetails.gender}</span>
            </div>
            <div className="info-item">
              <strong>Medical History:</strong> <span>{patientDetails.medicalHistory}</span>
            </div>
            <div className="info-item">
              <strong>Registration Date:</strong> <span>{patientDetails.registrationDate}</span>
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
                  <td>{record.date}</td>
                  <td>{record.disease}</td>
                  <td>{record.medicines}</td>
                  <td>{record.therapy}</td>
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

package com.odyssey.Ayurveda_Management.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "treatmentrecord")
public class TreatmentRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    @JsonIgnore
    private Patient patient;

    @Column(name = "treatment_date", nullable = false)
    private LocalDate treatmentDate;

    @Column(name = "treatment_time", nullable = false)
    private LocalTime treatmentTime;

    @Column(name = "sickness_description")
    private String sicknessDescription;

    @Column(name = "medicine_prescribed")
    private String medicinePrescribed;

    @Column(name = "therapy_given")
    private String therapyGiven;

    @Column(name = "progress_notes")
    private String progressNotes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id")
    @JsonIgnore
    private Staff staff;

    @Column(name = "treatment_amount")
    private double treatmentAmount;

    // Default constructor
    public TreatmentRecord() {
    }

    // Parameterized constructor
    public TreatmentRecord(Patient patient, LocalDate treatmentDate, LocalTime treatmentTime, String sicknessDescription,
                           String medicinePrescribed, String therapyGiven, String progressNotes, Staff staff, double treatmentAmount) {
        this.patient = patient;
        this.treatmentDate = treatmentDate;
        this.treatmentTime = treatmentTime;
        this.sicknessDescription = sicknessDescription;
        this.medicinePrescribed = medicinePrescribed;
        this.therapyGiven = therapyGiven;
        this.progressNotes = progressNotes;
        this.staff = staff;
        this.treatmentAmount = treatmentAmount;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public LocalDate getTreatmentDate() {
        return treatmentDate;
    }

    public void setTreatmentDate(LocalDate treatmentDate) {
        this.treatmentDate = treatmentDate;
    }

    public LocalTime getTreatmentTime() {
        return treatmentTime;
    }

    public void setTreatmentTime(LocalTime treatmentTime) {
        this.treatmentTime = treatmentTime;
    }

    public String getSicknessDescription() {
        return sicknessDescription;
    }

    public void setSicknessDescription(String sicknessDescription) {
        this.sicknessDescription = sicknessDescription;
    }

    public String getMedicinePrescribed() {
        return medicinePrescribed;
    }

    public void setMedicinePrescribed(String medicinePrescribed) {
        this.medicinePrescribed = medicinePrescribed;
    }

    public String getTherapyGiven() {
        return therapyGiven;
    }

    public void setTherapyGiven(String therapyGiven) {
        this.therapyGiven = therapyGiven;
    }

    public String getProgressNotes() {
        return progressNotes;
    }

    public void setProgressNotes(String progressNotes) {
        this.progressNotes = progressNotes;
    }

    public Staff getStaff() {
        return staff;
    }

    public void setStaff(Staff staff) {
        this.staff = staff;
    }

    public double getTreatmentAmount() {
        return treatmentAmount;
    }

    public void setTreatmentAmount(double treatmentAmount) {
        this.treatmentAmount = treatmentAmount;
    }

    // toString method
    @Override
    public String toString() {
        return "TreatmentRecord{" +
                "id=" + id +
                ", patient=" + patient +
                ", treatmentDate=" + treatmentDate +
                ", treatmentTime=" + treatmentTime +
                ", sicknessDescription='" + sicknessDescription + '\'' +
                ", medicinePrescribed='" + medicinePrescribed + '\'' +
                ", therapyGiven='" + therapyGiven + '\'' +
                ", progressNotes='" + progressNotes + '\'' +
                ", staff=" + staff +
                ", treatmentAmount=" + treatmentAmount +
                '}';
    }
}
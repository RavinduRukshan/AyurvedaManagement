package com.odyssey.Ayurveda_Management.repository;

import com.odyssey.Ayurveda_Management.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Integer> {
}
